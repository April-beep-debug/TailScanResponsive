<script setup>
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import tobyImg from '../assets/img/toby.png'
import lunaImg from '../assets/img/luna.png'
import brunoImg from '../assets/img/bruno.png'
import michiImg from '../assets/img/michi.png'
import simbaImg from '../assets/img/simba.png'
import nalaImg from '../assets/img/nala.png'

// ---- Reusable SVG icons ----
const perroIcon = `<path d="M12 21c-3 0-6-2-6-5 0-2 2-3 6-3s6 1 6 3c0 3-3 5-6 5z"/><circle cx="7" cy="8" r="2"/><circle cx="17" cy="8" r="2"/><circle cx="9" cy="4.5" r="1.6"/><circle cx="15" cy="4.5" r="1.6"/>`;
const gatoIcon  = `<path d="M6 4l2 5h8l2-5-4 3H10L6 4z"/><path d="M8 9c-2 1-3 4-3 6 0 3 3 5 7 5s7-2 7-5c0-2-1-5-3-6"/>`;

// ---- Pet data (connected through the ?id= query parameter) ----
const mascotas = {
  toby: {
    nombre:"Toby", especie:"perro", sexo:"Male", edad:"2 years", tamanoPill:"Medium",
    photo: 'toby.png',
    desc:"Toby is a loving, loyal, energetic dog. He loves to play, go for walks, and receive affection. Ideal for an active family that can give him love and attention.",
    refugio:"Central Shelter", ciudad:"Mexico City",
    rescate:"Rescued 6 months ago", vacunado:"Yes", esterilizado:"Yes",
    tamano:"Medium (15 - 25 kg)", energia:"High", otrosLabel:"With other dogs", otros:"Very well",
    ninos:"Good", gatos:"Not tested", gatosColor:"amber",
    personalidad:"Playful, loyal, loving",
    historia:"Toby was rescued from the street. Despite his past, he is a very noble and grateful dog. He is ready to find his forever home.",
    tel:"55 1234 5678", mail:"adopciones@refugiocentro.org", dir:"Av. de los Insurgentes 123, CDMX",
    recomendaciones:[
      {t:"Home with a yard", d:"Ideal for running and playing freely."},
      {t:"Daily exercise", d:"Needs regular physical activity to stay happy."},
      {t:"Interactive toys", d:"Loves challenges and mental games."}
    ]
  },
  luna: {
    nombre:"Luna", especie:"perro", sexo:"Female", edad:"1 year", tamanoPill:"Medium",
    desc:"Luna is sweet, curious, and very sociable. She enjoys meeting new people and learning tricks. She adapts well to homes with children and other pets.",
    refugio:"North Shelter", ciudad:"Mexico City",
    rescate:"Rescued 4 months ago", vacunado:"Yes", esterilizado:"Yes",
    tamano:"Medium (12 - 20 kg)", energia:"Medium-high", otrosLabel:"With other dogs", otros:"Very well",
    ninos:"Very good", gatos:"Good", gatosColor:"green",
    personalidad:"Sociable, curious, obedient",
    historia:"Luna arrived at the shelter as a puppy after being abandoned. She has grown up surrounded by care and is ready for a loving home.",
    tel:"55 2345 6789", mail:"adopciones@refugionorte.org", dir:"Calle Reforma 45, CDMX",
    photo: 'luna.png',
    recomendaciones:[
      {t:"Active family", d:"She loves walks and playing outdoors."},
      {t:"Positive training", d:"She learns quickly with positive reinforcement."},
      {t:"Frequent company", d:"She really enjoys having company."}
    ]
  },
  bruno: {
    nombre:"Bruno", especie:"perro", sexo:"Male", edad:"1 year", tamanoPill:"Small",
    desc:"Bruno is a small dog with a big personality. He is brave, alert, and very attached to his family once he builds trust.",
    refugio:"South Shelter", ciudad:"Mexico City",
    rescate:"Rescued 3 months ago", vacunado:"Yes", esterilizado:"No",
    tamano:"Small (5 - 10 kg)", energia:"Medium", otrosLabel:"With other dogs", otros:"Good",
    ninos:"Good, supervised", gatos:"Not tested", gatosColor:"amber",
    personalidad:"Brave, alert, attached",
    historia:"Bruno was found wandering alone in the street. It took him time to trust people, but today he is a faithful and loving companion.",
    tel:"55 3456 7890", mail:"adopciones@refugiosur.org", dir:"Av. Universidad 210, CDMX",
    photo: 'bruno.png',
    recomendaciones:[
      {t:"Quiet home", d:"He adapts best to calm environments."},
      {t:"Initial patience", d:"He needs time to build trust."},
      {t:"Short walks", d:"He enjoys brief, frequent walks."}
    ]
  },
  michi: {
    nombre:"Michi", especie:"gato", sexo:"Female", edad:"8 months", tamanoPill:"Playful",
    desc:"Michi is a kitten full of energy and curiosity. She loves exploring, jumping, and playing with yarn. Perfect for anyone seeking an active companion.",
    refugio:"Central Shelter", ciudad:"Mexico City",
    rescate:"Rescued 2 months ago", vacunado:"Yes", esterilizado:"No",
    tamano:"Small (2 - 4 kg)", energia:"High", otrosLabel:"With other cats", otros:"Good",
    ninos:"Good", gatos:"Very good", gatosColor:"green",
    personalidad:"Playful, curious, active",
    historia:"Michi arrived at the shelter very small. She has grown up happy and healthy, and now seeks a family that will continue nurturing her curiosity.",
    tel:"55 1234 5678", mail:"adopciones@refugiocentro.org", dir:"Av. de los Insurgentes 123, CDMX",
    photo: 'michi.png',
    recomendaciones:[
      {t:"Climbing spaces", d:"She loves scratching posts and tall towers."},
      {t:"Interactive toys", d:"She needs daily mental stimulation."},
      {t:"Safe windows", d:"She enjoys watching the outdoors through protective screens."}
    ]
  },
  simba: {
    nombre:"Simba", especie:"gato", sexo:"Male", edad:"1 year", tamanoPill:"Calm",
    desc:"Simba is a calm, observant cat. He prefers quiet environments and enjoys long naps in the sun. Ideal for peaceful homes.",
    refugio:"North Shelter", ciudad:"Mexico City",
    rescate:"Rescued 5 months ago", vacunado:"Yes", esterilizado:"Yes",
    tamano:"Medium (4 - 5 kg)", energia:"Low", otrosLabel:"With other cats", otros:"Good",
    ninos:"Good, with his own space", gatos:"Very good", gatosColor:"green",
    personalidad:"Calm, observant, independent",
    historia:"Simba was brought to the shelter by a family that could no longer care for him. He adapted quickly and is now one of the most beloved cats here.",
    tel:"55 2345 6789", mail:"adopciones@refugionorte.org", dir:"Calle Reforma 45, CDMX",
    photo: 'simba.png',
    recomendaciones:[
      {t:"Quiet corners", d:"He needs his own place to rest."},
      {t:"Stable routine", d:"He feels safer with fixed schedules."},
      {t:"Low noise", d:"He prefers quiet environments."}
    ]
  },
  nala: {
    nombre:"Nala", especie:"gato", sexo:"Female", edad:"2 years", tamanoPill:"Affectionate",
    desc:"Nala is a very affectionate cat who seeks constant contact and cuddles. She loves curling up and following her person around the house.",
    refugio:"South Shelter", ciudad:"Mexico City",
    rescate:"Rescued 7 months ago", vacunado:"Yes", esterilizado:"Yes",
    tamano:"Medium (3.5 - 5 kg)", energia:"Medium", otrosLabel:"With other cats", otros:"Good",
    ninos:"Very good", gatos:"Good", gatosColor:"green",
    personalidad:"Affectionate, sociable, calm",
    historia:"Nala spent much of her life on the street before arriving at the shelter. Today she is looking for a home where she can receive all the love she gives.",
    tel:"55 3456 7890", mail:"adopciones@refugiosur.org", dir:"Av. Universidad 210, CDMX",
    photo: 'nala.png',
    recomendaciones:[
      {t:"Constant company", d:"She does not like spending much time alone."},
      {t:"Soft beds", d:"She loves curling up in warm blankets."},
      {t:"Daily affection", d:"She thrives on frequent attention and affection."}
    ]
  }
};

// ---- LEER PARÁMETRO DE LA URL Y RENDERIZAR ----
const route = useRoute();

function renderForId(idParam){
  const id = idParam || 'toby';
  const m = mascotas[id] || mascotas.toby;
  const icon = m.especie === 'gato' ? gatoIcon : perroIcon;
  const iconColor = m.especie === 'gato' ? '#f2622e' : '#1d4fd7';

  const photoIcon = document.getElementById('photo-icon');
  if (photoIcon) {
    photoIcon.innerHTML = icon;
    photoIcon.setAttribute('stroke', iconColor);
  }
  const photoImg = document.getElementById('p-photo');
  if (photoImg && m.photo) {
    try {
      const localUrl = new URL(`../assets/img/${m.photo}`, import.meta.url).href;
      photoImg.src = localUrl;
    } catch (e) {
      photoImg.src = m.photo;
    }
    photoImg.style.display = 'block';
    if (photoIcon) photoIcon.style.display = 'none';
  } else if (photoImg) {
    photoImg.style.display = 'none';
    if (photoIcon) photoIcon.style.display = 'block';
  }

  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };

  const setHtml = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = value;
  };

  document.title = `TailScan — ${m.nombre}`;
  setText('crumb-name', m.nombre);
  setText('p-name', m.nombre);
  setHtml('p-pills', `
    <div class="pill">${m.sexo === 'Male' ? '♂' : '♀'} ${m.sexo}</div>
    <div class="pill">${m.edad}</div>
    <div class="pill">${m.tamanoPill}</div>`);
  setText('p-desc', m.desc);
  setText('p-refugio', m.refugio);
  setText('p-ciudad', m.ciudad);
  setText('p-rescate', m.rescate);
  setText('p-vacunado', m.vacunado);
  setText('p-esterilizado', m.esterilizado);
  setText('rec-title', `Recommendations for ${m.nombre}`);
  setText('p-compromiso', `By adopting ${m.nombre}, you commit to providing love, veterinary care, and a safe home for life.`);

  setText('about-title', `About ${m.nombre}`);
  setText('s-tamano', m.tamano);
  setText('s-energia', m.energia);

  const otrosEl = document.getElementById('s-otros');
  const otrosLabelEl = otrosEl?.parentElement?.querySelector('.lbl');
  if (otrosEl && otrosLabelEl) {
    otrosLabelEl.textContent = m.otrosLabel;
    otrosEl.textContent = m.otros;
  }

  setText('s-ninos', m.ninos);
  const gatosEl = document.getElementById('s-gatos');
  if (gatosEl) {
    gatosEl.textContent = m.gatos;
    gatosEl.className = 'val ' + m.gatosColor;
  }
  setText('s-personalidad', m.personalidad);

  setText('p-historia', m.historia);
  setText('c-tel', m.tel);
  setText('c-mail', m.mail);
  setText('c-dir', m.dir);

  setHtml('rec-grid', m.recomendaciones.map(r => `
    <div class="rec-card">
      <div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/></svg></div>
      <div><h4>${r.t}</h4><p>${r.d}</p></div>
    </div>
  `).join(''));
}

onMounted(() => {
  renderForId(route.query.id);
});

watch(() => route.query.id, (val) => {
  renderForId(val);
});
</script>

<template>
<main>
  <button class="page-back-button" @click="$router.back()" aria-label="Back">←</button>
  <div class="grid">
    <div>
      <div class="panel">
        <div class="photo">
          <svg id="photo-icon" viewBox="0 0 24 24" fill="none" stroke="#1d4fd7" stroke-width="1.2"></svg>
          <img id="p-photo" alt="Pet photo" style="display:none" />
        </div>
        <h1 class="name" id="p-name">—</h1>
        <div class="pills" id="p-pills"></div>
        <p class="desc" id="p-desc"></p>

        <div class="info-row">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-6-7-11a7 7 0 0114 0c0 5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>
          <div><b id="p-refugio"></b><span id="p-ciudad"></span></div>
        </div>
        <div class="info-row">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 4L9 15l-5-5"/></svg>
          <div><b id="p-rescate"></b><span>—</span></div>
        </div>
        <div class="info-row">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3 6
            6 1-4.5 4.5L18 20l-6-3-6 3 1.5-6.5L3 9l6-1 3-6z"/></svg>
          <div><b>Vaccinated</b><span id="p-vacunado"></span></div>
        </div>
        <div class="info-row">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="8" r="3"/><circle cx="16" cy="16" r="3"/></svg>
          <div><b>Spayed/neutered</b><span id="p-esterilizado"></span></div>
        </div>

        <div class="actions">
          <button class="btn-primary">♡ I want to adopt</button>
          <button class="btn-secondary">⇪ Share</button>
        </div>
      </div>

      <div class="panel">
        <div class="side-title">
          <div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 15c-3 0-5 2-5 4h10c0-2-2-4-5-4z"/><circle cx="12" cy="10" r="2.2"/><circle cx="7" cy="7" r="1.6"/><circle cx="17" cy="7" r="1.6"/></svg></div>
          <h2 id="rec-title">Recommendations</h2>
        </div>
        <div class="rec-grid" id="rec-grid"></div>
      </div>

      <div class="footer-banner">
        <div class="l">
          <div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg></div>
          <div>
            <h4>Responsible adoption</h4>
            <p id="p-compromiso">By adopting, you commit to providing love, veterinary care, and a safe home for life.</p>
          </div>
        </div>
        <button>Learn more about responsible adoption →</button>
      </div>
    </div>

    <div>
      <div class="panel">
        <div class="side-title">
          <div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 16v-5M12 8h.01"/></svg></div>
          <h2 id="about-title">About the pet</h2>
        </div>
        <div class="table-row"><span class="lbl">Size</span><span class="val" id="s-tamano"></span></div>
        <div class="table-row"><span class="lbl">Energy level</span><span class="val" id="s-energia"></span></div>
        <div class="table-row"><span class="lbl">With other animals</span><span class="val" id="s-otros"></span></div>
        <div class="table-row"><span class="lbl">With children</span><span class="val" id="s-ninos"></span></div>
        <div class="table-row"><span class="lbl">With cats</span><span class="val" id="s-gatos"></span></div>
        <div class="table-row"><span class="lbl">Personality</span><span class="val" id="s-personalidad"></span></div>
      </div>

      <div class="panel history">
        <div class="side-title">
          <div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4z"/><path d="M8 8h8M8 12h8M8 16h5"/></svg></div>
          <h2>Story</h2>
        </div>
        <p id="p-historia"></p>
      </div>

      <div class="panel">
        <div class="side-title">
          <div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3-8.7A2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.6a2 2 0 01-.4 2.1L8.1 9.6a16 16 0 006 6l1.2-1.2a2 2 0 012.1-.4c.8.3 1.7.5 2.6.6a2 2 0 011.7 2z"/></svg></div>
          <h2>Contact information</h2>
        </div>
        <div class="contact-row"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3-8.7A2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.6a2 2 0 01-.4 2.1L8.1 9.6a16 16 0 006 6l1.2-1.2a2 2 0 012.1-.4c.8.3 1.7.5 2.6.6a2 2 0 011.7 2z"/></svg><span id="c-tel"></span></div>
        <div class="contact-row"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4z"/><path d="M22 6l-10 7L2 6"/></svg><span id="c-mail"></span></div>
        <div class="contact-row"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-6-7-11a7 7 0 0114 0c0 5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg><span id="c-dir"></span></div>
      </div>
    </div>
  </div>
</main>
</template>

<style>
.page-back-button {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 20;
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, .9);
  color: #1e3a8a;
  font-size: 22px;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(30, 58, 138, .12);
}

:root{
  --blue:#1d4fd7;
  --orange:#f2622e;
  --bg:#f4f6fb;
  --card:#ffffff;
  --ink:#0f1b3d;
  --muted:#5b6376;
  --line:#e6e9f2;
  --green:#1a8f4c;
  --amber:#c07a12;
}
*{box-sizing:border-box;}
body{margin:0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;background:var(--bg);color:var(--ink);}
a{text-decoration:none;color:inherit;}

main{max-width:1400px;margin:0 auto;padding:16px 48px 40px;}

.crumbs{display:flex;align-items:center;gap:20px;margin-bottom:12px;flex-wrap:wrap;}
.back{color:var(--blue);font-weight:700;display:flex;align-items:center;gap:6px;}
.path{color:var(--muted);font-size:14px;}
.path a{color:var(--muted);}
.path b{color:var(--ink);}

.grid{display:grid;grid-template-columns:1fr 360px;gap:16px;}
@media(max-width:1000px){.grid{grid-template-columns:1fr;}}

.panel{background:var(--card);border-radius:18px;padding:20px;box-shadow:0 10px 24px rgba(15,27,61,.05);margin-bottom:16px;}

.photo{
  background:#eef2fd;border-radius:14px;aspect-ratio:16/11;display:flex;align-items:center;justify-content:center;margin-bottom:16px;
}
.photo svg{width:30%;height:30%;}
.photo img{width:100%;height:100%;object-fit:cover;border-radius:12px;display:block}

h1.name{font-size:32px;margin:0 0 10px;}
.pills{display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;}
.pill{padding:6px 12px;border-radius:8px;font-weight:700;font-size:13px;background:#eaf0fe;color:var(--blue);display:flex;align-items:center;gap:6px;}
.desc{color:var(--muted);font-size:15px;line-height:1.5;margin-bottom:14px;}

.info-row{display:flex;align-items:flex-start;gap:10px;margin-bottom:10px;}
.info-row svg{width:20px;height:20px;color:var(--blue);flex-shrink:0;margin-top:2px;}
.info-row b{display:block;font-size:15px;}
.info-row span{color:var(--muted);font-size:13px;}

.actions{display:flex;gap:10px;margin-top:14px;}
.btn-primary{background:var(--blue);color:#fff;border:none;border-radius:10px;padding:10px 16px;font-weight:700;font-size:14px;display:flex;align-items:center;gap:8px;cursor:pointer;}
.btn-secondary{background:#fff;border:1px solid var(--line);border-radius:10px;padding:10px 16px;font-weight:700;font-size:14px;display:flex;align-items:center;gap:8px;cursor:pointer;color:var(--ink);}

.side-title{display:flex;align-items:center;gap:10px;margin-bottom:12px;}
.side-title .ic{width:34px;height:34px;border-radius:50%;background:var(--blue);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.side-title .ic svg{width:16px;height:16px;color:#fff;}
.side-title h2{font-size:18px;margin:0;}

.table-row{display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--line);font-size:14px;}
.table-row:last-child{border-bottom:none;}
.table-row .lbl{color:var(--muted);}
.table-row .val{font-weight:700;}
.val.green{color:var(--green);}
.val.amber{color:var(--amber);}

.history p{color:var(--muted);font-size:14px;line-height:1.6;margin:0;}

.contact-row{display:flex;align-items:center;gap:10px;margin-bottom:8px;font-size:14px;}
.contact-row svg{width:16px;height:16px;color:var(--blue);flex-shrink:0;}

.rec-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:10px;}
@media(max-width:1000px){.rec-grid{grid-template-columns:1fr;}}
.rec-card{border:1px solid var(--line);border-radius:14px;padding:14px;display:flex;gap:10px;align-items:flex-start;}
.rec-card .ic{width:36px;height:36px;border-radius:10px;background:#eaf0fe;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.rec-card .ic svg{width:18px;height:18px;color:var(--blue);}
.rec-card h4{margin:0 0 4px;font-size:15px;}
.rec-card p{margin:0;color:var(--muted);font-size:13px;}

.footer-banner{
  background:#eaf0fe;border-radius:16px;padding:16px 20px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;
}
.footer-banner .l{display:flex;gap:14px;align-items:flex-start;}
.footer-banner .ic{width:40px;height:40px;border-radius:50%;background:var(--blue);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.footer-banner .ic svg{width:18px;height:18px;color:#fff;}
.footer-banner h4{margin:0 0 4px;font-size:16px;}
.footer-banner p{margin:0;color:var(--muted);font-size:14px;max-width:520px;}
.footer-banner button{background:#fff;border:1px solid var(--line);border-radius:10px;padding:12px 20px;font-weight:700;display:flex;align-items:center;gap:8px;cursor:pointer;}

@media(max-width:1000px){
  main{padding:0 20px 40px;}
}
</style>