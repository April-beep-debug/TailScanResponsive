<template>
<div>
<section class="hero galeria-hero">
  <div class="blob orange"></div>
  <div class="blob blue"></div>
  <h1>Galería de adopción</h1>
  <p>Encuentra a tu compañero ideal 🐾</p>
  <p class="sub">Cada mascota merece un hogar lleno de amor.</p>
</section>

<main>
  <div class="columns">

    <!-- PERROS -->
    <div class="panel">
      <div class="panel-head">
        <div class="panel-title">
          <div class="icon-circle blue">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 15c-3 0-5 2-5 4h10c0-2-2-4-5-4z"/><circle cx="12" cy="10" r="2.2"/><circle cx="7" cy="7" r="1.6"/><circle cx="17" cy="7" r="1.6"/></svg>
          </div>
          <div><h2>Perros</h2><p>Cariñosos, leales y listos para llenar tu vida de alegría.</p></div>
        </div>
        <div class="badge blue">🐾 32 disponibles</div>
      </div>

      <div class="filters">
        <select><option>Tamaño</option></select>
        <select><option>Edad</option></select>
        <select><option>Sexo</option></select>
        <div class="filter-btn blue">▽ Filtrar</div>
      </div>

      <div class="cards">
        <div class="card">
          <div class="thumb blue">
            <img src="../assets/img/toby.png" alt="Toby" />
          </div>
          <h3>Toby</h3>
          <div class="meta">Macho • 2 años</div>
          <span class="tag blue">Mediano</span>
          <div class="loc"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-6-7-11a7 7 0 0114 0c0 5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>Refugio Centro</div>
          <router-link class="btn-outline blue" :to="{ path: '/mascota', query: { id: 'toby' } }">♡ Ver perfil</router-link>
        </div>

        <div class="card">
          <div class="thumb blue">
            <img src="../assets/img/luna.png" alt="Luna" />
          </div>
          <h3>Luna</h3>
          <div class="meta">Hembra • 1 año</div>
          <span class="tag blue">Mediano</span>
          <div class="loc"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-6-7-11a7 7 0 0114 0c0 5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>Refugio Norte</div>
          <router-link class="btn-outline blue" :to="{ path: '/mascota', query: { id: 'luna' } }">♡ Ver perfil</router-link>
        </div>

        <div class="card">
          <div class="thumb blue">
            <img src="../assets/img/bruno.png" alt="Bruno" />
          </div>
          <h3>Bruno</h3>
          <div class="meta">Macho • 1 año</div>
          <span class="tag blue">Pequeño</span>
          <div class="loc"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-6-7-11a7 7 0 0114 0c0 5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>Refugio Sur</div>
          <router-link class="btn-outline blue" :to="{ path: '/mascota', query: { id: 'bruno' } }">♡ Ver perfil</router-link>
        </div>
      </div>

      <button class="view-all blue">Ver todos los perros →</button>
    </div>

    <!-- GATOS -->
    <div class="panel">
      <div class="panel-head">
        <div class="panel-title">
          <div class="icon-circle orange">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 4l2 5h8l2-5-4 3H10L6 4z"/><path d="M8 9c-2 1-3 4-3 6 0 3 3 5 7 5s7-2 7-5c0-2-1-5-3-6"/></svg>
          </div>
          <div><h2>Gatos</h2><p>Independientes, tiernos y con personalidades únicas.</p></div>
        </div>
        <div class="badge orange">🐾 28 disponibles</div>
      </div>

      <div class="filters">
        <select><option>Edad</option></select>
        <select><option>Sexo</option></select>
        <select><option>Personalidad</option></select>
        <div class="filter-btn orange">▽ Filtrar</div>
      </div>

      <div class="cards">
        <div class="card">
          <div class="thumb orange">
            <img src="../assets/img/michi.png" alt="Michi" />
          </div>
          <h3>Michi</h3>
          <div class="meta">Hembra • 8 meses</div>
          <span class="tag orange">Juguetona</span>
          <div class="loc"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-6-7-11a7 7 0 0114 0c0 5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>Refugio Centro</div>
          <router-link class="btn-outline orange" :to="{ path: '/mascota', query: { id: 'michi' } }">♡ Ver perfil</router-link>
        </div>

        <div class="card">
          <div class="thumb orange">
            <img src="../assets/img/simba.png" alt="Simba" />
          </div>
          <h3>Simba</h3>
          <div class="meta">Macho • 1 año</div>
          <span class="tag orange">Tranquilo</span>
          <div class="loc"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-6-7-11a7 7 0 0114 0c0 5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>Refugio Norte</div>
          <router-link class="btn-outline orange" :to="{ path: '/mascota', query: { id: 'simba' } }">♡ Ver perfil</router-link>
        </div>

        <div class="card">
          <div class="thumb orange">
            <img src="../assets/img/nala.png" alt="Nala" />
          </div>
          <h3>Nala</h3>
          <div class="meta">Hembra • 2 años</div>
          <span class="tag orange">Cariñosa</span>
          <div class="loc"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-6-7-11a7 7 0 0114 0c0 5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>Refugio Sur</div>
          <router-link class="btn-outline orange" :to="{ path: '/mascota', query: { id: 'nala' } }">♡ Ver perfil</router-link>
        </div>
      </div>

      <button class="view-all orange">Ver todos los gatos →</button>
    </div>
  </div>

  <div class="features">
    <div class="feature">
      <div class="fic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-4.5-9.5-9C.5 8 2 4 6 4c2.4 0 4 1.5 6 4 2-2.5 3.6-4 6-4 4 0 5.5 4 3.5 8-2.5 4.5-9.5 9-9.5 9z"/></svg></div>
      <div><h4>Adopta</h4><p>Cambia dos vidas</p></div>
    </div>
    <div class="feature">
      <div class="fic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg></div>
      <div><h4>Responsable</h4><p>Compromiso para siempre</p></div>
    </div>
    <div class="feature">
      <div class="fic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 15c-3 0-5 2-5 4h10c0-2-2-4-5-4z"/><circle cx="12" cy="10" r="2.2"/><circle cx="7" cy="7" r="1.6"/><circle cx="17" cy="7" r="1.6"/></svg></div>
      <div><h4>Apoyo</h4><p>Te acompañamos</p></div>
    </div>
    <div class="feature">
      <div class="fic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></svg></div>
      <div><h4>Hogar</h4><p>Donde comienza el amor</p></div>
    </div>
  </div>
</main>
</div>
</template>

<style>
:root{
  --blue:#1d4fd7;
  --blue-dark:#123a9e;
  --orange:#f2622e;
  --orange-dark:#d9491a;
  --bg:#f4f6fb;
  --card:#ffffff;
  --ink:#0f1b3d;
  --muted:#5b6376;
  --line:#e6e9f2;
}
*{box-sizing:border-box;}
body{
  margin:0;
  font-family:'Segoe UI',Helvetica,Arial,sans-serif;
  background:var(--bg);
  color:var(--ink);
}
a{text-decoration:none;color:inherit;}

/* Hero (compact) */
.hero{
  position:relative;overflow:hidden;padding:18px 24px 18px;text-align:center;min-height:120px;
}
.hero h1{font-size:36px;margin:0;color:var(--ink);font-weight:800;}
.hero p{font-size:16px;color:var(--blue);font-weight:700;margin:8px 0 2px;}
.hero p.sub{color:var(--muted);font-weight:400;font-size:14px;margin-top:6px}
.blob{position:absolute;border-radius:50%;opacity:.45;z-index:0;pointer-events:none}
.blob.orange{width:260px;height:260px;background:linear-gradient(135deg,#ffb27a,#f2622e);top:-80px;right:-120px;}
.blob.blue{width:160px;height:160px;background:#dbe4fb;bottom:-60px;left:-60px;}
.hero *{position:relative;z-index:1;}

/* Strong override for this component's hero to avoid other global rules */
.galeria-hero{padding:12px 16px 12px !important;min-height:80px !important}
.galeria-hero .blob{display:block}
.galeria-hero .blob.orange{top:-60px;right:-80px;width:200px;height:200px}
.galeria-hero .blob.blue{bottom:-40px;left:-40px;width:120px;height:120px}

main{max-width:1400px;margin:0 auto;padding:0 48px 60px;}

.columns{display:grid;grid-template-columns:1fr 1fr;gap:32px;}
.panel{
  background:var(--card);border-radius:20px;padding:28px;
  box-shadow:0 10px 30px rgba(15,27,61,.05);
}
.panel-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;}
.panel-title{display:flex;align-items:center;gap:14px;}
.icon-circle{
  width:52px;height:52px;border-radius:50%;display:flex;align-items:center;justify-content:center;
}
.icon-circle.blue{background:var(--blue);}
.icon-circle.orange{background:var(--orange);}
.icon-circle svg{width:26px;height:26px;color:#fff;}
.panel-title h2{margin:0;font-size:24px;}
.panel-title p{margin:2px 0 0;color:var(--muted);font-size:14px;}
.badge{
  padding:8px 14px;border-radius:8px;font-weight:700;font-size:14px;
  display:flex;align-items:center;gap:6px;white-space:nowrap;
}
.badge.blue{background:#eaf0fe;color:var(--blue);}
.badge.orange{background:#fdece4;color:var(--orange);}

.filters{display:flex;gap:10px;margin:20px 0;flex-wrap:wrap;}
.filters select, .filter-btn{
  border:1px solid var(--line);background:#fff;border-radius:8px;padding:10px 14px;
  font-size:14px;color:var(--ink);
}
.filter-btn{
  display:flex;align-items:center;gap:6px;font-weight:700;cursor:pointer;
}
.filter-btn.blue{color:var(--blue);}
.filter-btn.orange{color:var(--orange);}

.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;}
.card{
  border:1px solid var(--line);border-radius:16px;padding:16px;background:#fff;
  display:flex;flex-direction:column;
}
.thumb{
  border-radius:12px;aspect-ratio:1/1;display:flex;align-items:center;justify-content:center;
  margin-bottom:14px;
}
.thumb.blue{background:#eef2fd;}
.thumb.orange{background:#fdece4;}
.thumb img{width:100%;height:100%;object-fit:cover;border-radius:12px;display:block}
.card h3{margin:0 0 4px;font-size:19px;}
.card .meta{color:var(--muted);font-size:14px;margin-bottom:10px;}
.tag{
  align-self:flex-start;padding:5px 12px;border-radius:20px;font-size:13px;font-weight:600;margin-bottom:10px;
}
.tag.blue{background:#eaf0fe;color:var(--blue);}
.tag.orange{background:#fdece4;color:var(--orange);}
.loc{display:flex;align-items:center;gap:6px;color:var(--muted);font-size:14px;margin-bottom:14px;}
.loc svg{width:14px;height:14px;}

.btn-outline{
  margin-top:auto;border:1px solid var(--line);border-radius:10px;padding:10px;
  display:flex;align-items:center;justify-content:center;gap:8px;font-weight:700;font-size:14px;
  background:#fff;cursor:pointer;
}
.btn-outline.blue{color:var(--blue);border-color:#cfdcfb;}
.btn-outline.orange{color:var(--orange);border-color:#f8d3c1;}
.btn-outline:hover.blue{background:#eaf0fe;}
.btn-outline:hover.orange{background:#fdece4;}

.view-all{
  margin-top:20px;width:100%;border:none;border-radius:12px;padding:16px;
  font-weight:700;font-size:16px;color:#fff;display:flex;align-items:center;justify-content:center;gap:10px;cursor:pointer;
}
.view-all.blue{background:var(--blue);}
.view-all.orange{background:var(--orange);}

.features{
  margin-top:40px;background:#fff;border-radius:20px;padding:28px 40px;
  display:grid;grid-template-columns:repeat(4,1fr);gap:20px;
  box-shadow:0 10px 30px rgba(15,27,61,.05);
}
.feature{display:flex;align-items:center;gap:14px;}
.feature .fic{
  width:44px;height:44px;border-radius:50%;background:#eaf0fe;color:var(--blue);
  display:flex;align-items:center;justify-content:center;flex-shrink:0;
}
.feature .fic svg{width:20px;height:20px;}
.feature h4{margin:0;font-size:16px;}
.feature p{margin:2px 0 0;color:var(--muted);font-size:13px;}

@media(max-width:1000px){
  .columns,.cards{grid-template-columns:1fr;}
  .features{grid-template-columns:1fr 1fr;}
  .hero{padding:18px 20px;}
  main{padding:0 20px 40px;}
}
</style>