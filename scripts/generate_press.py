#!/usr/bin/env python3
"""Press pack + tech rider PDFs matching tomasz.agencja.fun."""
from __future__ import annotations

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance

ROOT = Path("/opt/data/home/projects/tomasz-agencja-fun")
IMG = ROOT / "public" / "img"
OUT = ROOT / "public" / "files"
FONT_SANS = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
FONT_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONT_SERIF = "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf"
FONT_SERIF_B = "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf"

# A4 @ ~170 dpi
W, H = 1400, 1980
M = 88
PAPER = (239, 232, 220)
INK = (18, 18, 18)
MUTED = (110, 103, 94)
ACCENT = (180, 35, 24)
CLUB = (11, 11, 12)
CREAM = (246, 241, 232)
LINE = (18, 18, 18, 36)


def font(path, size):
    return ImageFont.truetype(path, size)


def wrap(draw, text, fnt, max_w):
    words = text.split()
    lines, cur = [], ""
    for w in words:
        t = (cur + " " + w).strip()
        if draw.textlength(t, font=fnt) <= max_w:
            cur = t
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def text(draw, xy, s, fnt, fill=INK, anchor="lt"):
    draw.text(xy, s, font=fnt, fill=fill, anchor=anchor)


def label(draw, xy, s, fill=ACCENT):
    text(draw, xy, s.upper(), font(FONT_BOLD, 18), fill=fill)


def rule(draw, y, x0=M, x1=W - M, fill=INK, width=1):
    draw.line((x0, y, x1, y), fill=fill, width=width)


def cover_photo(path, box):
    im = Image.open(path).convert("RGB")
    bw, bh = box[2] - box[0], box[3] - box[1]
    src_r = im.width / im.height
    box_r = bw / bh
    if src_r > box_r:
        nh = im.height
        nw = int(nh * box_r)
        left = (im.width - nw) // 2
        im = im.crop((left, 0, left + nw, nh))
    else:
        nw = im.width
        nh = int(nw / box_r)
        top = max(0, (im.height - nh) // 5)
        im = im.crop((0, top, nw, min(im.height, top + nh)))
    return im.resize((bw, bh), Image.Resampling.LANCZOS)


def page_paper():
    im = Image.new("RGB", (W, H), PAPER)
    return im, ImageDraw.Draw(im)


def page_club():
    im = Image.new("RGB", (W, H), CLUB)
    return im, ImageDraw.Draw(im)


def footer(draw, dark=False, page="", mark="PRESS PACK"):
    col = (154, 148, 140) if dark else MUTED
    rule(draw, H - 64, fill=col)
    text(draw, (M, H - 42), "TOMASZ WOJDA  ·  kick & heavy synth", font(FONT_SANS, 16), col)
    text(draw, (W - M, H - 42), f"{mark}  {page}", font(FONT_SANS, 16), col, anchor="rt")


def save_pdf(pages, path):
    rgb = [p.convert("RGB") for p in pages]
    rgb[0].save(path, save_all=True, append_images=rgb[1:], resolution=150)
    print(path.name, round(Path(path).stat().st_size / 1024), "KB", len(pages), "p")


# ---------- PRESS PACK ----------
TRACKS = [
    ("01", "end of war", "Ciemniejszy, wolniejszy, ciężki kick.", "Darker, slower, heavy kick."),
    ("02", "plum plum", "Bas i groove, trochę funkowo.", "Bass and groove, a bit of funk."),
    ("03", "moonday", "Senny, bardziej kosmiczny.", "Sleepy, more cosmic."),
    ("04", "człowiek jest tylko mocny", "Organiczna perkusja, cieplejszy house.", "Organic percussion, warmer house."),
    ("05", "awaking", "Jaśniejsze, wschodzące.", "Brighter, a record that opens up."),
    ("06", "around flame", "Szybszy, bardziej palący.", "Faster, more burning."),
    ("07", "i need to feel", "Klub, energia.", "Club energy."),
]
SETS = [
    ("Elementy", "Deephouse set", "Deephouse set"),
    ("Antiquario Cafe", "Torre del Mar, 26.04.2025", "Torre del Mar, 26 Apr 2025"),
    ("Warsaw Bridge Boombox", "House mashup", "House mashup"),
]
LINKS = [
    "tomasz.agencja.fun",
    "instagram.com/tomasz_wojda",
    "soundcloud.com/tomaszwojda",
]


def press(lang):
    pl = lang == "pl"
    pages = []

    # COVER
    im, d = page_club()
    hero = cover_photo(IMG / "hero.jpg", (0, 0, W, H))
    hero = ImageEnhance.Contrast(hero).enhance(1.08)
    im.paste(hero, (0, 0))
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    for i in range(520):
        a = int(210 * (i / 520))
        od.line((0, H - 1 - i, W, H - 1 - i), fill=(11, 11, 12, a))
    im = Image.alpha_composite(im.convert("RGBA"), overlay).convert("RGB")
    d = ImageDraw.Draw(im)
    label(d, (M, H - 520), "PRESS PACK  ·  2026", fill=ACCENT)
    text(d, (M, H - 400), "TOMASZ", font(FONT_BOLD, 96), CREAM)
    text(d, (M, H - 278), "WOJDA", font(FONT_BOLD, 96), CREAM)
    text(d, (M, H - 148), "kick & heavy synth", font(FONT_SERIF, 30), (200, 190, 178))
    pages.append(im)

    # BIO
    im, d = page_paper()
    label(d, (M, 72), "BIO" if pl else "BIO")
    title = "Ciężki kick,\npotem synth." if pl else "Heavy kick,\nthen synth."
    y = 118
    for line in title.split("\n"):
        text(d, (M, y), line, font(FONT_BOLD, 64), INK)
        y += 74
    body = (
        [
            "DJ i producent. Deep, melodic i tribal house.",
            "Robię house, który siada w ciele, a nie tylko w feedzie. Kick ma iść w podłogę, synth ma trochę gryźć. Czasem tribal, czasem jaśniej, melodyjnie.",
            "Sety w klubach, plenerze i na kameralnych imprezach. Polska i Hiszpania. Nie buduję wielkiej legendy — po prostu gram.",
        ]
        if pl
        else [
            "DJ and producer. Deep, melodic and tribal house.",
            "House that sits in the body, not just in the feed. The kick should hit the floor; the synth should bite a little. Sometimes tribal, sometimes brighter, more melodic.",
            "Clubs, outdoors and smaller rooms. Poland and Spain. No big myth — I just play.",
        ]
    )
    y += 24
    fbody = font(FONT_SANS, 28)
    for para in body:
        for line in wrap(d, para, fbody, W - 2 * M - 420):
            text(d, (M, y), line, fbody, INK)
            y += 40
        y += 18

    side = cover_photo(IMG / "g1.jpg", (W - M - 380, 160, W - M, 160 + 560))
    im.paste(side, (W - M - 380, 160))

    y = max(y, 760) + 20
    rule(d, y)
    y += 36
    facts = (
        [("Gatunki", "Deep / melodic / tribal house"), ("Format", "Klub, festiwal, event — 60–120 min"), ("Baza", "Warszawa"), ("Booking", "tomasz.agencja.fun")]
        if pl
        else [("Genres", "Deep / melodic / tribal house"), ("Format", "Club, festival, private — 60–120 min"), ("Based", "Warsaw"), ("Booking", "tomasz.agencja.fun")]
    )
    col_w = (W - 2 * M) // 2
    for i, (k, v) in enumerate(facts):
        cx = M + (i % 2) * col_w
        cy = y + (i // 2) * 90
        text(d, (cx, cy), k.upper(), font(FONT_BOLD, 16), ACCENT)
        text(d, (cx, cy + 28), v, font(FONT_SANS, 24), INK)
    footer(d, page="02", mark="PRESS PACK")
    pages.append(im)

    # MUSIC
    im, d = page_paper()
    label(d, (M, 72), "UTWORY" if pl else "TRACKS")
    text(d, (M, 118), "Wybrane nagrania" if pl else "Selected recordings", font(FONT_BOLD, 48), INK)
    y = 200
    for num, title, bl_pl, bl_en in TRACKS:
        bl = bl_pl if pl else bl_en
        text(d, (M, y + 6), num, font(FONT_BOLD, 22), ACCENT)
        text(d, (M + 70, y), title, font(FONT_SERIF_B, 30), INK)
        text(d, (M + 70, y + 40), bl, font(FONT_SANS, 20), MUTED)
        rule(d, y + 78, fill=(18, 18, 18, 28) if False else (200, 190, 178))
        y += 92
    y += 10
    label(d, (M, y), "SETY" if pl else "DJ SETS")
    y += 44
    for name, meta_pl, meta_en in SETS:
        text(d, (M, y), name, font(FONT_SERIF_B, 28), INK)
        y += 36
        text(d, (M, y), meta_pl if pl else meta_en, font(FONT_SANS, 20), MUTED)
        y += 48
    y += 20
    text(d, (M, y), "soundcloud.com/tomaszwojda", font(FONT_SANS, 22), ACCENT)
    footer(d, page="03", mark="PRESS PACK")
    pages.append(im)

    # PHOTOS + LINKS
    im, d = page_paper()
    label(d, (M, 72), "FOTO" if pl else "PHOTOS")
    text(d, (M, 118), "Do użytku prasowego" if pl else "For press use", font(FONT_BOLD, 48), INK)
    gap = 18
    usable = W - 2 * M
    top_h = 620
    left_w = int(usable * 0.62)
    right_w = usable - left_w - gap
    bot_h = 520
    col = (usable - 2 * gap) // 3
    grid = [
        (IMG / "hero.jpg", (M, 200, left_w, top_h)),
        (IMG / "g2.jpg", (M + left_w + gap, 200, right_w, top_h)),
        (IMG / "g6.jpg", (M, 200 + top_h + gap, col, bot_h)),
        (IMG / "g5.jpg", (M + col + gap, 200 + top_h + gap, col, bot_h)),
        (IMG / "g4.jpg", (M + 2 * (col + gap), 200 + top_h + gap, col, bot_h)),
    ]
    for path, (x, y, w, h) in grid:
        crop = cover_photo(path, (0, 0, w, h))
        im.paste(crop, (x, y))
    footer(d, page="04", mark="PRESS PACK")
    pages.append(im)

    # LINKS
    im, d = page_paper()
    label(d, (M, 72), "KONTAKT" if pl else "CONTACT")
    text(d, (M, 118), "Booking" if pl else "Booking", font(FONT_BOLD, 64), INK)
    para = (
        "Chcesz set do klubu, na festiwal albo prywatną imprezę? Formularz jest na stronie. Odpowiadam sam."
        if pl
        else "Club, festival or a private room — use the form on the site. I answer myself."
    )
    y = 220
    for line in wrap(d, para, font(FONT_SANS, 28), W - 2 * M):
        text(d, (M, y), line, font(FONT_SANS, 28), INK)
        y += 40
    y += 48
    for link in LINKS:
        rule(d, y)
        y += 28
        text(d, (M, y), link, font(FONT_BOLD, 36), INK)
        y += 70
    y += 20
    note = (
        "Zdjęcia i ten press pack: do użytku przy bookingu i w mediach, z podpisem Tomasz Wojda. Bez telefonu i maila w pliku — wszystko przez stronę. Guest +1, parking i rec setu: w riderze."
        if pl
        else "Photos and this press pack: for booking and media, credit Tomasz Wojda. No phone or email in the file — everything goes through the site. Plus-one, parking and set rec: see the rider."
    )
    for line in wrap(d, note, font(FONT_SANS, 22), W - 2 * M):
        text(d, (M, y), line, font(FONT_SANS, 22), MUTED)
        y += 32
    # small portrait
    port = cover_photo(IMG / "og.jpg", (0, 0, 280, 280))
    im.paste(port, (W - M - 280, H - 64 - 320))
    footer(d, page="05", mark="PRESS PACK")
    pages.append(im)
    return pages


def draw_blocks(d, y, blocks, fb, fh, gap=10):
    for title, bullets in blocks:
        text(d, (M, y), title.upper(), fh, ACCENT)
        y += 38
        for b in bullets:
            lines = wrap(d, b, fb, W - 2 * M - 40)
            for i, line in enumerate(lines):
                text(d, (M, y), ("–  " if i == 0 else "    ") + line, fb, INK)
                y += 32
            y += gap
        y += 16
    return y


def rider(lang):
    pl = lang == "pl"
    pages = []

    im, d = page_paper()
    label(d, (M, 72), "TECH RIDER  ·  2026")
    text(d, (M, 118), "Tomasz Wojda", font(FONT_BOLD, 56), INK)
    text(d, (M, 188), "kick & heavy synth", font(FONT_SERIF, 26), MUTED)
    y = 250
    rule(d, y)
    y += 32

    sections = (
        [
            (
                "Booth",
                [
                    "Stół DJ: wysokość 110 cm, blat min. 120 × 80 cm, stabilny.",
                    "Zasilanie 230 V — dwa wolne gniazda w booth.",
                    "Monitor odsłuchowy przed DJ-em.",
                    "Bez oślepiania od frontu. Ciepłe światło na ręce i mixer.",
                ],
            ),
            (
                "Setup A — laptop",
                [
                    "MacBook Pro + kontroler Traktor (Native Instruments).",
                    "Model kontrolera potwierdzam przed eventem.",
                    "Miejsce na laptopa i kontroler na stole 110 cm.",
                    "Do mixera klubowego: 2× RCA albo 2× TS / combo.",
                ],
            ),
            (
                "Setup B — CDJ",
                [
                    "Gram na każdych CDJ + mixer Pioneer (DJM / XZ / 4 ch).",
                    "Klub daje: 2× CDJ lub XDJ oraz Pioneer DJM.",
                    "Z mixera do FOH: XLR stereo.",
                ],
            ),
        ]
        if pl
        else [
            (
                "Booth",
                [
                    "DJ table: 110 cm high, top min. 120 × 80 cm, stable.",
                    "Power 230 V — two free sockets in the booth.",
                    "Booth monitor in front of the DJ.",
                    "No blinding front spots. Warm light on hands and mixer.",
                ],
            ),
            (
                "Setup A — laptop",
                [
                    "MacBook Pro + Traktor controller (Native Instruments).",
                    "Controller model confirmed before the event.",
                    "Space on the 110 cm table for laptop and controller.",
                    "To the house mixer: 2× RCA or 2× TS / combo.",
                ],
            ),
            (
                "Setup B — CDJ",
                [
                    "I play on any CDJs + Pioneer mixer (DJM / XZ / 4 ch).",
                    "Venue provides: 2× CDJ or XDJ and a Pioneer DJM.",
                    "Mixer to FOH: stereo XLR.",
                ],
            ),
        ]
    )
    draw_blocks(d, y, sections, font(FONT_SANS, 24), font(FONT_BOLD, 24), gap=6)
    footer(d, page="01", mark="RIDER")
    pages.append(im)

    im, d = page_paper()
    label(d, (M, 72), "HOSPITALITY" if not pl else "ZAPLECZE")
    text(d, (M, 118), "Rider — gościnność i logistyka" if pl else "Rider — hospitality and travel", font(FONT_BOLD, 40), INK)
    y = 200
    blocks = (
        [
            (
                "W booth",
                [
                    "Banany.",
                    "Woda (niegazowana).",
                    "Zimna Coca-Cola.",
                    "Posiłek, jeżeli to możliwe (przed setem albo zaraz po).",
                ],
            ),
            (
                "Dojazd",
                [
                    "Taksówka na miejsce i z powrotem albo prywatny kierowca.",
                    "Baza: Warszawa — dojazd z/do Warszawy.",
                    "Jeśli powrót tego samego dnia nie wchodzi w grę: miejsce noclegu.",
                ],
            ),
            (
                "Czas",
                [
                    "Set: 60–120 min, do uzgodnienia.",
                    "Wejście i soundcheck: min. 45 min przed startem.",
                ],
            ),
            (
                "Goście, rec, parking",
                [
                    "Plus jeden na guestliście.",
                    "Parking przy lokalu, jeśli dojazd autem.",
                    "Nagranie setu (USB / FOH) tylko po wcześniejszym uzgodnieniu.",
                ],
            ),
            (
                "Uwagi",
                [
                    "Rider jest bazą — szczegóły dogrywamy pod salę.",
                    "tomasz.agencja.fun",
                    "Instagram @tomasz_wojda",
                    "SoundCloud /tomaszwojda",
                ],
            ),
        ]
        if pl
        else [
            (
                "In the booth",
                [
                    "Bananas.",
                    "Still water.",
                    "Cold Coca-Cola.",
                    "A meal if possible (before the set or right after).",
                ],
            ),
            (
                "Travel",
                [
                    "Taxi to the venue and back, or a private driver.",
                    "Based in Warsaw — travel from/to Warsaw.",
                    "If a same-day return is not realistic: overnight stay.",
                ],
            ),
            (
                "Timing",
                [
                    "Set: 60–120 min, to confirm.",
                    "Load-in and soundcheck: at least 45 min before start.",
                ],
            ),
            (
                "Guests, rec, parking",
                [
                    "Plus one on the guest list.",
                    "Parking at the venue if arriving by car.",
                    "Set recording (USB / FOH) only if agreed in advance.",
                ],
            ),
            (
                "Notes",
                [
                    "This rider is a baseline — we adjust to the room.",
                    "tomasz.agencja.fun",
                    "Instagram @tomasz_wojda",
                    "SoundCloud /tomaszwojda",
                ],
            ),
        ]
    )
    draw_blocks(d, y, blocks, font(FONT_SANS, 22), font(FONT_BOLD, 22), gap=3)
    footer(d, page="02", mark="RIDER")
    pages.append(im)
    return pages


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    save_pdf(press("pl"), OUT / "press-pack_tomaszwojda.pdf")
    save_pdf(press("en"), OUT / "press-pack-en_tomaszwojda.pdf")
    save_pdf(rider("pl"), OUT / "raider_tomaszwojda.pdf")
    save_pdf(rider("en"), OUT / "raider-en_tomaszwojda.pdf")

    import zipfile

    zpath = OUT / "press-pack_tomaszwojda.zip"
    with zipfile.ZipFile(zpath, "w", zipfile.ZIP_DEFLATED) as z:
        z.write(OUT / "press-pack_tomaszwojda.pdf", "press-pack_tomaszwojda.pdf")
        z.write(OUT / "press-pack-en_tomaszwojda.pdf", "press-pack-en_tomaszwojda.pdf")
        z.write(OUT / "raider_tomaszwojda.pdf", "raider_tomaszwojda.pdf")
        z.write(OUT / "raider-en_tomaszwojda.pdf", "raider-en_tomaszwojda.pdf")
        z.write(IMG / "hero.jpg", "photos/hero.jpg")
        z.write(IMG / "g1.jpg", "photos/portrait.jpg")
        z.write(IMG / "g2.jpg", "photos/dj-set.jpg")
        z.write(IMG / "g5.jpg", "photos/portrait-2.jpg")
        z.write(IMG / "g6.jpg", "photos/booth.jpg")
        z.write(IMG / "g4.jpg", "photos/studio.jpg")
    print("zip", round(zpath.stat().st_size / 1024), "KB")


if __name__ == "__main__":
    main()
