# Assets — Patitas Dulces

Coloca aquí los archivos visuales del sitio.

## Logo

Cuando tengas el logo, colócalo aquí como `logo.png` (o `logo.svg`) y luego
reemplaza en `index.html` y `pedidos.html` el bloque:

```html
<span class="logo-icon" aria-hidden="true">🐾</span>
Patitas Dulces
```

por:

```html
<img src="assets/logo.png" alt="Patitas Dulces" class="logo-img" />
```

## Imágenes de producto (opcional)

Si quieres reemplazar los emojis 🎂 🧁 🍪 por fotos reales, agrégalas aquí
(ej. `pastel-cumple.jpg`) y modifica `js/pedidos.js` y las secciones
`product-image` en `index.html` para usar `<img>` en lugar del emoji.

## Tamaños recomendados

- Logo: PNG transparente, 200×200 px mínimo.
- Fotos de productos: JPG, 800×600 px, comprimidas (<150 KB cada una).
