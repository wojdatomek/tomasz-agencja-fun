// tomasz.agencja.fun — booking API + static assets
import { connect } from "cloudflare:sockets";

const BOOKING_CHAT_ID = "1578521052";
const BOOKING_TO = "wojdatomek@gmail.com";

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json;charset=UTF-8",
      "cache-control": "no-store",
    },
  });

function clean(s, max) {
  return String(s || "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .trim()
    .slice(0, max);
}

function validEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/booking" && request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "access-control-allow-origin": "https://tomasz.agencja.fun",
          "access-control-allow-methods": "POST, OPTIONS",
          "access-control-allow-headers": "content-type",
        },
      });
    }

    if (url.pathname === "/api/booking" && request.method === "POST") {
      try {
        const data = await request.json();
        if (data.website) return json({ success: true }); // honeypot

        const name = clean(data.name, 120);
        const email = clean(data.email, 180).toLowerCase();
        const type = clean(data.type, 40) || "booking";
        const date = clean(data.date, 40);
        const city = clean(data.city, 80);
        const message = clean(data.message, 4000);

        if (!name || !email || !message) {
          return json({ success: false, error: "Uzupełnij imię, email i wiadomość." }, 400);
        }
        if (!validEmail(email)) {
          return json({ success: false, error: "Podaj prawdziwy adres email." }, 400);
        }

        const lines = [
          "Nowe zapytanie z tomasz.agencja.fun",
          "",
          "Imię / nazwa: " + name,
          "Email: " + email,
          "Rodzaj: " + type,
          date ? "Data: " + date : "",
          city ? "Miasto: " + city : "",
          "",
          message,
        ].filter(Boolean);
        const text = lines.join("\n");
        const subject = "Booking: " + name + " — " + type;

        let sent = false;
        let lastErr = "";

        if (env.TELEGRAM_BOT_TOKEN) {
          try {
            const tg = await fetch(
              "https://api.telegram.org/bot" + env.TELEGRAM_BOT_TOKEN + "/sendMessage",
              {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                  chat_id: BOOKING_CHAT_ID,
                  text: subject + "\n\n" + text,
                }),
              }
            );
            const tgJson = await tg.json();
            if (tgJson.ok) sent = true;
            else lastErr = "telegram " + (tgJson.description || tg.status);
          } catch (e) {
            lastErr = "telegram " + (e.message || "fail");
          }
        }

        if (!sent && env.SMTP_USER && env.SMTP_PASS) {
          try {
            await sendEmail({
              to: BOOKING_TO,
              subject: subject,
              text: text,
              smtpUser: env.SMTP_USER,
              smtpPass: env.SMTP_PASS,
            });
            sent = true;
          } catch (e) {
            lastErr = (lastErr ? lastErr + "; " : "") + "smtp " + (e.message || "fail");
          }
        }

        if (!sent) {
          return json(
            { success: false, error: "Nie udało się wysłać. Napisz na Instagramie @tomasz_wojda." },
            502
          );
        }

        return json({ success: true });
      } catch (e) {
        return json({ success: false, error: "Błąd serwera. Spróbuj jeszcze raz." }, 500);
      }
    }

    if (url.pathname.startsWith("/api/")) {
      return json({ error: "not found" }, 404);
    }

    return env.ASSETS.fetch(request);
  },
};

async function sendEmail({ to, subject, text, smtpUser, smtpPass }) {
  const smtpHost = "smtp.hostinger.com";
  const from = "herkules@agencja.fun";
  let socket = connect({ hostname: smtpHost, port: 587 });
  await socket.opened;

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const reader = socket.readable.getReader();
  const writer = socket.writable.getWriter();

  async function send(line) {
    await writer.write(encoder.encode(line + "\r\n"));
  }

  async function expect(expectedCode) {
    const { value } = await reader.read();
    const response = decoder.decode(value);
    const code = parseInt(response.substring(0, 3), 10);
    if (expectedCode && code !== expectedCode) {
      throw new Error("SMTP " + response.trim());
    }
    return response;
  }

  await expect();
  await send("EHLO tomasz.agencja.fun");
  await expect(250);
  await send("STARTTLS");
  await expect(220);

  writer.releaseLock();
  reader.releaseLock();
  socket = socket.startTls();
  await socket.opened;
  const reader2 = socket.readable.getReader();
  const writer2 = socket.writable.getWriter();

  async function send2(line) {
    await writer2.write(encoder.encode(line + "\r\n"));
  }
  async function expect2(expectedCode) {
    const { value } = await reader2.read();
    const response = decoder.decode(value);
    const code = parseInt(response.substring(0, 3), 10);
    if (expectedCode && code !== expectedCode) {
      throw new Error("SMTP " + response.trim());
    }
    return response;
  }

  await send2("EHLO tomasz.agencja.fun");
  await expect2(250);
  await send2("AUTH LOGIN");
  await expect2(334);
  await send2(btoa(smtpUser));
  await expect2(334);
  await send2(btoa(smtpPass));
  await expect2(235);
  await send2("MAIL FROM:<" + from + ">");
  await expect2(250);
  await send2("RCPT TO:<" + to + ">");
  await expect2(250);
  await send2("DATA");
  await expect2(354);

  const headers = [
    'From: "Tomasz Wojda Booking" <' + from + ">",
    "To: <" + to + ">",
    "Subject: =?UTF-8?B?" + btoa(unescape(encodeURIComponent(subject))) + "?=",
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: 8bit",
    "",
  ].join("\r\n");

  await send2(headers + "\r\n" + text.replace(/\n/g, "\r\n") + "\r\n.");
  await expect2(250);
  await send2("QUIT");
  try {
    socket.close();
  } catch (e) {}
}
