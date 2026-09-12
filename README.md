# tomasz.agencja.fun

Strona artystyczna **Tomasza Wojdy** — DJ / producent (deep, melodic, tribal house).

**Live:** [https://tomasz.agencja.fun](https://tomasz.agencja.fun)

Jedna strona (HTML + Worker), bez CMS. Booking przez formularz na stronie. W plikach publicznych **nie ma telefonu ani maila**.

## Stack

| Warstwa | Co |
|---|---|
| Hosting | Cloudflare Workers + static assets |
| Domena | `tomasz.agencja.fun` (strefa `agencja.fun`) |
| Kod | [wojdatomek/tomasz-agencja-fun](https://github.com/wojdatomek/tomasz-agencja-fun) |
| CI | GitHub Actions → `wrangler deploy` (`wrangler-action@v3.14`, wrangler `4.126.0`) |
| Booking | `POST /api/booking` → Telegram, fallback SMTP (Hostinger) |

Push na `master` wdraża **dev i produkcję**. Zmiana samego `README.md` **nie** odpala deployu.

## Struktura

```
public/                 # to, co serwuje CDN
  index.html            # cała strona
  img/                  # hero, galeria, OG 1200×630
  files/                # press pack + rider (PDF/ZIP)
  robots.txt
  sitemap.xml
src/worker.js           # API bookingu + 301 starych URL-i PDF
scripts/generate_press.py
wrangler.toml
.github/workflows/deploy.yml
```

## Press pack i rider

Generowane skryptem (Pillow, A4):

```bash
python3 scripts/generate_press.py
```

| Plik | Co |
|---|---|
| `press-pack_tomaszwojda.pdf` | Press pack PL |
| `press-pack-en_tomaszwojda.pdf` | Press pack EN |
| `raider_tomaszwojda.pdf` | Tech rider PL |
| `raider-en_tomaszwojda.pdf` | Tech rider EN |
| `press-pack_tomaszwojda.zip` | Wszystko razem |

Stare ścieżki (`/files/press-pack.pdf` itd.) robią **301** na nowe nazwy.

Zasady treści: bez telefonu i maila; booking przez stronę, Instagram `@tomasz_wojda`, SoundCloud `/tomaszwojda`.

## Booking

Formularz na stronie → `POST /api/booking`.

Sekrety **tylko** w Cloudflare Worker (nie w git):

- `TELEGRAM_BOT_TOKEN` — pierwsze dojście
- `SMTP_USER` / `SMTP_PASS` — fallback (Hostinger, `herkules@agencja.fun`)

Honeypot: pole `website`.

## SEO (stan)

Zrobione:

- `title`, `description`, canonical `https://tomasz.agencja.fun/`
- Open Graph + Twitter (`og.jpg` 1200×630)
- JSON-LD: `WebSite` + `Person` + `ProfilePage` (`knowsAbout`, nie `genre`)
- `robots.txt` + `sitemap.xml`
- HTTP → HTTPS **301** (Cloudflare Always Use HTTPS)
- HSTS, TLS min. 1.2
- IndexNow (Bing)

**Do zrobienia ręcznie:** Google Search Console — dodać właściwość `https://tomasz.agencja.fun/`, wkleić kod weryfikacji Herkulesowi, zgłosić sitemapę.

## Deploy

Sekret GitHub: `CF_API_TOKEN` (Workers:Edit + Zone:Edit).

Ręcznie: Actions → **Deploy** → `production` albo `dev`.

Środowisko dev to Worker na `workers.dev` (routing techniczny konta Cloudflare) — **publiczna** strona to wyłącznie `tomasz.agencja.fun`.
