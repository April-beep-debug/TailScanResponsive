<script setup>
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import tobyImg from '../assets/img/toby.png'
import lunaImg from '../assets/img/luna.png'
import brunoImg from '../assets/img/bruno.png'
import michiImg from '../assets/img/michi.png'
import simbaImg from '../assets/img/simba.png'
import nalaImg from '../assets/img/nala.png'

// ---- ICONOS SVG reutilizables ----
const perroIcon = `<path d="M12 21c-3 0-6-2-6-5 0-2 2-3 6-3s6 1 6 3c0 3-3 5-6 5z"/><circle cx="7" cy="8" r="2"/><circle cx="17" cy="8" r="2"/><circle cx="9" cy="4.5" r="1.6"/><circle cx="15" cy="4.5" r="1.6"/>`;
const gatoIcon  = `<path d="M6 4l2 5h8l2-5-4 3H10L6 4z"/><path d="M8 9c-2 1-3 4-3 6 0 3 3 5 7 5s7-2 7-5c0-2-1-5-3-6"/>`;

// ---- BASE DE DATOS DE MASCOTAS (conecta con index.html vía ?id=) ----
const mascotas = {
  toby: {
    nombre:"Toby", especie:"perro", sexo:"Macho", edad:"2 años", tamanoPill:"Mediano",
    photo: 'toby.png',
    desc:"Toby es un perro cariñoso, leal y lleno de energía. Le encanta jugar, salir a caminar y recibir mimos. Ideal para una familia activa que pueda darle amor y atención.",
    refugio:"Refugio Centro", ciudad:"Ciudad de México",
    rescate:"Rescatado hace 6 meses", vacunado:"Sí", esterilizado:"Sí",
    tamano:"Mediano (15 - 25 kg)", energia:"Alto", otrosLabel:"Con otros perros", otros:"Muy bien",
    ninos:"Bien", gatos:"No se ha probado", gatosColor:"amber",
    personalidad:"Juguetón, leal, cariñoso",
    historia:"Toby fue rescatado de la calle. A pesar de su pasado, es un perro muy noble y agradecido. Está listo para encontrar su hogar definitivo.",
    tel:"55 1234 5678", mail:"adopciones@refugiocentro.org", dir:"Av. de los Insurgentes 123, CDMX",
    recomendaciones:[
      {t:"Hogar con jardín", d:"Ideal para que pueda correr y jugar libremente."},
      {t:"Ejercicio diario", d:"Necesita actividad física regular para ser feliz."},
      {t:"Juguetes interactivos", d:"Le encantan los retos y los juegos mentales."}
    ]
  },
  luna: {
    nombre:"Luna", especie:"perro", sexo:"Hembra", edad:"1 año", tamanoPill:"Mediano",
    desc:"Luna es dulce, curiosa y muy sociable. Disfruta conocer gente nueva y aprender trucos. Se adapta bien a hogares con niños y otras mascotas.",
    refugio:"Refugio Norte", ciudad:"Ciudad de México",
    rescate:"Rescatada hace 4 meses", vacunado:"Sí", esterilizado:"Sí",
    tamano:"Mediano (12 - 20 kg)", energia:"Medio-Alto", otrosLabel:"Con otros perros", otros:"Muy bien",
    ninos:"Muy bien", gatos:"Bien", gatosColor:"green",
    personalidad:"Sociable, curiosa, obediente",
    historia:"Luna llegó al refugio como cachorra tras ser abandonada. Ha crecido rodeada de cuidados y está lista para un hogar que la quiera de verdad.",
    tel:"55 2345 6789", mail:"adopciones@refugionorte.org", dir:"Calle Reforma 45, CDMX",
    photo: 'luna.png',
    recomendaciones:[
      {t:"Familia activa", d:"Le encanta pasear y jugar al aire libre."},
      {t:"Entrenamiento positivo", d:"Aprende rápido con refuerzo positivo."},
      {t:"Compañía frecuente", d:"Disfruta mucho estar acompañada."}
    ]
  },
  bruno: {
    nombre:"Bruno", especie:"perro", sexo:"Macho", edad:"1 año", tamanoPill:"Pequeño",
    desc:"Bruno es un perro pequeño pero con mucha personalidad. Es valiente, alerta y muy apegado a su familia una vez que gana confianza.",
    refugio:"Refugio Sur", ciudad:"Ciudad de México",
    rescate:"Rescatado hace 3 meses", vacunado:"Sí", esterilizado:"No",
    tamano:"Pequeño (5 - 10 kg)", energia:"Medio", otrosLabel:"Con otros perros", otros:"Bien",
    ninos:"Bien, con supervisión", gatos:"No se ha probado", gatosColor:"amber",
    personalidad:"Valiente, alerta, apegado",
    historia:"Bruno fue encontrado deambulando solo en la calle. Le tomó tiempo confiar en las personas, pero hoy es un compañero fiel y cariñoso.",
    tel:"55 3456 7890", mail:"adopciones@refugiosur.org", dir:"Av. Universidad 210, CDMX",
    photo: 'bruno.png',
    recomendaciones:[
      {t:"Hogar tranquilo", d:"Se adapta mejor a ambientes calmados."},
      {t:"Paciencia inicial", d:"Necesita tiempo para generar confianza."},
      {t:"Paseos cortos", d:"Disfruta caminatas breves y frecuentes."}
    ]
  },
  michi: {
    nombre:"Michi", especie:"gato", sexo:"Hembra", edad:"8 meses", tamanoPill:"Juguetona",
    desc:"Michi es una gatita llena de energía y curiosidad. Le fascina explorar, saltar y jugar con estambres. Perfecta para quien busca compañía activa.",
    refugio:"Refugio Centro", ciudad:"Ciudad de México",
    rescate:"Rescatada hace 2 meses", vacunado:"Sí", esterilizado:"No",
    tamano:"Pequeña (2 - 4 kg)", energia:"Alto", otrosLabel:"Con otros gatos", otros:"Bien",
    ninos:"Bien", gatos:"Muy bien", gatosColor:"green",
    personalidad:"Juguetona, curiosa, activa",
    historia:"Michi llegó al refugio siendo muy pequeña. Ha crecido feliz y saludable, y ahora busca una familia que siga alimentando su curiosidad.",
    tel:"55 1234 5678", mail:"adopciones@refugiocentro.org", dir:"Av. de los Insurgentes 123, CDMX",
    photo: 'michi.png',
    recomendaciones:[
      {t:"Espacios para trepar", d:"Le encantan los rascadores y torres altas."},
      {t:"Juguetes interactivos", d:"Necesita estimulación mental diaria."},
      {t:"Ventanas seguras", d:"Disfruta observar el exterior con mallas de protección."}
    ]
  },
  simba: {
    nombre:"Simba", especie:"gato", sexo:"Macho", edad:"1 año", tamanoPill:"Tranquilo",
    desc:"Simba es un gato sereno y observador. Prefiere ambientes tranquilos y disfruta largas siestas al sol. Es ideal para hogares de ritmo calmado.",
    refugio:"Refugio Norte", ciudad:"Ciudad de México",
    rescate:"Rescatado hace 5 meses", vacunado:"Sí", esterilizado:"Sí",
    tamano:"Mediano (4 - 5 kg)", energia:"Bajo", otrosLabel:"Con otros gatos", otros:"Bien",
    ninos:"Bien, con espacio propio", gatos:"Muy bien", gatosColor:"green",
    personalidad:"Tranquilo, observador, independiente",
    historia:"Simba fue entregado al refugio por una familia que ya no podía cuidarlo. Se adaptó rápido y hoy es uno de los gatos más queridos del lugar.",
    tel:"55 2345 6789", mail:"adopciones@refugionorte.org", dir:"Calle Reforma 45, CDMX",
    photo: 'simba.png',
    recomendaciones:[
      {t:"Rincones tranquilos", d:"Necesita un lugar propio para descansar."},
      {t:"Rutina estable", d:"Se siente más seguro con horarios fijos."},
      {t:"Poco ruido", d:"Prefiere ambientes silenciosos."}
    ]
  },
  nala: {
    nombre:"Nala", especie:"gato", sexo:"Hembra", edad:"2 años", tamanoPill:"Cariñosa",
    desc:"Nala es una gata muy cariñosa que busca contacto y mimos constantes. Le encanta acurrucarse y seguir a su humano por toda la casa.",
    refugio:"Refugio Sur", ciudad:"Ciudad de México",
    rescate:"Rescatada hace 7 meses", vacunado:"Sí", esterilizado:"Sí",
    tamano:"Mediana (3.5 - 5 kg)", energia:"Medio", otrosLabel:"Con otros gatos", otros:"Bien",
    ninos:"Muy bien", gatos:"Bien", gatosColor:"green",
    personalidad:"Cariñosa, sociable, tranquila",
    historia:"Nala pasó gran parte de su vida en la calle antes de llegar al refugio. Hoy busca desesperadamente un hogar donde recibir todo el cariño que da.",
    tel:"55 3456 7890", mail:"adopciones@refugiosur.org", dir:"Av. Universidad 210, CDMX",
    photo: 'nala.png',
    recomendaciones:[
      {t:"Compañía constante", d:"No le gusta pasar mucho tiempo sola."},
      {t:"Camas suaves", d:"Le encanta acurrucarse en mantas cálidas."},
      {t:"Caricias diarias", d:"Prospera con atención y afecto frecuente."}
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
    <div class="pill">${m.sexo === 'Macho' ? '♂' : '♀'} ${m.sexo}</div>
    <div class="pill">${m.edad}</div>
    <div class="pill">${m.tamanoPill}</div>`);
  setText('p-desc', m.desc);
  setText('p-refugio', m.refugio);
  setText('p-ciudad', m.ciudad);
  setText('p-rescate', m.rescate);
  setText('p-vacunado', m.vacunado);
  setText('p-esterilizado', m.esterilizado);
  setText('rec-title', `Recomendaciones para ${m.nombre}`);
  setText('p-compromiso', `Al adoptar a ${m.nombre}, te comprometes a brindarle amor, cuidados veterinarios y un hogar seguro para toda su vida.`);

  setText('about-title', `Sobre ${m.nombre}`);
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
  <div class="grid">
    <div>
      <div class="panel">
        <div class="photo">
          <svg id="photo-icon" viewBox="0 0 24 24" fill="none" stroke="#1d4fd7" stroke-width="1.2"></svg>
          <img id="p-photo" alt="Foto mascota" style="display:none" />
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
          <div><b>Vacunado</b><span id="p-vacunado"></span></div>
        </div>
        <div class="info-row">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="8" r="3"/><circle cx="16" cy="16" r="3"/></svg>
          <div><b>Esterilizado</b><span id="p-esterilizado"></span></div>
        </div>

        <div class="actions">
          <button class="btn-primary">♡ Quiero adoptarlo</button>
          <button class="btn-secondary">⇪ Compartir</button>
        </div>
      </div>

      <div class="panel">
        <div class="side-title">
          <div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 15c-3 0-5 2-5 4h10c0-2-2-4-5-4z"/><circle cx="12" cy="10" r="2.2"/><circle cx="7" cy="7" r="1.6"/><circle cx="17" cy="7" r="1.6"/></svg></div>
          <h2 id="rec-title">Recomendaciones</h2>
        </div>
        <div class="rec-grid" id="rec-grid"></div>
      </div>

      <div class="footer-banner">
        <div class="l">
          <div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg></div>
          <div>
            <h4>Adopción responsable</h4>
            <p id="p-compromiso">Al adoptar, te comprometes a brindarle amor, cuidados veterinarios y un hogar seguro para toda su vida.</p>
          </div>
        </div>
        <button>Conoce más sobre adopción responsable →</button>
      </div>
    </div>

    <div>
      <div class="panel">
        <div class="side-title">
          <div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 16v-5M12 8h.01"/></svg></div>
          <h2 id="about-title">Sobre la mascota</h2>
        </div>
        <div class="table-row"><span class="lbl">Tamaño</span><span class="val" id="s-tamano"></span></div>
        <div class="table-row"><span class="lbl">Nivel de energía</span><span class="val" id="s-energia"></span></div>
        <div class="table-row"><span class="lbl">Con otros animales</span><span class="val" id="s-otros"></span></div>
        <div class="table-row"><span class="lbl">Con niños</span><span class="val" id="s-ninos"></span></div>
        <div class="table-row"><span class="lbl">Con gatos</span><span class="val" id="s-gatos"></span></div>
        <div class="table-row"><span class="lbl">Personalidad</span><span class="val" id="s-personalidad"></span></div>
      </div>

      <div class="panel history">
        <div class="side-title">
          <div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4z"/><path d="M8 8h8M8 12h8M8 16h5"/></svg></div>
          <h2>Historia</h2>
        </div>
        <p id="p-historia"></p>
      </div>

      <div class="panel">
        <div class="side-title">
          <div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3-8.7A2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.6a2 2 0 01-.4 2.1L8.1 9.6a16 16 0 006 6l1.2-1.2a2 2 0 012.1-.4c.8.3 1.7.5 2.6.6a2 2 0 011.7 2z"/></svg></div>
          <h2>Información de contacto</h2>
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