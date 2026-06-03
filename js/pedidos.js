/* ============================================
   Patitas a la masa — Lógica de pedidos
   ============================================ */

// Precios en pesos argentinos (ARS) — ajustar según corresponda
const PRODUCTS = [
  { id: 'mini-cake-rosa',     nombre: 'Mini-Cake Rosa Cumpleañero',  precio: null, imgs: ['assets/Imagenes/pastel-rosa.jpeg'], animales: ['Perro', 'Gato'], desc: 'Torta natural para mascotas elaborada con proteína a elección (pollo, carne o cerdo), zanahoria, harina de avena, huevo y agua. Decorada con frosting de vegetales y colores obtenidos naturalmente de ingredientes como remolacha y espinaca, sin colorantes artificiales. Ideal para cumpleaños y celebraciones especiales.' },
  { id: 'mini-cake-amarillo', nombre: 'Mini-Cake Dorado de Calabaza', precio: null, imgs: ['assets/Imagenes/pastel-amarillo.jpeg'], animales: ['Perro', 'Gato'], desc: 'Torta natural para mascotas elaborada con proteína a elección (pollo, carne o cerdo), zanahoria, harina de avena, huevo y agua. Decorada con frosting de vegetales y colores obtenidos naturalmente de ingredientes como remolacha y espinaca, sin colorantes artificiales. Ideal para cumpleaños y celebraciones especiales.' },
  { id: 'mini-cake-clasico',  nombre: 'Mini-Cake Clásico Huellitas',  precio: null, imgs: ['assets/Imagenes/pastel-rosa-2.jpeg'], animales: ['Perro', 'Gato'], desc: 'Torta natural para mascotas elaborada con proteína a elección (pollo, carne o cerdo), zanahoria, harina de avena, huevo y agua. Decorada con frosting de vegetales y colores obtenidos naturalmente de ingredientes como remolacha y espinaca, sin colorantes artificiales. Ideal para cumpleaños y celebraciones especiales.' },
  { id: 'mini-cake-cerdo',    nombre: 'Mini-Cake con Cerdo',         precio: null, imgs: ['assets/Imagenes/pastel-rosa.jpeg'], animales: ['Perro'], desc: 'Torta natural para mascotas elaborada con proteína cerdo, zanahoria, harina de avena, huevo y agua. Decorada con frosting de vegetales y colores obtenidos naturalmente de ingredientes como remolacha y espinaca, sin colorantes artificiales. Ideal para cumpleaños y celebraciones especiales.' },
  { id: 'mini-cake-pollo',    nombre: 'Mini-Cake con Pollo',         precio: null, imgs: ['assets/Imagenes/pastel-amarillo.jpeg'], animales: ['Perro', 'Gato'], desc: 'Torta natural para mascotas elaborada con proteína pollo, zanahoria, harina de avena, huevo y agua. Decorada con frosting de vegetales y colores obtenidos naturalmente de ingredientes como remolacha y espinaca, sin colorantes artificiales. Ideal para cumpleaños y celebraciones especiales.' },
  { id: 'mini-cake-carne',    nombre: 'Mini-Cake con Carne',         precio: null, imgs: ['assets/Imagenes/pastel-rosa-2.jpeg'], animales: ['Perro'], desc: 'Torta natural para mascotas elaborada con proteína carne roja, zanahoria, harina de avena, huevo y agua. Decorada con frosting de vegetales y colores obtenidos naturalmente de ingredientes como remolacha y espinaca, sin colorantes artificiales. Ideal para cumpleaños y celebraciones especiales.' },
  { id: 'mini-pastel',        nombre: 'Mini Pastel Individual',       precio: null, emoji: '🍰', desc: 'Tamaño perfecto para mascotas pequeñas o festejos íntimos. Torta natural sin azúcar ni aditivos, elaborada con ingredientes seguros para tu mascota.' },
  { id: 'galletas',           nombre: 'Galletas Huellitas (x10)',     precio: null, emoji: '🍪', desc: 'Galletas en forma de huellitas, con avena y manzana. Snacks nutritivos y deliciosos para tu peludo.' },
];

const cart = {};

function getProduct(id) {
  return PRODUCTS.find((p) => p.id === id);
}

function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  renderCart();
}

function removeFromCart(id) {
  if (!cart[id]) return;
  cart[id] -= 1;
  if (cart[id] <= 0) delete cart[id];
  renderCart();
}

function cartTotal() {
  return Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = getProduct(id);
    return sum + (p && p.precio ? p.precio * qty : 0);
  }, 0);
}

function formatARS(n) {
  if (n === null || n === undefined) return 'Consultar';
  return '$' + n.toLocaleString('es-AR');
}

function renderCatalog() {
  const grid = document.getElementById('catalogo-grid');
  if (!grid) return;
  const colors = ['rosa', 'vainilla', 'menta', 'crema'];
  grid.innerHTML = PRODUCTS.map((p, i) => {
    const mainImg = p.imgs ? p.imgs[0] : p.img;
    const media = mainImg
      ? `<img src="${mainImg}" alt="${p.nombre}" />`
      : `<span aria-hidden="true">${p.emoji || '🎂'}</span>`;
    return `
      <article class="cat-card" id="producto-${p.id}">
        <div class="cat-image ${colors[i % colors.length]}">${media}</div>
        <div class="cat-body">
          <h3>${p.nombre}</h3>
          <p class="desc">${p.desc}</p>
          <div class="cat-footer">
            <span class="precio">${formatARS(p.precio)}</span>
            <button class="btn-add" data-add="${p.id}" aria-label="Agregar ${p.nombre}">+ Agregar</button>
          </div>
        </div>
      </article>
    `;
  }).join('');

  grid.querySelectorAll('[data-add]').forEach((btn) => {
    btn.addEventListener('click', () => addToCart(btn.getAttribute('data-add')));
  });
}

function renderCart() {
  const list = document.getElementById('cart-list');
  const totalEl = document.getElementById('cart-total');
  const submitBtn = document.getElementById('btn-submit');
  if (!list || !totalEl) return;

  const ids = Object.keys(cart);
  if (ids.length === 0) {
    list.innerHTML = '<li class="cart-empty">Tu pedido está vacío. Agrega productos del catálogo.</li>';
  } else {
    list.innerHTML = ids.map((id) => {
      const p = getProduct(id);
      const qty = cart[id];
      const icon = p.emoji || '🎂';
      return `
        <li class="cart-item">
          <div class="cart-item-info">
            <span class="cart-item-name">${icon} ${p.nombre}</span>
            <span class="cart-item-price">${formatARS(p.precio)} c/u</span>
          </div>
          <div class="cart-qty">
            <button class="qty-btn" data-dec="${id}" aria-label="Quitar uno">−</button>
            <span class="qty-num">${qty}</span>
            <button class="qty-btn" data-inc="${id}" aria-label="Agregar uno">+</button>
          </div>
        </li>
      `;
    }).join('');

    list.querySelectorAll('[data-inc]').forEach((b) => {
      b.addEventListener('click', () => addToCart(b.getAttribute('data-inc')));
    });
    list.querySelectorAll('[data-dec]').forEach((b) => {
      b.addEventListener('click', () => removeFromCart(b.getAttribute('data-dec')));
    });
  }

  totalEl.textContent = formatARS(cartTotal());
  if (submitBtn) submitBtn.disabled = ids.length === 0;
}

function buildOrderMessage(formData) {
  const lineas = [];
  lineas.push('¡Hola Patitas a la masa! 🐾 Quiero hacer un pedido:');
  lineas.push('');

  Object.entries(cart).forEach(([id, qty]) => {
    const p = getProduct(id);
    if (p) lineas.push(`• ${p.nombre} x${qty} — ${formatARS(p.precio * qty)}`);
  });

  lineas.push('');
  lineas.push(`Total estimado: ${formatARS(cartTotal())}`);
  lineas.push('');
  lineas.push(`Contacto: ${formData.nombre}`);
  lineas.push(`Peludo: ${formData.peludo} (${formData.especie})`);
  lineas.push(`Fecha del evento: ${formData.fecha}`);

  if (formData.mensaje && formData.mensaje.trim()) {
    lineas.push(`Mensaje en el pastel: "${formData.mensaje.trim()}"`);
  }
  if (formData.notas && formData.notas.trim()) {
    lineas.push(`Notas / alergias: ${formData.notas.trim()}`);
  }

  lineas.push('');
  lineas.push('¡Gracias! 🎂');

  return lineas.join('\n');
}

function wireForm() {
  const form = document.getElementById('pedido-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (Object.keys(cart).length === 0) {
      alert('Agrega al menos un producto al pedido.');
      return;
    }

    const formData = {
      nombre: form.nombre.value.trim(),
      peludo: form.peludo.value.trim(),
      especie: form.especie.value,
      fecha: form.fecha.value,
      mensaje: form.mensaje.value,
      notas: form.notas.value,
    };

    if (!formData.nombre || !formData.peludo || !formData.fecha) {
      alert('Por favor completa nombre, nombre del peludo y fecha del evento.');
      return;
    }

    const message = buildOrderMessage(formData);
    const link = window.PatitasDulces.buildWhatsAppLink(message);
    window.open(link, '_blank', 'noopener');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderCatalog();
  renderCart();
  wireForm();

  // Si llegan con hash #producto-XXX, hacer scroll
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
  }
});
