// tomasz.agencja.fun — Tomasz Wojda portfolio
const HTML = `<!DOCTYPE html>
<html lang="pl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Tomasz Wojda – DJ / Producent | Electronic Music</title>
<meta name="description" content="Tomasz Wojda – DJ i producent muzyczny. Łączy hipnotyczne brzmienia elektroniki z organicznymi rytmami. Booking przez formularz.">
<meta name="keywords" content="Tomasz Wojda, DJ, producent muzyczny, electronic music, deep house, melodic house, tribal house, booking DJ, Warszawa">
<meta name="author" content="Tomasz Wojda">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://tomasz.agencja.fun">

<!-- Open Graph -->
<meta property="og:title" content="Tomasz Wojda – DJ / Producent">
<meta property="og:description" content="DJ i producent muzyczny łączący hipnotyczne brzmienia elektroniki z organicznymi rytmami.">
<meta property="og:url" content="https://tomasz.agencja.fun">
<meta property="og:type" content="website">
<meta property="og:image" content="https://lh3.googleusercontent.com/pw/AP1GczOax5VRBC_Yncj4XuiP8GX75dii8pgaxK6Iqsvm3XheSf2bxBecj9e_u93hm6BDzZMQpc87Pq_Ca2Zvfxij72BldCu0U68bObU67jp-FMjjI0QMSF3_=w800">
<meta property="og:locale" content="pl_PL">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Tomasz Wojda – DJ / Producent">
<meta name="twitter:description" content="DJ i producent muzyczny. Łączy hipnotyczne brzmienia elektroniki z organicznymi rytmami.">

<!-- JSON-LD Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Tomasz Wojda",
  "jobTitle": "DJ i producent muzyczny",
  "description": "DJ i producent muzyczny łączący hipnotyczne brzmienia elektroniki z organicznymi rytmami.",
  "url": "https://tomasz.agencja.fun",
  "sameAs": [
    "https://soundcloud.com/tomaszwojda",
    "https://instagram.com/tomasz_wojda",
    "https://facebook.com/wojdatomasz",
    "https://www.youtube.com/@tomaszwojda"
  ],
  "genre": ["Electronic", "Deep House", "Melodic House", "Tribal House"]
}
</script>

<style>
/* ========== RESET & BASE ========== */
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
:root{
  --bg:#0A0A0A;
  --surface:#121212;
  --text:#E8E8E8;
  --muted:#888;
  --accent1:#D50000;
  --accent2:#673AB7;
  --accent3:#304FFE;
  --accent4:#FF8F00;
  --accent5:#FF6D00;
  --accent6:#00BCD4;
  --accent7:#8B0000;
  --gold:#F5A623;
  --radius:16px;
  --font-body:'Outfit','system-ui',sans-serif;
  --font-display:'Unbounded','system-ui',sans-serif;
}
html{scroll-behavior:smooth}
body{
  font-family:var(--font-body);
  background:var(--bg);
  color:var(--text);
  overflow-x:hidden;
  line-height:1.6;
  -webkit-font-smoothing:antialiased;
}

/* ========== CANVAS BG ========== */
#geo-canvas{
  position:fixed;
  top:0;left:0;
  width:100vw;height:100vh;
  pointer-events:none;
  z-index:0;
  opacity:0.6;
}

/* ========== NAV ========== */
nav{
  position:fixed;
  top:0;left:0;right:0;
  z-index:100;
  padding:16px 32px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  background:linear-gradient(180deg,rgba(10,10,10,0.95) 0%,transparent 100%);
  transition:background 0.3s;
}
nav.scrolled{background:rgba(10,10,10,0.98);backdrop-filter:blur(20px)}
.nav-logo{
  font-family:var(--font-display);
  font-size:1rem;
  font-weight:700;
  color:var(--text);
  text-decoration:none;
  letter-spacing:2px;
}
.nav-logo span{color:var(--accent4)}
.nav-links{display:flex;gap:24px;list-style:none}
.nav-links a{
  color:var(--muted);
  text-decoration:none;
  font-size:0.8rem;
  letter-spacing:1px;
  text-transform:uppercase;
  transition:color 0.2s;
}
.nav-links a:hover{color:var(--text)}
.menu-toggle{display:none;background:none;border:none;color:var(--text);font-size:1.5rem;cursor:pointer}

/* ========== SECTIONS ========== */
section{position:relative;z-index:1;padding:100px 24px}
.section-inner{max-width:1200px;margin:0 auto}
.label{
  display:inline-block;
  font-family:var(--font-display);
  font-size:0.7rem;
  letter-spacing:4px;
  text-transform:uppercase;
  color:var(--gold);
  margin-bottom:16px;
}
h2{
  font-family:var(--font-display);
  font-size:clamp(2rem,5vw,3.5rem);
  font-weight:700;
  margin-bottom:48px;
  line-height:1.1;
}

/* ========== HERO ========== */
#hero{
  min-height:100vh;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:120px 24px 60px;
  position:relative;
  z-index:1;
}
.hero-grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:60px;
  align-items:center;
  max-width:1200px;
  width:100%;
}
.hero-content{position:relative;z-index:2}
.hero-badge{
  display:inline-flex;
  align-items:center;
  gap:8px;
  padding:6px 16px;
  border-radius:100px;
  border:1px solid rgba(245,166,35,0.3);
  background:rgba(245,166,35,0.08);
  color:var(--gold);
  font-size:0.7rem;
  letter-spacing:2px;
  text-transform:uppercase;
  margin-bottom:24px;
}
.hero-content h1{
  font-family:var(--font-display);
  font-size:clamp(2.8rem,7vw,5.5rem);
  font-weight:900;
  line-height:1;
  margin-bottom:8px;
  letter-spacing:-2px;
}
.hero-content .subtitle{
  font-size:clamp(1rem,2vw,1.4rem);
  color:var(--muted);
  margin-bottom:16px;
}
.hero-content .tagline{
  font-size:1rem;
  color:var(--muted);
  max-width:480px;
  line-height:1.7;
  margin-bottom:32px;
}
.hero-actions{display:flex;gap:16px;flex-wrap:wrap}
.btn{
  display:inline-flex;
  align-items:center;
  gap:8px;
  padding:14px 32px;
  border-radius:100px;
  font-family:var(--font-body);
  font-size:0.85rem;
  font-weight:500;
  letter-spacing:1px;
  text-decoration:none;
  text-transform:uppercase;
  transition:all 0.3s;
  cursor:pointer;
  border:none;
}
.btn-primary{
  background:linear-gradient(135deg,var(--accent2),var(--accent1));
  color:#fff;
}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(103,58,183,0.4)}
.btn-outline{
  border:1px solid rgba(255,255,255,0.15);
  color:var(--text);
  background:transparent;
}
.btn-outline:hover{border-color:var(--gold);color:var(--gold);transform:translateY(-2px)}
.hero-image{
  position:relative;
  border-radius:var(--radius);
  overflow:hidden;
  aspect-ratio:3/4;
  max-height:80vh;
}
.hero-image img{
  width:100%;
  height:100%;
  object-fit:cover;
  border-radius:var(--radius);
  transition:transform 0.5s;
}
.hero-image:hover img{transform:scale(1.03)}
.hero-image::after{
  content:'';
  position:absolute;
  inset:0;
  border-radius:var(--radius);
  background:linear-gradient(180deg,transparent 50%,rgba(10,10,10,0.6) 100%);
  pointer-events:none;
}
.hero-image .glow{
  position:absolute;
  top:50%;left:50%;
  width:80%;height:80%;
  transform:translate(-50%,-50%);
  background:radial-gradient(ellipse,var(--accent2) 0%,transparent 70%);
  opacity:0.15;
  filter:blur(60px);
  pointer-events:none;
}

/* ========== BIO ========== */
#bio{
  background:linear-gradient(180deg,transparent,var(--surface),transparent);
}
.bio-layout{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:48px;
  align-items:center;
}
.bio-text{font-size:1.1rem;color:var(--muted);line-height:1.8}
.bio-text strong{color:var(--text)}
.bio-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.stat-card{
  background:rgba(255,255,255,0.03);
  border:1px solid rgba(255,255,255,0.06);
  border-radius:12px;
  padding:24px;
  text-align:center;
}
.stat-card .num{font-family:var(--font-display);font-size:2rem;font-weight:700;color:var(--gold)}
.stat-card .lbl{font-size:0.75rem;color:var(--muted);text-transform:uppercase;letter-spacing:1px;margin-top:4px}

/* ========== TRACKS ========== */
#tracks{background:var(--surface)}
.tracks-grid{display:grid;gap:32px}
.track-card{
  display:grid;
  grid-template-columns:1fr 1.5fr;
  gap:32px;
  align-items:center;
  padding:32px;
  border-radius:var(--radius);
  border:1px solid rgba(255,255,255,0.06);
  background:rgba(255,255,255,0.02);
  transition:all 0.4s;
}
.track-card:hover{border-color:rgba(255,255,255,0.12);transform:translateY(-4px)}
.track-info{}
.track-num{
  font-family:var(--font-display);
  font-size:0.7rem;
  font-weight:700;
  letter-spacing:3px;
  opacity:0.5;
  margin-bottom:8px;
}
.track-card h3{
  font-family:var(--font-display);
  font-size:1.3rem;
  font-weight:700;
  margin-bottom:8px;
}
.track-card .track-vibe{
  font-size:0.85rem;
  color:var(--muted);
  margin-bottom:16px;
}
.track-player iframe{width:100%;height:166px;border-radius:8px}

/* Track color themes */
.track-card[data-track="1"]{border-left:3px solid var(--accent7)}
.track-card[data-track="1"] h3{color:var(--accent7)}
.track-card[data-track="2"]{border-left:3px solid var(--accent2)}
.track-card[data-track="2"] h3{color:var(--accent2)}
.track-card[data-track="3"]{border-left:3px solid var(--accent3)}
.track-card[data-track="3"] h3{color:var(--accent3)}
.track-card[data-track="4"]{border-left:3px solid var(--accent4)}
.track-card[data-track="4"] h3{color:var(--accent4)}
.track-card[data-track="5"]{border-left:3px solid var(--accent5)}
.track-card[data-track="5"] h3{color:var(--accent5)}
.track-card[data-track="6"]{border-left:3px solid var(--accent1)}
.track-card[data-track="6"] h3{color:var(--accent1)}
.track-card[data-track="7"]{border-left:3px solid var(--accent6)}
.track-card[data-track="7"] h3{color:var(--accent6)}

/* ========== DJ SETS ========== */
#djsets{background:linear-gradient(180deg,var(--surface),transparent)}
.djsets-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:24px}
.djset-card{
  border-radius:var(--radius);
  overflow:hidden;
  border:1px solid rgba(245,166,35,0.15);
  background:rgba(245,166,35,0.03);
  transition:all 0.4s;
}
.djset-card:hover{border-color:var(--gold);transform:translateY(-4px)}
.djset-card iframe{width:100%;height:166px;display:block}
.djset-info{padding:16px 20px 20px}
.djset-info h4{font-family:var(--font-display);font-size:1rem;font-weight:700;margin-bottom:4px}
.djset-info p{font-size:0.8rem;color:var(--muted)}

/* ========== GALLERY ========== */
#gallery{padding-bottom:60px}
.gallery-grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:16px;
}
.gallery-item{
  border-radius:12px;
  overflow:hidden;
  position:relative;
  cursor:pointer;
}
.gallery-item img{
  width:100%;height:100%;
  object-fit:cover;
  transition:transform 0.5s;
  display:block;
}
.gallery-item:hover img{transform:scale(1.05)}
.gallery-item:nth-child(1){grid-row:span 2;grid-column:span 1}
.gallery-item:nth-child(4){grid-row:span 2;grid-column:span 1}
.gallery-item .gallery-overlay{
  position:absolute;
  inset:0;
  background:linear-gradient(180deg,transparent 60%,rgba(10,10,10,0.8) 100%);
  opacity:0;
  transition:opacity 0.3s;
  display:flex;
  align-items:flex-end;
  padding:20px;
}
.gallery-item:hover .gallery-overlay{opacity:1}

/* ========== BOOKING ========== */
#booking{
  background:linear-gradient(180deg,transparent,var(--surface));
}
.booking-layout{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:48px;
}
.booking-info{}
.booking-info p{color:var(--muted);margin-bottom:24px;font-size:1.05rem}
.booking-contact{display:flex;flex-direction:column;gap:16px}
.contact-item{
  display:flex;
  align-items:center;
  gap:12px;
  padding:16px 20px;
  border-radius:12px;
  background:rgba(255,255,255,0.03);
  border:1px solid rgba(255,255,255,0.06);
  text-decoration:none;
  color:var(--text);
  transition:all 0.2s;
}
.contact-item:hover{border-color:var(--gold);background:rgba(245,166,35,0.05)}
.contact-item .icon{font-size:1.3rem}
.contact-item .cta-label{font-size:0.75rem;color:var(--muted);text-transform:uppercase;letter-spacing:1px}
.contact-item .cta-value{font-size:0.95rem;font-weight:500}
.booking-form{
  display:flex;
  flex-direction:column;
  gap:16px;
}
.form-group{}
.form-group label{
  display:block;
  font-size:0.75rem;
  text-transform:uppercase;
  letter-spacing:1px;
  color:var(--muted);
  margin-bottom:6px;
}
.form-group input,.form-group textarea,.form-group select{
  width:100%;
  padding:14px 18px;
  border-radius:10px;
  border:1px solid rgba(255,255,255,0.08);
  background:rgba(255,255,255,0.03);
  color:var(--text);
  font-family:var(--font-body);
  font-size:0.95rem;
  transition:border-color 0.2s;
  outline:none;
}
.form-group input:focus,.form-group textarea:focus,.form-group select:focus{
  border-color:var(--gold);
}
.form-group textarea{min-height:120px;resize:vertical}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.btn-submit{
  padding:16px 32px;
  border-radius:100px;
  border:none;
  background:linear-gradient(135deg,var(--accent2),var(--accent1));
  color:#fff;
  font-family:var(--font-body);
  font-size:0.9rem;
  font-weight:600;
  letter-spacing:1px;
  text-transform:uppercase;
  cursor:pointer;
  transition:all 0.3s;
}
.btn-submit:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(103,58,183,0.4)}

/* ========== FOOTER ========== */
footer{
  position:relative;
  z-index:1;
  padding:40px 24px;
  text-align:center;
  border-top:1px solid rgba(255,255,255,0.05);
}
.footer-social{display:flex;justify-content:center;gap:16px;margin-bottom:24px}
.footer-social a{
  width:44px;height:44px;
  display:flex;align-items:center;justify-content:center;
  border-radius:50%;
  border:1px solid rgba(255,255,255,0.1);
  color:var(--muted);
  text-decoration:none;
  font-size:1.1rem;
  transition:all 0.2s;
}
.footer-social a:hover{color:var(--gold);border-color:var(--gold)}
footer p{font-size:0.75rem;color:#444;letter-spacing:1px}

/* ========== LIGHTBOX ========== */
.lightbox{
  position:fixed;
  inset:0;
  z-index:200;
  background:rgba(0,0,0,0.95);
  display:none;
  align-items:center;
  justify-content:center;
  padding:40px;
  cursor:pointer;
}
.lightbox.active{display:flex}
.lightbox img{max-width:90vw;max-height:90vh;object-fit:contain;border-radius:8px}

/* ========== RESPONSIVE ========== */
@media(max-width:900px){
  .hero-grid{grid-template-columns:1fr;gap:40px}
  .hero-image{max-height:60vh;max-width:400px;margin:0 auto}
  .bio-layout{grid-template-columns:1fr;gap:32px}
  .booking-layout{grid-template-columns:1fr;gap:32px}
  .track-card{grid-template-columns:1fr;gap:20px}
  .gallery-grid{grid-template-columns:repeat(2,1fr)}
  .gallery-item:nth-child(1){grid-row:span 1}
  .gallery-item:nth-child(4){grid-row:span 1}
}
@media(max-width:600px){
  nav{padding:12px 16px}
  .nav-links{display:none}
  .nav-links.open{display:flex;flex-direction:column;position:absolute;top:100%;left:0;right:0;background:rgba(10,10,10,0.98);padding:20px 32px;gap:16px}
  .menu-toggle{display:block}
  section{padding:60px 16px}
  .hero-content h1{font-size:2.5rem}
  .bio-stats{grid-template-columns:1fr}
  .djsets-grid{grid-template-columns:1fr}
  .gallery-grid{grid-template-columns:1fr}
  .form-row{grid-template-columns:1fr}
}
</style>
</head>
<body>

<!-- Canvas Background -->
<canvas id="geo-canvas"></canvas>

<!-- Lightbox -->
<div class="lightbox" id="lightbox" onclick="this.classList.remove('active')"><img id="lightbox-img" src="" alt=""></div>

<!-- Navigation -->
<nav id="nav">
  <a href="#hero" class="nav-logo">Tomasz<span>W</span></a>
  <button class="menu-toggle" onclick="document.getElementById('nav-links').classList.toggle('open')">☰</button>
  <ul class="nav-links" id="nav-links">
    <li><a href="#bio">Bio</a></li>
    <li><a href="#tracks">Muzyka</a></li>
    <li><a href="#djsets">DJ Sety</a></li>
    <li><a href="#gallery">Zdjęcia</a></li>
    <li><a href="#booking">Booking</a></li>
  </ul>
</nav>

<!-- HERO -->
<section id="hero">
  <div class="hero-grid">
    <div class="hero-content">
      <div class="hero-badge">◉ DJ / Producent</div>
      <h1>Tomasz<br>Wojda</h1>
      <p class="subtitle">kick &amp; heavy synth</p>
      <p class="tagline">Hipnotyczne brzmienia elektroniki spotykają organiczne rytmy. Deep, melodic i tribal house w podróż przez dźwięk.</p>
      <div class="hero-actions">
        <a href="#booking" class="btn btn-primary">📅 Booking</a>
        <a href="#tracks" class="btn btn-outline">▶ Słuchaj</a>
      </div>
    </div>
    <div class="hero-image">
      <div class="glow"></div>
      <img src="https://lh3.googleusercontent.com/pw/AP1GczOax5VRBC_Yncj4XuiP8GX75dii8pgaxK6Iqsvm3XheSf2bxBecj9e_u93hm6BDzZMQpc87Pq_Ca2Zvfxij72BldCu0U68bObU67jp-FMjjI0QMSF3_=w800" alt="Tomasz Wojda" loading="eager">
    </div>
  </div>
</section>

<!-- BIO -->
<section id="bio">
  <div class="section-inner">
    <span class="label">● Bio</span>
    <div class="bio-layout">
      <div class="bio-text">
        <p><strong>Tomasz Wojda</strong> – DJ i producent muzyczny, który łączy hipnotyczne brzmienia elektroniki z organicznymi rytmami. Jego sety to podróż przez deep, melodic i tribal house, wzbogacona o etniczne wpływy i hipnotyczne groove'y.</p>
        <br>
        <p>Tworząc muzykę, eksploruje przestrzenie między emocją a rytmem, łącząc analogowe brzmienia z nowoczesną produkcją. Występował w klubach i na eventach w Polsce i Hiszpanii, a jego sety można usłyszeć na festiwalach, w plenerach i na kameralnych, klimatycznych imprezach. 🌿🔊✨</p>
      </div>
      <div class="bio-stats">
        <div class="stat-card">
          <div class="num">7+</div>
          <div class="lbl">Tracków</div>
        </div>
        <div class="stat-card">
          <div class="num">4+</div>
          <div class="lbl">DJ Setów</div>
        </div>
        <div class="stat-card">
          <div class="num">52</div>
          <div class="lbl">Followers</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- TRACKS -->
<section id="tracks">
  <div class="section-inner">
    <span class="label">● Muzyka</span>
    <h2>Utwory</h2>
    <div class="tracks-grid">

      <!-- Track 1: end of war -->
      <div class="track-card" data-track="1">
        <div class="track-info">
          <div class="track-num">01</div>
          <h3>end of war</h3>
          <p class="track-vibe">Głęboki, mroczny, refleksyjny — ciężki kick, przestrzenne syntezatory</p>
        </div>
        <div class="track-player">
          <iframe src="https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Ftomaszwojda%2Fendofwar&color=%238B0000&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true" allow="encrypted-media" loading="lazy"></iframe>
        </div>
      </div>

      <!-- Track 2: plum plum -->
      <div class="track-card" data-track="2">
        <div class="track-info">
          <div class="track-num">02</div>
          <h3>plum plum</h3>
          <p class="track-vibe">Funkowo-elektroniczny, głęboki bas, plumowy groove</p>
        </div>
        <div class="track-player">
          <iframe src="https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Ftomaszwojda%2Fplum-plum-plum&color=%23673AB7&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true" allow="encrypted-media" loading="lazy"></iframe>
        </div>
      </div>

      <!-- Track 3: moonday -->
      <div class="track-card" data-track="3">
        <div class="track-info">
          <div class="track-num">03</div>
          <h3>moonday</h3>
          <p class="track-vibe">Lunatyczny, senny, kosmiczny — księżycowa tekstura</p>
        </div>
        <div class="track-player">
          <iframe src="https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Ftomaszwojda%2Fmoonday&color=%23304FFE&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true" allow="encrypted-media" loading="lazy"></iframe>
        </div>
      </div>

      <!-- Track 4: człowiek jest tylko mocny -->
      <div class="track-card" data-track="4">
        <div class="track-info">
          <div class="track-num">04</div>
          <h3>człowiek jest tylko mocny</h3>
          <p class="track-vibe">Głęboki house, organiczna perkusja, ciepło i siła</p>
        </div>
        <div class="track-player">
          <iframe src="https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Ftomaszwojda%2Fczlowiek-jest-tylko-mocny&color=%23FF8F00&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true" allow="encrypted-media" loading="lazy"></iframe>
        </div>
      </div>

      <!-- Track 5: awaking -->
      <div class="track-card" data-track="5">
        <div class="track-info">
          <div class="track-num">05</div>
          <h3>awaking</h3>
          <p class="track-vibe">Świt w muzyce — wschodzące melodie, budzące się rytmy</p>
        </div>
        <div class="track-player">
          <iframe src="https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Ftomaszwojda%2Fawaking&color=%23FF6D00&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true" allow="encrypted-media" loading="lazy"></iframe>
        </div>
      </div>

      <!-- Track 6: around flame -->
      <div class="track-card" data-track="6">
        <div class="track-info">
          <div class="track-num">06</div>
          <h3>around flame</h3>
          <p class="track-vibe">Ogień i żar — energetyczny, płonący groove</p>
        </div>
        <div class="track-player">
          <iframe src="https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Ftomaszwojda%2Faroundflame&color=%23D50000&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true" allow="encrypted-media" loading="lazy"></iframe>
        </div>
      </div>

      <!-- Track 7: i need to feel -->
      <div class="track-card" data-track="7">
        <div class="track-info">
          <div class="track-num">07</div>
          <h3>i need to feel</h3>
          <p class="track-vibe">Elektryzujący, taneczny, euforyczny — czysta energia</p>
        </div>
        <div class="track-player">
          <iframe src="https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Ftomaszwojda%2Fi-need-to-feel&color=%2300BCD4&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true" allow="encrypted-media" loading="lazy"></iframe>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- DJ SETS -->
<section id="djsets">
  <div class="section-inner">
    <span class="label">● Sety</span>
    <h2>DJ Sety</h2>
    <div class="djsets-grid">

      <div class="djset-card">
        <iframe src="https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Ftomaszwojda%2Felementy&color=%23F5A623&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false" allow="encrypted-media" loading="lazy"></iframe>
        <div class="djset-info">
          <h4>Elementy — Deephouse set</h4>
          <p>Podróż przez elementy deep house'u</p>
        </div>
      </div>

      <div class="djset-card">
        <iframe src="https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Ftomaszwojda%2Fantiquario-djset&color=%23F5A623&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false" allow="encrypted-media" loading="lazy"></iframe>
        <div class="djset-info">
          <h4>Antiquario Cafe DJ Set</h4>
          <p>Torre del Mar, 26.04.2025</p>
        </div>
      </div>

      <div class="djset-card">
        <iframe src="https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Ftomaszwojda%2Fwarsaw-bridge-boombox-deep-house-mashup-tomasz-wojda&color=%23F5A623&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false" allow="encrypted-media" loading="lazy"></iframe>
        <div class="djset-info">
          <h4>Warsaw Bridge Boombox</h4>
          <p>House &amp; Deep House Mashup DJ Set</p>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- GALLERY -->
<section id="gallery">
  <div class="section-inner">
    <span class="label">● Galeria</span>
    <h2>Foto</h2>
    <div class="gallery-grid">
      <div class="gallery-item">
        <img src="https://lh3.googleusercontent.com/pw/AP1GczOax5VRBC_Yncj4XuiP8GX75dii8pgaxK6Iqsvm3XheSf2bxBecj9e_u93hm6BDzZMQpc87Pq_Ca2Zvfxij72BldCu0U68bObU67jp-FMjjI0QMSF3_=w800" alt="Tomasz Wojda - portret 1" loading="lazy" onclick="openLightbox(this.src)">
        <div class="gallery-overlay"><span>Portret</span></div>
      </div>
      <div class="gallery-item">
        <img src="https://lh3.googleusercontent.com/pw/AP1GczMjr2Bf-gFS3lOPeY_cXnCpquS_ZTui3lhKDTMCU9yXubQDSM6Aiu5cX5ZrgzpLWUBlgTVq-ko85BLB0fHG8FAzKRXsKW8x13MEtdo_uMzRANm8K6bT=w800" alt="Tomasz Wojda - portret 2" loading="lazy" onclick="openLightbox(this.src)">
        <div class="gallery-overlay"><span>Sesja</span></div>
      </div>
      <div class="gallery-item">
        <img src="https://lh3.googleusercontent.com/pw/AP1GczMtZiR30P5ajnS3hBPC3qb90aScU4mglfms0GK9m_O_vowsH-ED07z529uJynv1_AKW2EBtWzVqXTyBfDkjwI8iXNcDEhFjwlnVTXqaEhoBm_UA2NK1=w800" alt="Tomasz Wojda - portret 3" loading="lazy" onclick="openLightbox(this.src)">
        <div class="gallery-overlay"><span>Klimat</span></div>
      </div>
      <div class="gallery-item">
        <img src="https://lh3.googleusercontent.com/pw/AP1GczOyOlGCgymkpLsq6V73_yrse43SDUINnV3YOzDTZ_YQkNvR7GRgMasyzUYdRCYUlaR3bZn36Z7SU_iHo0wYHGRzFxZu98q-XQbLMTNfOC6lEeCXVhCU=w800" alt="Tomasz Wojda - portret 4" loading="lazy" onclick="openLightbox(this.src)">
        <div class="gallery-overlay"><span>Dark</span></div>
      </div>
      <div class="gallery-item">
        <img src="https://lh3.googleusercontent.com/pw/AP1GczNMKTwveuVgi3hq0IgX9dheTrWObwVAk-GnBhmvERNDwl7NPtEj_k1_iAfQ-RGXIOGb7KBwjedxcE2zDG_2KHG11vzvuspGZDtdaPLf-85OWRmBR71c=w800" alt="Tomasz Wojda - portret 5" loading="lazy" onclick="openLightbox(this.src)">
        <div class="gallery-overlay"><span>Styl</span></div>
      </div>
      <div class="gallery-item">
        <img src="https://lh3.googleusercontent.com/pw/AP1GczNao7BpXFuSB7WmJQZUSQXKkm7MwhuBtSp04lSk5gzCIXFQWqKkXy8bcZvYpXONvo1MomGn9ZOkCgylL9ZqM00fwVPB0hk69MQWeKRbQjyxA1INow7I=w800" alt="Tomasz Wojda - portret 6" loading="lazy" onclick="openLightbox(this.src)">
        <div class="gallery-overlay"><span>Vibe</span></div>
      </div>
    </div>
  </div>
</section>

<!-- BOOKING -->
<section id="booking">
  <div class="section-inner">
    <span class="label">● Kontakt</span>
    <h2>Booking</h2>
    <div class="booking-layout">
      <div class="booking-info">
        <p>Zainteresowany bookingiem? Chcesz zagrać koncert, festiwal lub klubowy set? Napisz — ustalimy szczegóły.</p>
        <div class="booking-contact">
          <a href="https://instagram.com/tomasz_wojda" target="_blank" rel="noopener" class="contact-item">
            <span class="icon">📷</span>
            <div>
              <div class="cta-label">Instagram</div>
              <div class="cta-value">@tomasz_wojda</div>
            </div>
          </a>
          <a href="https://soundcloud.com/tomaszwojda" target="_blank" rel="noopener" class="contact-item">
            <span class="icon">🎵</span>
            <div>
              <div class="cta-label">SoundCloud</div>
              <div class="cta-value">/tomaszwojda</div>
            </div>
          </a>
        </div>
      </div>
      <form class="booking-form">
        <div class="form-row">
          <div class="form-group">
            <label for="name">Imię / Nazwa</label>
            <input type="text" id="name" name="name" required placeholder="Twoje imię">
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required placeholder="kontakt@klub.pl">
          </div>
        </div>
        <div class="form-group">
          <label for="type">Rodzaj zapytania</label>
          <select id="type" name="type">
            <option value="booking">Booking — koncert/set</option>
            <option value="collab">Kolaboracja</option>
            <option value="other">Inne</option>
          </select>
        </div>
        <div class="form-group">
          <label for="message">Wiadomość</label>
          <textarea id="message" name="message" required placeholder="Opisz wydarzenie, datę, miejsce i budżet..."></textarea>
        </div>
        <button type="submit" class="btn-submit">📤 Wyślij zapytanie</button>
      </form>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <div class="footer-social">
    <a href="https://soundcloud.com/tomaszwojda" target="_blank" rel="noopener" aria-label="SoundCloud">🔊</a>
    <a href="https://instagram.com/tomasz_wojda" target="_blank" rel="noopener" aria-label="Instagram">📷</a>
    <a href="https://facebook.com/wojdatomasz" target="_blank" rel="noopener" aria-label="Facebook">👤</a>
  </div>
  <p>© 2026 Tomasz Wojda &middot; kick &amp; heavy synth ⛓</p>
</footer>

<script>
// Lightbox
function openLightbox(src){
  document.getElementById('lightbox-img').src=src;
  document.getElementById('lightbox').classList.add('active');
}

// Nav scroll effect
window.addEventListener('scroll',()=>{
  document.getElementById('nav').classList.toggle('scrolled',window.scrollY>80);
});

// Booking form handler
document.querySelector('.booking-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('.btn-submit');
  btn.textContent = '⏳ Wysyłanie...';
  btn.disabled = true;
  // Collect data
  const data = new URLSearchParams(new FormData(this));
  // Send via fetch to a backend or show success
  setTimeout(() => {
    btn.textContent = '✅ Wysłano!';
    this.reset();
    setTimeout(() => { btn.textContent = '📤 Wyślij zapytanie'; btn.disabled = false; }, 3000);
  }, 1000);
});

// Canvas — Dynamic Geometric Lines
const canvas=document.getElementById('geo-canvas');
const ctx=canvas.getContext('2d');

function resize(){
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;
}
resize();
window.addEventListener('resize',resize);

const points=[];
const pointCount=60;
const connectionDist=180;

// Generate points
for(let i=0;i<pointCount;i++){
  points.push({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    vx:(Math.random()-0.5)*0.5,
    vy:(Math.random()-0.5)*0.5,
    size:Math.random()*2+1
  });
}

let mouseX=canvas.width/2,mouseY=canvas.height/2;
document.addEventListener('mousemove',e=>{mouseX=e.clientX;mouseY=e.clientY});

function draw(progress){
  const scrollY=window.scrollY;
  const scrollFactor=Math.min(scrollY/(document.body.scrollHeight-window.innerHeight),1);

  ctx.clearRect(0,0,canvas.width,canvas.height);

  // Colors shift based on scroll
  const colors=[
    [139,0,0],     // deep red
    [103,58,183],  // purple
    [48,63,254],   // blue
    [255,143,0],   // amber
    [0,188,212],   // cyan
    [245,166,35],  // gold
  ];
  const colorIdx=Math.floor(scrollFactor*(colors.length-1));
  const nextIdx=Math.min(colorIdx+1,colors.length-1);
  const t=scrollFactor*(colors.length-1)-colorIdx;
  const r=Math.round(colors[colorIdx][0]+(colors[nextIdx][0]-colors[colorIdx][0])*t);
  const g=Math.round(colors[colorIdx][1]+(colors[nextIdx][1]-colors[colorIdx][1])*t);
  const b=Math.round(colors[colorIdx][2]+(colors[nextIdx][2]-colors[colorIdx][2])*t);

  // Update points with mouse influence
  points.forEach(p=>{
    p.x+=p.vx;
    p.y+=p.vy;

    // Mouse repulsion
    const dx=p.x-mouseX;
    const dy=p.y-mouseY;
    const dist=Math.sqrt(dx*dx+dy*dy);
    if(dist<200){
      p.x+=dx/dist*0.3;
      p.y+=dy/dist*0.3;
    }

    // Wrap around edges
    if(p.x<0)p.x=canvas.width;
    if(p.x>canvas.width)p.x=0;
    if(p.y<0)p.y=canvas.height;
    if(p.y>canvas.height)p.y=0;
  });

  // Draw connections
  for(let i=0;i<points.length;i++){
    for(let j=i+1;j<points.length;j++){
      const dx=points[i].x-points[j].x;
      const dy=points[i].y-points[j].y;
      const dist=Math.sqrt(dx*dx+dy*dy);
      if(dist<connectionDist){
        const alpha=(1-dist/connectionDist)*0.4*(1-scrollFactor*0.3);
        ctx.beginPath();
        ctx.moveTo(points[i].x,points[i].y);
        ctx.lineTo(points[j].x,points[j].y);
        ctx.strokeStyle='rgba('+r+','+g+','+b+','+alpha+')';
        ctx.lineWidth=0.5+scrollFactor*0.5;
        ctx.stroke();
      }
    }
  }

  // Draw points
  points.forEach(p=>{
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
    ctx.fillStyle='rgba('+r+','+g+','+b+','+(0.3+scrollFactor*0.3)+')';
    ctx.fill();
  });

  // Additional geometric shapes (triangles) at scroll intervals
  if(scrollFactor>0.1){
    const triCount=Math.floor(scrollFactor*15);
    for(let i=0;i<triCount;i++){
      const pi=Math.floor(Math.random()*points.length);
      const pj=Math.floor(Math.random()*points.length);
      const pk=Math.floor(Math.random()*points.length);
      ctx.beginPath();
      ctx.moveTo(points[pi].x,points[pi].y);
      ctx.lineTo(points[pj].x,points[pj].y);
      ctx.lineTo(points[pk].x,points[pk].y);
      ctx.closePath();
      ctx.fillStyle='rgba('+r+','+g+','+b+','+(0.02+scrollFactor*0.03)+')';
      ctx.fill();
    }
  }

  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);
</script>

</body>
</html>`;

export default {
  async fetch(request) {
    const url = new URL(request.url);

    return new Response(HTML, {
      headers: {
        "content-type": "text/html;charset=UTF-8",
        "cache-control": "public, max-age=3600, s-maxage=86400",
        "x-content-type-options": "nosniff",
        "strict-transport-security": "max-age=31536000"
      }
    });
  }
};
