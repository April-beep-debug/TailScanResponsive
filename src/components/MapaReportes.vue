<template>
  <div id="app">
    <button class="page-back-button" @click="$router.back()" aria-label="Volver">←</button>
    <!-- Header -->
    <header class="header">
      <div class="logo">
        <img src="../assets/img/mascota.png" alt="Mascota" class="logo-img" />
        <span class="tail">Tail</span><span class="scan">Scan</span>
      </div>
      <nav>
        <a href="#" @click.prevent="irAInicio">Inicio</a>
        <a href="#" @click.prevent="irAGenerarQR">Registrar Mascota</a>
        <a href="#" class="active">Reporte en Mapa</a>
        <a href="#">Adopción y Perdidos</a>
        <a href="#">Cuidados</a>
        <a href="#">Servicios</a>
      </nav>
      <div class="header-right">
        <button
          class="user-avatar"
          title="Mis mascotas registradas"
          @click="irAMisMascotas"
        >
          <img v-if="usuario?.profile?.avatar_url" :src="usuario.profile.avatar_url" alt="Foto de perfil" />
          <span v-else class="user-avatar-fallback">{{ inicialAvatar(usuario) }}</span>
        </button>
      </div>
    </header>

    <!-- Intro -->
    <div class="intro">
      <div class="intro-text">
        <h1>Mapa de reportes</h1>
        <p>Registra dónde viste, perdiste o encontraste una mascota para ayudar a reunirla con su familia.</p>
      </div>
      <ul class="stat-strip">
        <li><span class="stat-dot dot-perdido"></span><b id="statPerdido">0</b> Perdidos</li>
        <li><span class="stat-dot dot-visto"></span><b id="statVisto">0</b> Vistos</li>
        <li><span class="stat-dot dot-encontrado"></span><b id="statEncontrado">0</b> Encontrados</li>
      </ul>
    </div>

    <!-- Barra de herramientas -->
    <div class="toolbar">
      <button id="btnReport" class="btn btn-primary">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14" /></svg>
        Nuevo reporte
      </button>

      <div class="segmented" role="tablist" aria-label="Filtrar por estado">
        <button class="segment active" data-filter="todos">Todos</button>
        <button class="segment" data-filter="perdido"><span class="seg-dot dot-perdido"></span>Perdidos</button>
        <button class="segment" data-filter="visto"><span class="seg-dot dot-visto"></span>Vistos</button>
        <button class="segment" data-filter="encontrado"><span class="seg-dot dot-encontrado"></span>Encontrados</button>
      </div>

      <button id="btnZoomAll" class="btn btn-secondary">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M3 16v3a2 2 0 0 0 2 2h3" /></svg>
        Ver todo
      </button>

      <span class="gps-indicator" id="gpsIndicator">
        <span class="gps-indicator-dot" id="gpsIndicatorDot"></span>
        <span id="gpsIndicatorText">Buscando ubicación...</span>
      </span>
    </div>

    <!-- Mapa -->
    <div class="map-shell" id="mapShell">
      <div id="map"></div>

      <!-- Aviso mientras se elige la ubicación en el mapa -->
      <div class="select-hint" id="selectHint" hidden>
        <span>Toca el mapa para elegir la ubicación</span>
        <button type="button" id="btnCancelSelect" class="select-hint-cancel">Cancelar</button>
      </div>

      <!-- Backdrop del panel -->
      <div class="drawer-backdrop" id="drawerBackdrop"></div>

      <!-- Panel lateral: formulario -->
      <aside id="formPanel" class="drawer">
        <div class="drawer-header">
          <div>
            <h3>Nuevo reporte</h3>
            <p>Completa los datos para publicarlo en el mapa</p>
          </div>
          <button id="btnCloseForm" class="icon-btn" aria-label="Cerrar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
        </div>

        <form id="petForm" class="drawer-form">
          <div class="form-group">
            <label for="petPhoto">Fotografía</label>
            <div class="photo-drop" id="photoDrop">
              <input type="file" id="petPhoto" accept="image/*" hidden>
              <canvas id="captureCanvas" hidden></canvas>

              <div class="photo-empty" id="photoEmpty">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" /><circle cx="12" cy="13" r="3.5" /></svg>
                <span>Agrega una foto de la mascota</span>
                <small>Ayuda a identificarla</small>
                <div class="photo-actions">
                  <button type="button" id="btnOpenCamera" class="photo-action-btn">Usar cámara web</button>
                  <button type="button" id="btnUploadPhoto" class="photo-action-btn">Subir foto</button>
                </div>
              </div>

              <div class="camera-view" id="cameraView" hidden>
                <video id="cameraVideo" autoplay playsinline muted></video>
                <div class="camera-controls">
                  <button type="button" id="btnCapturePhoto" class="btn btn-primary">Capturar</button>
                  <button type="button" id="btnCancelCamera" class="btn-text">Cancelar</button>
                </div>
              </div>

              <div class="photo-preview" id="photoPreviewWrap" hidden>
                <img id="photoPreview" alt="Vista previa de la mascota">
                <button type="button" id="btnRemovePhoto" class="photo-remove" aria-label="Quitar foto">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
                </button>
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="reportType">Tipo de reporte *</label>
              <select id="reportType" required>
                <option value="visto">Visto</option>
                <option value="perdido">Perdido</option>
                <option value="encontrado">Encontrado</option>
              </select>
            </div>

            <div class="form-group">
              <label for="animalType">Tipo de animal *</label>
              <select id="animalType" required>
                <option value="perro">Perro</option>
                <option value="gato">Gato</option>
                <option value="otro">Otro</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label for="petName">Nombre de la mascota</label>
            <input type="text" id="petName" placeholder="Ej: Firulais">
          </div>

          <div class="form-group">
            <label for="petColor">Color / Señas</label>
            <input type="text" id="petColor" placeholder="Ej: Marrón con blanco">
          </div>

          <div class="form-group">
            <label for="petDesc">Descripción detallada *</label>
            <textarea id="petDesc" rows="3" required
              placeholder="Describe: tamaño, color, señas particulares..."></textarea>
          </div>

          <div class="form-group">
            <label>Ubicación exacta *</label>
            <div class="location-selector">
              <span id="coordsDisplay" class="coords-display">Sin seleccionar</span>
              <div class="location-btns">
                <button type="button" id="btnSelectLocation" class="btn-outline">Elegir en el mapa</button>
                <button type="button" id="btnUseMyLocation" class="btn-outline">Usar mi ubicación</button>
              </div>
            </div>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn btn-primary btn-block">Guardar reporte</button>
            <button type="button" id="btnCancelForm" class="btn-text">Cancelar</button>
          </div>
        </form>
      </aside>

      <div class="toast" id="toast"></div>
    </div>

    <!-- Lista de reportes -->
    <div class="list-section">
      <div class="list-header">
        <h3>Reportes <span id="listFilterLabel">activos</span></h3>
        <span id="petCounter" class="badge">0</span>
      </div>
      <div id="petsList" class="reports-list">
        <div class="empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
          <p>No hay reportes todavía</p>
        </div>
      </div>
      <div class="list-footer">
        <button id="btnClear" class="btn-text btn-text-danger">Limpiar todo</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { insforge } from '../lib/insforgeClient';
import 'leaflet/dist/leaflet.css';

const router = useRouter();
const usuario = ref(null);

const irAInicio = () => router.push('/home');
const irAGenerarQR = () => router.push('/generador-qr');
const irAMisMascotas = () => router.push('/mis-mascotas');

const inicialAvatar = (usuario) => {
  const nombre = usuario?.profile?.name || usuario?.email || '';
  return nombre.charAt(0).toUpperCase() || '🐾';
};

let mapInstance = null;
let watchId = null;
let mediaStream = null;

onMounted(async () => {
  const { data } = await insforge.auth.getCurrentUser();
  usuario.value = data?.user || null;
});

onMounted(() => {
  import('leaflet').then(L => {
    // Emoji de especie: el ícono que se usaba antes en el mapa, más reconocible que un trazo genérico
    const EMOJIS = { perro: '🐕', gato: '🐈', otro: '🐾' };

    function iconSvg(path, strokeWidth = 1.8) {
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;
    }
    const ICON_PATHS = {
      locate: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>'
    };

    const CONFIG = {
      map: {
        center: [13.9943, -89.5533],
        zoom: 15,
        tileUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        tileAttribution: '© OpenStreetMap'
      },
      status: {
        visto: { label: 'Visto', color: '#c8850f' },
        perdido: { label: 'Perdido', color: '#c94a34' },
        encontrado: { label: 'Encontrado', color: '#1c8a5f' }
      }
    };

    const state = {
      pets: [],
      selectedLocation: null,
      selectedPhoto: null,
      isSelectingLocation: false,
      userLocation: null,
      map: null,
      markers: [],
      layers: {},
      filter: 'todos',
      locationMarker: null,
      locationAccuracyCircle: null,
      selectionMarker: null
    };

    const DOM = {
      map: document.getElementById('map'),
      mapShell: document.getElementById('mapShell'),
      formPanel: document.getElementById('formPanel'),
      drawerBackdrop: document.getElementById('drawerBackdrop'),
      petForm: document.getElementById('petForm'),
      petsList: document.getElementById('petsList'),
      petCounter: document.getElementById('petCounter'),
      listFilterLabel: document.getElementById('listFilterLabel'),
      coordsDisplay: document.getElementById('coordsDisplay'),
      reportType: document.getElementById('reportType'),
      animalType: document.getElementById('animalType'),
      petName: document.getElementById('petName'),
      petColor: document.getElementById('petColor'),
      petDesc: document.getElementById('petDesc'),
      petPhoto: document.getElementById('petPhoto'),
      photoDrop: document.getElementById('photoDrop'),
      photoEmpty: document.getElementById('photoEmpty'),
      photoPreviewWrap: document.getElementById('photoPreviewWrap'),
      photoPreview: document.getElementById('photoPreview'),
      btnRemovePhoto: document.getElementById('btnRemovePhoto'),
      btnOpenCamera: document.getElementById('btnOpenCamera'),
      btnUploadPhoto: document.getElementById('btnUploadPhoto'),
      cameraView: document.getElementById('cameraView'),
      cameraVideo: document.getElementById('cameraVideo'),
      captureCanvas: document.getElementById('captureCanvas'),
      btnCapturePhoto: document.getElementById('btnCapturePhoto'),
      btnCancelCamera: document.getElementById('btnCancelCamera'),
      selectHint: document.getElementById('selectHint'),
      btnCancelSelect: document.getElementById('btnCancelSelect'),
      btnReport: document.getElementById('btnReport'),
      btnZoomAll: document.getElementById('btnZoomAll'),
      btnClear: document.getElementById('btnClear'),
      btnCloseForm: document.getElementById('btnCloseForm'),
      btnCancelForm: document.getElementById('btnCancelForm'),
      btnSelectLocation: document.getElementById('btnSelectLocation'),
      btnUseMyLocation: document.getElementById('btnUseMyLocation'),
      segments: document.querySelectorAll('.segment'),
      gpsIndicator: document.getElementById('gpsIndicator'),
      gpsIndicatorText: document.getElementById('gpsIndicatorText'),
      statPerdido: document.getElementById('statPerdido'),
      statVisto: document.getElementById('statVisto'),
      statEncontrado: document.getElementById('statEncontrado'),
      toast: document.getElementById('toast')
    };

    // ---------- Mapa ----------
    function initMap() {
      state.map = L.map('map', { zoomControl: false }).setView(CONFIG.map.center, CONFIG.map.zoom);
      mapInstance = state.map;

      L.tileLayer(CONFIG.map.tileUrl, {
        attribution: CONFIG.map.tileAttribution,
        maxZoom: 19
      }).addTo(state.map);

      L.control.zoom({ position: 'bottomright' }).addTo(state.map);

      const LocateControl = L.Control.extend({
        options: { position: 'bottomright' },
        onAdd: function () {
          const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control locate-control');
          container.innerHTML = `<a href="#" role="button" aria-label="Centrar en mi ubicación" title="Mi ubicación">${iconSvg(ICON_PATHS.locate)}</a>`;
          L.DomEvent.disableClickPropagation(container);
          L.DomEvent.on(container, 'click', (e) => {
            L.DomEvent.preventDefault(e);
            flyToMyLocation();
          });
          return container;
        }
      });
      new LocateControl().addTo(state.map);

      Object.keys(CONFIG.status).forEach(key => {
        state.layers[key] = L.layerGroup().addTo(state.map);
      });

      state.map.on('click', function (e) {
        if (state.isSelectingLocation) {
          state.selectedLocation = e.latlng;
          updateLocationDisplay(e.latlng.lat, e.latlng.lng);
          showSelectionMarker(e.latlng.lat, e.latlng.lng);
          resumeFormAfterSelection();
        }
      });

      startWatchingLocation();
      setTimeout(() => state.map.invalidateSize(), 200);
    }

    // ---------- Geolocalización ----------
    function setGpsStatus(kind, text) {
      DOM.gpsIndicator.className = `gps-indicator gps-${kind}`;
      DOM.gpsIndicatorText.textContent = text;
    }

    function buildLocationIcon() {
      return L.divIcon({
        className: 'gps-dot-wrap',
        html: `<span class="gps-pulse"></span><span class="gps-core"></span>`,
        iconSize: [22, 22],
        iconAnchor: [11, 11]
      });
    }

    function updateUserLocationMarker(lat, lng, accuracy) {
      const latlng = [lat, lng];
      if (!state.locationMarker) {
        state.locationMarker = L.marker(latlng, {
          icon: buildLocationIcon(),
          zIndexOffset: 1000,
          interactive: false
        }).addTo(state.map);
      } else {
        state.locationMarker.setLatLng(latlng);
      }
      if (accuracy) {
        if (!state.locationAccuracyCircle) {
          state.locationAccuracyCircle = L.circle(latlng, {
            radius: accuracy,
            color: '#2f5fd1',
            weight: 1,
            fillColor: '#2f5fd1',
            fillOpacity: 0.07
          }).addTo(state.map);
        } else {
          state.locationAccuracyCircle.setLatLng(latlng).setRadius(accuracy);
        }
      }
    }

    function startWatchingLocation() {
      if (!navigator.geolocation) {
        setGpsStatus('unavailable', 'GPS no disponible en este dispositivo');
        return;
      }
      setGpsStatus('locating', 'Buscando ubicación...');
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          const first = !state.userLocation;
          state.userLocation = { lat: latitude, lng: longitude };
          updateUserLocationMarker(latitude, longitude, accuracy);
          setGpsStatus('active', 'Ubicación activa');
          if (first) state.map.setView([latitude, longitude], 16);
        },
        (err) => {
          setGpsStatus(
            'denied',
            err.code === 1 ? 'Permiso de ubicación desactivado' : 'No se pudo obtener tu ubicación'
          );
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 5000 }
      );
    }

    function flyToMyLocation() {
      if (state.userLocation) {
        state.map.flyTo([state.userLocation.lat, state.userLocation.lng], 17, { duration: 0.7 });
        pulseGpsDot();
      } else {
        showToast('Buscando tu señal GPS, un momento', 'warning');
        startWatchingLocation();
      }
    }

    function pulseGpsDot() {
      if (!state.locationMarker) return;
      const el = state.locationMarker.getElement();
      if (!el) return;
      el.classList.remove('gps-focus');
      void el.offsetWidth;
      el.classList.add('gps-focus');
    }

    // ---------- Marcadores de reportes ----------
    function buildPinIcon(pet) {
      const cfg = CONFIG.status[pet.status] || CONFIG.status.visto;
      const inner = pet.photo
        ? `<img src="${pet.photo}" alt="">`
        : `<span class="pin-emoji">${EMOJIS[pet.animalType] || EMOJIS.otro}</span>`;
      const html = `
        <div class="photo-pin" style="--ring:${cfg.color}">
          <span class="photo-pin-circle">${inner}</span>
          <span class="photo-pin-point"></span>
        </div>`;
      return L.divIcon({
        className: 'photo-pin-wrap',
        html,
        iconSize: [46, 54],
        iconAnchor: [23, 52],
        popupAnchor: [0, -48]
      });
    }

    function popupHtml(pet) {
      const cfg = CONFIG.status[pet.status];
      const photo = pet.photo ? `<img class="pin-popup-photo" src="${pet.photo}" alt="">` : '';
      return `
        <div class="pin-popup">
          ${photo}
          <span class="pin-popup-status" style="background:${cfg.color}1a; color:${cfg.color}">${cfg.label}</span>
          <b>${pet.name || 'Sin nombre'}</b>
          <p>${pet.description || ''}</p>
        </div>`;
    }

    function addMarker(pet) {
      const marker = L.marker([pet.lat, pet.lng], { icon: buildPinIcon(pet) })
        .bindPopup(popupHtml(pet));
      marker.petId = pet.id;
      marker.petStatus = pet.status;
      state.layers[pet.status].addLayer(marker);
      state.markers.push(marker);
    }

    // Pin del punto elegido para el reporte que se está creando: se deja
    // visible en el mapa (con el mismo estilo que un marcador guardado)
    // mientras se completa el formulario, hasta guardar o cancelar.
    function showSelectionMarker(lat, lng) {
      removeSelectionMarker();
      const draft = {
        status: DOM.reportType.value,
        animalType: DOM.animalType.value,
        photo: state.selectedPhoto
      };
      state.selectionMarker = L.marker([lat, lng], {
        icon: buildPinIcon(draft),
        zIndexOffset: 900
      }).addTo(state.map);
    }

    function removeSelectionMarker() {
      if (state.selectionMarker) {
        state.map.removeLayer(state.selectionMarker);
        state.selectionMarker = null;
      }
    }

    function removeMarker(id) {
      const idx = state.markers.findIndex(m => m.petId === id);
      if (idx !== -1) {
        const marker = state.markers[idx];
        state.layers[marker.petStatus].removeLayer(marker);
        state.markers.splice(idx, 1);
      }
    }

    function clearMarkers() {
      Object.values(state.layers).forEach(layer => layer.clearLayers());
      state.markers = [];
    }

    function focusPet(id) {
      const marker = state.markers.find(m => m.petId === id);
      if (!marker) return;
      const targetZoom = Math.max(state.map.getZoom(), 17);
      state.map.flyTo(marker.getLatLng(), targetZoom, { duration: 0.6 });
      marker.openPopup();
    }

    function zoomToAll() {
      if (state.pets.length === 0) {
        if (state.userLocation) {
          state.map.setView([state.userLocation.lat, state.userLocation.lng], 16);
        }
        return;
      }
      const bounds = L.latLngBounds(state.pets.map(p => [p.lat, p.lng]));
      state.map.fitBounds(bounds, { padding: [60, 60] });
    }

    // ---------- Filtros ----------
    function applyFilter(filter) {
      state.filter = filter;
      DOM.segments.forEach(seg => seg.classList.toggle('active', seg.dataset.filter === filter));

      Object.entries(state.layers).forEach(([key, layer]) => {
        const shouldShow = filter === 'todos' || filter === key;
        const isShown = state.map.hasLayer(layer);
        if (shouldShow && !isShown) state.map.addLayer(layer);
        if (!shouldShow && isShown) state.map.removeLayer(layer);
      });

      DOM.listFilterLabel.textContent = filter === 'todos' ? 'activos' : CONFIG.status[filter].label.toLowerCase() + 's';
      renderPets();
    }

    // ---------- Fotografía ----------
    function showPhotoPreview(dataUrl) {
      state.selectedPhoto = dataUrl;
      DOM.photoPreview.src = dataUrl;
      DOM.photoEmpty.hidden = true;
      DOM.cameraView.hidden = true;
      DOM.photoPreviewWrap.hidden = false;
    }

    function clearPhotoSelection() {
      state.selectedPhoto = null;
      DOM.petPhoto.value = '';
      DOM.photoPreview.src = '';
      DOM.photoEmpty.hidden = false;
      DOM.cameraView.hidden = true;
      DOM.photoPreviewWrap.hidden = true;
    }

    function handlePhotoChange(e) {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => showPhotoPreview(ev.target.result);
      reader.readAsDataURL(file);
    }

    function stopCamera() {
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
        mediaStream = null;
      }
      DOM.cameraVideo.srcObject = null;
    }

    async function openCamera() {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        showToast('Tu navegador no permite acceder a la cámara', 'warning');
        return;
      }
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
      } catch (err) {
        showToast('No se pudo abrir la cámara. Revisa los permisos del navegador.', 'warning');
        return;
      }
      DOM.cameraVideo.srcObject = mediaStream;
      DOM.photoEmpty.hidden = true;
      DOM.cameraView.hidden = false;
    }

    function closeCamera() {
      stopCamera();
      DOM.cameraView.hidden = true;
      DOM.photoEmpty.hidden = false;
    }

    function capturePhoto() {
      const video = DOM.cameraVideo;
      if (!video.videoWidth) return;
      const canvas = DOM.captureCanvas;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      stopCamera();
      showPhotoPreview(dataUrl);
    }

    // ---------- CRUD ----------
    function addPet(petData) {
      const pet = { id: Date.now() + Math.floor(Math.random() * 1000), ...petData, createdAt: new Date().toISOString() };
      state.pets.push(pet);
      addMarker(pet);
      renderPets();
      updateCounters();
      return pet;
    }

    function deletePet(id) {
      if (!confirm('¿Eliminar este reporte?')) return;
      state.pets = state.pets.filter(p => p.id !== id);
      removeMarker(id);
      renderPets();
      updateCounters();
    }

    function clearAllPets() {
      if (state.pets.length === 0) return;
      if (!confirm('¿Eliminar todos los reportes?')) return;
      state.pets = [];
      clearMarkers();
      renderPets();
      updateCounters();
    }

    // ---------- UI ----------
    function timeAgo(iso) {
      const diffMs = Date.now() - new Date(iso).getTime();
      const mins = Math.floor(diffMs / 60000);
      if (mins < 1) return 'justo ahora';
      if (mins < 60) return `hace ${mins} min`;
      const hours = Math.floor(mins / 60);
      if (hours < 24) return `hace ${hours} h`;
      return `hace ${Math.floor(hours / 24)} d`;
    }

    function renderPets() {
      const container = DOM.petsList;
      const visible = state.pets
        .filter(p => state.filter === 'todos' || p.status === state.filter)
        .sort((a, b) => b.id - a.id);

      if (visible.length === 0) {
        container.innerHTML = `<div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg><p>No hay reportes en esta categoría</p></div>`;
        return;
      }

      container.innerHTML = visible.map(pet => {
        const cfg = CONFIG.status[pet.status];
        const thumb = pet.photo
          ? `<img src="${pet.photo}" alt="${pet.name || 'Mascota'}">`
          : `<span>${EMOJIS[pet.animalType] || EMOJIS.otro}</span>`;
        return `
        <div class="report-row">
          <span class="report-thumb" style="--ring:${cfg.color}">${thumb}</span>
          <div class="report-main">
            <div class="report-top">
              <span class="report-name">${pet.name || 'Sin nombre'}</span>
              <span class="status-tag" style="color:${cfg.color}"><span class="status-dot" style="background:${cfg.color}"></span>${cfg.label}</span>
            </div>
            <p class="report-desc">${pet.description || ''}</p>
            <span class="report-time">${timeAgo(pet.createdAt)}</span>
          </div>
          <div class="report-actions">
            <button class="row-btn" data-focus="${pet.id}" aria-label="Ver en el mapa" title="Ver en el mapa">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>
            </button>
            <button class="row-btn row-btn-danger" data-id="${pet.id}" aria-label="Eliminar reporte" title="Eliminar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6"/></svg>
            </button>
          </div>
        </div>`;
      }).join('');

      container.querySelectorAll('[data-id]').forEach(btn => {
        btn.addEventListener('click', () => deletePet(parseInt(btn.dataset.id)));
      });
      container.querySelectorAll('[data-focus]').forEach(btn => {
        btn.addEventListener('click', () => focusPet(parseInt(btn.dataset.focus)));
      });
    }

    function updateCounters() {
      const counts = { perdido: 0, visto: 0, encontrado: 0 };
      state.pets.forEach(p => { if (counts[p.status] !== undefined) counts[p.status]++; });
      DOM.statPerdido.textContent = counts.perdido;
      DOM.statVisto.textContent = counts.visto;
      DOM.statEncontrado.textContent = counts.encontrado;
      DOM.petCounter.textContent = state.filter === 'todos'
        ? state.pets.length
        : state.pets.filter(p => p.status === state.filter).length;
    }

    function updateLocationDisplay(lat, lng) {
      DOM.coordsDisplay.textContent = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
      DOM.coordsDisplay.classList.add('selected');
    }

    function showForm() {
      DOM.formPanel.classList.add('open');
      DOM.drawerBackdrop.classList.add('show');
    }

    function hideDrawerOnly() {
      DOM.formPanel.classList.remove('open');
      DOM.drawerBackdrop.classList.remove('show');
    }

    function endLocationSelection() {
      state.isSelectingLocation = false;
      DOM.mapShell.classList.remove('selecting');
      DOM.selectHint.hidden = true;
    }

    function resumeFormAfterSelection() {
      endLocationSelection();
      showForm();
    }

    function hideForm() {
      hideDrawerOnly();
      DOM.petForm.reset();
      clearPhotoSelection();
      closeCamera();
      state.selectedLocation = null;
      removeSelectionMarker();
      endLocationSelection();
      DOM.coordsDisplay.textContent = 'Sin seleccionar';
      DOM.coordsDisplay.classList.remove('selected');
    }

    // El panel del formulario cubre buena parte (o, en móvil, todo) el
    // mapa, así que mientras se elige la ubicación lo ocultamos temporalmente
    // en vez de dejarlo abierto encima — de lo contrario los clics en el
    // mapa nunca llegan a Leaflet y el botón "Elegir en el mapa" no hace nada.
    function startLocationSelection() {
      state.isSelectingLocation = true;
      DOM.mapShell.classList.add('selecting');
      DOM.coordsDisplay.textContent = 'Haz clic en el mapa...';
      DOM.coordsDisplay.classList.remove('selected');
      DOM.selectHint.hidden = false;
      hideDrawerOnly();
    }

    function useMyLocation() {
      if (state.userLocation) {
        state.selectedLocation = state.userLocation;
        updateLocationDisplay(state.userLocation.lat, state.userLocation.lng);
        showSelectionMarker(state.userLocation.lat, state.userLocation.lng);
        resumeFormAfterSelection();
      } else {
        showToast('Todavía no tenemos tu ubicación GPS', 'warning');
      }
    }

    let toastTimer = null;
    function showToast(message, type = 'success') {
      DOM.toast.textContent = message;
      DOM.toast.className = `toast toast-${type} show`;
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => DOM.toast.classList.remove('show'), 3200);
    }

    function handleFormSubmit(e) {
      e.preventDefault();
      if (!state.selectedLocation) {
        showToast('Selecciona una ubicación en el mapa antes de guardar', 'warning');
        return;
      }
      const petData = {
        name: DOM.petName.value.trim() || 'Sin nombre',
        animalType: DOM.animalType.value,
        status: DOM.reportType.value,
        color: DOM.petColor.value.trim() || 'No especificado',
        description: DOM.petDesc.value.trim() || 'Sin descripción',
        photo: state.selectedPhoto,
        lat: state.selectedLocation.lat,
        lng: state.selectedLocation.lng
      };
      addPet(petData);
      hideForm();
      showToast('Reporte guardado. Ya aparece en el mapa.', 'success');
    }

    // ---------- Eventos ----------
    function initEvents() {
      DOM.btnReport.addEventListener('click', showForm);
      DOM.btnSelectLocation.addEventListener('click', startLocationSelection);
      DOM.btnUseMyLocation.addEventListener('click', useMyLocation);
      DOM.btnCloseForm.addEventListener('click', hideForm);
      DOM.btnCancelForm.addEventListener('click', hideForm);
      DOM.drawerBackdrop.addEventListener('click', hideForm);
      DOM.petForm.addEventListener('submit', handleFormSubmit);
      DOM.btnZoomAll.addEventListener('click', zoomToAll);
      DOM.btnClear.addEventListener('click', clearAllPets);
      DOM.btnOpenCamera.addEventListener('click', openCamera);
      DOM.btnUploadPhoto.addEventListener('click', () => DOM.petPhoto.click());
      DOM.petPhoto.addEventListener('change', handlePhotoChange);
      DOM.btnCapturePhoto.addEventListener('click', capturePhoto);
      DOM.btnCancelCamera.addEventListener('click', closeCamera);
      DOM.btnRemovePhoto.addEventListener('click', (e) => { e.stopPropagation(); clearPhotoSelection(); });
      DOM.btnCancelSelect.addEventListener('click', resumeFormAfterSelection);
      DOM.segments.forEach(seg => {
        seg.addEventListener('click', () => applyFilter(seg.dataset.filter));
      });
    }

    // Iniciar
    initMap();
    initEvents();
    renderPets();
    updateCounters();
  });
});

onBeforeUnmount(() => {
  if (watchId != null && navigator.geolocation) {
    navigator.geolocation.clearWatch(watchId);
  }
  if (mapInstance) {
    mapInstance.remove();
    mapInstance = null;
  }
  if (mediaStream) {
    mediaStream.getTracks().forEach(track => track.stop());
    mediaStream = null;
  }
});
</script>

<style scoped>
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

:root {
  --navy: #1e3a8a;
  --blue: #2f5fd1;
  --blue-light: #7ea6f0;
  --orange: #ff8a3d;
  --orange-deep: #f2632b;
  --cream: #fdfbf8;
  --ink: #28324a;
  --muted: #5a6b7a;
  --line: #dce6ef;
  --surface: #f7fafc;
  --lost: #e0523a;
  --seen: #d98c1f;
  --found: #1f9d6b;
  --radius-sm: 8px;
  --radius-md: 14px;
}
* { margin: 0; padding: 0; box-sizing: border-box; }
/* Varias reglas de abajo fijan su propio "display" (flex/grid) para cuando
   el elemento SÍ está visible; sin esto, ese display de autor gana sobre
   el "display:none" que el navegador aplica por el atributo [hidden],
   así que el elemento nunca llega a ocultarse aunque JS ponga hidden=true. */
[hidden] { display: none !important; }
#app {
  max-width: 1200px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 1px 2px rgba(15, 23, 42, .04), 0 12px 32px rgba(15, 23, 42, .06);
  padding: 28px;
  font-family: 'Segoe UI', sans-serif;
  color: var(--ink);
}

/* ---------- Header ---------- */
.header { display: flex; justify-content: space-between; align-items: center; padding: 4px 0 20px; margin-bottom: 22px; border-bottom: 1px solid var(--line); }
.logo { display: flex; align-items: center; gap: 10px; font-size: 24px; font-weight: 800; }
.logo .tail { color: var(--navy); }
.logo .scan { color: var(--orange-deep); }
.logo-img { width: 30px; height: 30px; object-fit: contain; }
nav { display: flex; gap: 22px; font-size: 13.5px; font-weight: 600; }
nav a { text-decoration: none; color: var(--ink); opacity: 0.65; cursor: pointer; }
nav a:hover { opacity: 1; }
nav a.active { opacity: 1; color: var(--orange-deep); border-bottom: 2px solid var(--orange-deep); padding-bottom: 4px; }

.header-right { display: flex; align-items: center; }
.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid var(--line);
  padding: 0;
  overflow: hidden;
  cursor: pointer;
  background: linear-gradient(135deg, var(--navy), var(--blue));
  box-shadow: 0 6px 16px rgba(30, 58, 138, .2);
  transition: transform .15s ease, box-shadow .15s ease;
  flex-shrink: 0;
}
.user-avatar:hover { transform: translateY(-2px) scale(1.04); box-shadow: 0 10px 22px rgba(30, 58, 138, .3); }
.user-avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }
.user-avatar-fallback { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 800; font-size: 14px; }

/* ---------- Intro ---------- */
.intro { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; flex-wrap: wrap; margin-bottom: 18px; }
.intro-text h1 { font-size: 1.55rem; font-weight: 700; color: var(--ink); margin-bottom: 4px; letter-spacing: -.01em; }
.intro-text p { color: var(--muted); max-width: 480px; font-size: 0.88rem; line-height: 1.5; }
.stat-strip { display: flex; gap: 20px; list-style: none; font-size: 13px; color: var(--muted); }
.stat-strip li { display: flex; align-items: center; gap: 6px; }
.stat-strip b { color: var(--ink); font-size: 14px; }
.stat-dot { width: 7px; height: 7px; border-radius: 50%; }

/* ---------- Barra de herramientas ---------- */
.toolbar { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 14px; padding: 10px; background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius-md); }
.btn { border: 1px solid transparent; border-radius: var(--radius-sm); padding: 9px 14px; font-weight: 600; font-size: 13.5px; cursor: pointer; display: inline-flex; align-items: center; gap: 7px; transition: background .15s ease, border-color .15s ease, transform .15s ease, box-shadow .15s ease; }
.btn svg { width: 16px; height: 16px; flex-shrink: 0; }
.btn-primary { background: linear-gradient(135deg, var(--navy), var(--blue)); color: #fff; box-shadow: 0 4px 10px rgba(30,58,138,.22); }
.btn-primary:hover { transform: translateY(-1px); box-shadow: 0 8px 18px rgba(30,58,138,.3); }
.btn-secondary { background: #fff; color: var(--ink); border-color: var(--line); }
.btn-secondary:hover { border-color: #c7cede; background: #fbfcfe; }
.btn-block { width: 100%; justify-content: center; }

.segmented { display: flex; background: #fff; border: 1px solid var(--line); border-radius: var(--radius-sm); padding: 3px; gap: 2px; }
.segment { border: none; background: transparent; padding: 7px 12px; font-size: 12.5px; font-weight: 600; color: var(--muted); border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; white-space: nowrap; }
.segment:hover { color: var(--ink); }
.segment.active { background: var(--surface); color: var(--ink); }
.seg-dot { width: 6px; height: 6px; border-radius: 50%; }

.gps-indicator { margin-left: auto; display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--muted); }
.gps-indicator-dot { width: 7px; height: 7px; border-radius: 50%; background: #cbd5e1; flex-shrink: 0; }
.gps-locating .gps-indicator-dot { background: var(--seen); animation: gpsBlink 1s infinite; }
.gps-active .gps-indicator-dot { background: var(--found); }
.gps-denied .gps-indicator-dot, .gps-unavailable .gps-indicator-dot { background: var(--lost); }
@keyframes gpsBlink { 50% { opacity: .25; } }

.dot-perdido { background: var(--lost); }
.dot-visto { background: var(--seen); }
.dot-encontrado { background: var(--found); }

/* ---------- Mapa ---------- */
.map-shell { position: relative; height: 500px; border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--line); margin-bottom: 22px; }
#map { height: 100%; width: 100%; background: #eef1f6; }
.map-shell.selecting #map { cursor: crosshair; }

.select-hint { position: absolute; top: 14px; left: 50%; transform: translateX(-50%); z-index: 650; display: flex; align-items: center; gap: 10px; background: var(--ink); color: #fff; padding: 8px 8px 8px 16px; border-radius: 50px; font-size: 12.5px; font-weight: 600; box-shadow: 0 10px 24px rgba(0,0,0,.25); white-space: nowrap; }
.select-hint-cancel { background: rgba(255,255,255,.15); border: none; color: #fff; font-size: 11.5px; font-weight: 700; padding: 6px 12px; border-radius: 50px; cursor: pointer; }
.select-hint-cancel:hover { background: rgba(255,255,255,.25); }

/* Control "mi ubicación", inyectado por Leaflet junto al zoom control */
.map-shell :deep(.locate-control a) { display: flex; align-items: center; justify-content: center; color: var(--navy); }
.map-shell :deep(.locate-control svg) { width: 16px; height: 16px; }

/* ---------- Marcador de reporte (con foto) ----------
   Leaflet inyecta este HTML fuera del árbol de Vue, así que las reglas
   deben pasar por :deep() ancladas en .map-shell para no ser descartadas. */
.map-shell :deep(.photo-pin-wrap) { background: transparent; border: none; }
.map-shell :deep(.photo-pin) { display: flex; flex-direction: column; align-items: center; animation: pinDrop .35s cubic-bezier(.2,.9,.3,1.2); }
.map-shell :deep(.photo-pin-circle) { width: 42px; height: 42px; border-radius: 50%; background: #fff; border: 3px solid var(--ring); box-shadow: 0 3px 8px rgba(15,23,42,.28); overflow: hidden; display: flex; align-items: center; justify-content: center; color: var(--ring); font-size: 20px; line-height: 1; }
.map-shell :deep(.photo-pin-circle img) { width: 100%; height: 100%; object-fit: cover; }
.map-shell :deep(.photo-pin-point) { width: 9px; height: 9px; background: var(--ring); transform: rotate(45deg); margin-top: -6px; border-radius: 2px; }
@keyframes pinDrop { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }

.map-shell :deep(.pin-popup) { text-align: center; min-width: 150px; }
.map-shell :deep(.pin-popup-photo) { width: 100%; height: 90px; object-fit: cover; border-radius: 8px; margin-bottom: 8px; }
.map-shell :deep(.pin-popup-status) { display: inline-block; font-size: 11px; font-weight: 700; padding: 2px 10px; border-radius: 5px; margin-bottom: 6px; }
.map-shell :deep(.pin-popup b) { display: block; font-size: 14px; margin-bottom: 2px; }
.map-shell :deep(.pin-popup p) { font-size: 12.5px; color: var(--muted); margin: 0; }

/* ---------- Punto GPS del usuario ---------- */
.map-shell :deep(.gps-dot-wrap) { background: transparent; border: none; }
.map-shell :deep(.gps-core) { position: absolute; inset: 0; margin: auto; width: 16px; height: 16px; border-radius: 50%; background: #2f5fd1; border: 3px solid #fff; box-shadow: 0 2px 8px rgba(0,0,0,.35); }
.map-shell :deep(.gps-pulse) { position: absolute; inset: 0; margin: auto; width: 16px; height: 16px; border-radius: 50%; background: rgba(47,95,209,.5); animation: gpsPulse 2.2s ease-out infinite; }
@keyframes gpsPulse { 0% { transform: scale(1); opacity: .8; } 100% { transform: scale(3.4); opacity: 0; } }
.map-shell :deep(.gps-focus .gps-core) { animation: gpsFocus .6s ease; }
@keyframes gpsFocus { 0%,100% { transform: scale(1); } 40% { transform: scale(1.8); } }

/* ---------- Panel lateral (drawer) ---------- */
.drawer-backdrop { position: absolute; inset: 0; background: rgba(15,23,42,.4); opacity: 0; pointer-events: none; transition: opacity .2s ease; z-index: 600; }
.drawer-backdrop.show { opacity: 1; pointer-events: auto; }

.drawer { position: absolute; top: 0; right: 0; height: 100%; width: 380px; max-width: 92%; background: #fff; z-index: 700; padding: 22px; overflow-y: auto; transform: translateX(100%); transition: transform .25s ease; box-shadow: -8px 0 24px rgba(15,23,42,.12); border-left: 1px solid var(--line); }
.drawer.open { transform: translateX(0); }

.drawer-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 18px; }
.drawer-header h3 { font-size: 1.05rem; font-weight: 700; color: var(--ink); margin-bottom: 3px; }
.drawer-header p { font-size: .8rem; color: var(--muted); }
.icon-btn { background: none; border: 1px solid transparent; cursor: pointer; color: var(--muted); display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 7px; }
.icon-btn svg { width: 15px; height: 15px; }
.icon-btn:hover { background: var(--surface); color: var(--ink); }
.icon-btn-danger:hover { background: #fbeae7; color: var(--lost); }

.drawer-form { display: flex; flex-direction: column; gap: 14px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.form-group { display: flex; flex-direction: column; gap: 5px; }
.form-group label { font-weight: 600; font-size: 12px; color: var(--ink); }
.form-group input, .form-group textarea, .form-group select { padding: 9px 12px; border: 1px solid var(--line); border-radius: var(--radius-sm); font-size: 13.5px; font-family: inherit; background: #fff; color: var(--ink); }
.form-group input:focus, .form-group textarea:focus, .form-group select:focus { outline: none; border-color: var(--navy); box-shadow: 0 0 0 3px rgba(30,58,138,.1); }

.photo-drop { border: 1px dashed var(--line); border-radius: var(--radius-md); background: var(--surface); overflow: hidden; }
.photo-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; padding: 20px 16px; color: var(--muted); text-align: center; }
.photo-empty svg { width: 26px; height: 26px; margin-bottom: 4px; color: #9aa5b6; }
.photo-empty span { font-size: 13px; font-weight: 600; color: var(--ink); }
.photo-empty small { font-size: 11.5px; }
.photo-actions { display: flex; gap: 8px; margin-top: 10px; }
.photo-action-btn { padding: 8px 14px; border: 1px solid var(--line); background: #fff; border-radius: var(--radius-sm); font-size: 12px; font-weight: 700; color: var(--navy); cursor: pointer; }
.photo-action-btn:hover { border-color: var(--navy); background: #f4f6fb; }

.camera-view { position: relative; background: #0c1220; }
.camera-view video { width: 100%; height: 200px; object-fit: cover; display: block; }
.camera-controls { position: absolute; left: 0; right: 0; bottom: 10px; display: flex; justify-content: center; gap: 10px; }
.camera-controls .btn { padding: 8px 16px; font-size: 12.5px; box-shadow: 0 6px 14px rgba(0,0,0,.35); }
.camera-controls .btn-text { color: #fff; background: rgba(255,255,255,.15); padding: 8px 14px; border-radius: var(--radius-sm); }
.camera-controls .btn-text:hover { background: rgba(255,255,255,.28); color: #fff; }

.photo-preview { position: relative; height: 160px; }
.photo-preview img { width: 100%; height: 100%; object-fit: cover; display: block; }
.photo-remove { position: absolute; top: 8px; right: 8px; width: 26px; height: 26px; border-radius: 50%; background: rgba(15,23,42,.65); color: #fff; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; }
.photo-remove svg { width: 13px; height: 13px; }
.photo-remove:hover { background: rgba(15,23,42,.85); }

.location-selector { display: flex; flex-direction: column; gap: 8px; }
.coords-display { padding: 8px 12px; background: var(--surface); border: 1px dashed var(--line); border-radius: var(--radius-sm); font-family: 'Consolas', monospace; font-size: 12px; color: var(--muted); text-align: center; }
.coords-display.selected { border: 1px solid var(--found); color: var(--ink); background: #eaf6f0; }
.location-btns { display: flex; gap: 8px; }
.btn-outline { flex: 1; padding: 8px 10px; border: 1px solid var(--line); background: #fff; border-radius: var(--radius-sm); font-size: 12px; font-weight: 600; color: var(--ink); cursor: pointer; }
.btn-outline:hover { border-color: var(--navy); background: #f4f6fb; }

.form-actions { display: flex; flex-direction: column; gap: 6px; margin-top: 4px; }
.btn-text { background: none; border: none; color: var(--muted); font-weight: 600; font-size: 12.5px; cursor: pointer; text-align: center; padding: 6px; }
.btn-text:hover { color: var(--ink); }
.btn-text-danger:hover { color: var(--lost); }

/* ---------- Toast ---------- */
.toast { position: absolute; left: 50%; bottom: 18px; transform: translate(-50%, 10px); background: var(--ink); color: #fff; padding: 10px 18px; border-radius: 8px; font-size: 13px; font-weight: 500; opacity: 0; pointer-events: none; transition: all .2s ease; z-index: 800; box-shadow: 0 10px 20px rgba(0,0,0,.2); }
.toast.show { opacity: 1; transform: translate(-50%, 0); }
.toast-warning { background: var(--seen); }
.toast-success { background: var(--found); }

/* ---------- Lista de reportes ---------- */
.list-section { padding-top: 2px; }
.list-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
.list-header h3 { font-size: .95rem; font-weight: 700; color: var(--ink); text-transform: capitalize; }
.badge { background: var(--surface); color: var(--ink); padding: 3px 10px; border-radius: 20px; font-size: 12px; font-weight: 700; border: 1px solid var(--line); }

.reports-list { display: flex; flex-direction: column; border: 1px solid var(--line); border-radius: var(--radius-md); overflow: hidden; }

/* Las filas se generan con innerHTML desde JS, fuera del árbol de Vue,
   así que también necesitan :deep() ancladas en .list-section. */
.list-section :deep(.report-row) { display: flex; align-items: flex-start; gap: 12px; padding: 12px 14px; border-bottom: 1px solid var(--line); background: #fff; transition: background .1s ease; }
.list-section :deep(.report-row:last-child) { border-bottom: none; }
.list-section :deep(.report-row:hover) { background: #fafbfd; }

.list-section :deep(.report-thumb) { width: 40px; height: 40px; border-radius: 50%; overflow: hidden; flex-shrink: 0; border: 2px solid var(--ring, var(--line)); background: var(--surface); display: flex; align-items: center; justify-content: center; color: var(--ring, var(--muted)); font-size: 18px; line-height: 1; }
.list-section :deep(.report-thumb img) { width: 100%; height: 100%; object-fit: cover; }

.list-section :deep(.report-main) { flex: 1; min-width: 0; }
.list-section :deep(.report-top) { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.list-section :deep(.report-name) { font-weight: 700; font-size: 14px; color: var(--ink); }
.list-section :deep(.status-tag) { display: inline-flex; align-items: center; gap: 5px; font-size: 11.5px; font-weight: 700; }
.list-section :deep(.status-dot) { width: 6px; height: 6px; border-radius: 50%; }
.list-section :deep(.report-desc) { color: var(--muted); font-size: 12.5px; line-height: 1.4; margin: 3px 0; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; }
.list-section :deep(.report-time) { font-size: 11px; color: #9aa5b6; }

.list-section :deep(.report-actions) { display: flex; gap: 4px; flex-shrink: 0; }
.list-section :deep(.row-btn) { background: none; border: 1px solid transparent; cursor: pointer; color: var(--muted); display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 7px; }
.list-section :deep(.row-btn svg) { width: 15px; height: 15px; }
.list-section :deep(.row-btn:hover) { background: var(--surface); color: var(--ink); }
.list-section :deep(.row-btn-danger:hover) { background: #fbeae7; color: var(--lost); }

.list-section :deep(.empty-state) { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 46px 20px; color: var(--muted); gap: 8px; }
.list-section :deep(.empty-state svg) { width: 30px; height: 30px; color: #cbd3e0; }

.list-footer { display: flex; justify-content: center; gap: 22px; margin-top: 14px; padding-top: 12px; }

@media (max-width: 768px) {
  #app { padding: 18px; border-radius: 14px; }
  .header { flex-direction: column; gap: 12px; align-items: flex-start; }
  nav { flex-wrap: wrap; gap: 14px; }
  .intro { flex-direction: column; align-items: flex-start; }
  .toolbar { flex-direction: column; align-items: stretch; }
  .segmented { overflow-x: auto; }
  .gps-indicator { margin-left: 0; }
  .map-shell { height: 420px; }
  .drawer { width: 100%; max-width: 100%; }
  .form-row { grid-template-columns: 1fr; }
  .report-desc { -webkit-line-clamp: 3; line-clamp: 3; }
}
</style>
