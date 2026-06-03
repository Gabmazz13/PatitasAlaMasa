/* ============================================
   Patitas a la masa — Helpers compartidos
   ============================================
   REEMPLAZAR: cambia WHATSAPP_NUMBER por el número real.
   Formato Argentina internacional sin '+' ni espacios:
   54 + 9 + código de área + número (ej: 5491112345678 para CABA)
*/

const WHATSAPP_NUMBER = '5491178219196';

function buildWhatsAppLink(message) {
  const text = encodeURIComponent(message || '');
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

// Asigna href a todos los enlaces con data-whatsapp-message
function wireWhatsAppLinks() {
  document.querySelectorAll('[data-whatsapp-message]').forEach((el) => {
    const msg = el.getAttribute('data-whatsapp-message');
    el.setAttribute('href', buildWhatsAppLink(msg));
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
  });
}

// Toggle del menú móvil
function wireMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  // Cerrar al hacer click en un enlace
  links.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  wireWhatsAppLinks();
  wireMobileMenu();
});

// Exporta para que pedidos.js pueda reusar el helper
window.PatitasDulces = { buildWhatsAppLink, WHATSAPP_NUMBER };
