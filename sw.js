/* Este archivo debe estar colocado en la carpeta raíz del sitio.
 *
 * Cualquier cambio en el contenido de este archivo hace que el service
 * worker se reinstale. */

/**
 * Cambia el número de la versión cuando cambia el contenido de los
 * archivos.
 *
 * El número a la izquierda del punto (.), en este caso <q>1</q>, se
 * conoce como número mayor y se cambia cuando se realizan
 * modificaciones grandes o importantes.
 *
 * El número a la derecha del punto (.), en este caso <q>00</q>, se
 * conoce como número menor y se cambia cuando se realizan
 * modificaciones menores.
 */
const VERSION = "1.10";

/**
 * Nombre de la carpeta de caché.
 */
const CACHE = "pwamd";

/**
 * Archivos requeridos para que la aplicación funcione fuera de
 * línea.
 */
const ARCHIVOS = [
	"archivos.txt",
	".htaccess",
	"ayuda.html",
	"botones.html",
	"campos.html",
	"css/",
	"css/estilos.css",
	"css/tokens.css",
	"const/",
	"cierraElementoHtmo.js",
	"configura.js",
	"custom/",
	"custom-elements.js",
	"css/",
	"elevation.css",
	"ES_APPLE.js",
	"favicon.ico",
	"formulario.html",
	"fonts/",
	"getAttribute.js",
	"htmlentities.js",
	"iconos.html",
	"img/",
	"img/icono2048.png",
	"img/maskable_icon.png",
	"img/maskable_icon_x128.png",
	"img/maskable_icon_x192.png",
	"img/maskable_icon_x48.png",
	"img/maskable_icon_x72.png",
	"img/maskable_icon_x96.png",
	"img/screenshot_horizontal.png",
	"img/screenshot_vertical.png",
	"index.html",
	"instruccionesListadoSw.txt",
	"interruptor.html",
	"js/",
	"js/configura.js",
	"js/nav-bar.js",
	"js/nav-drw.js",
	"js/nav-tab-fixed.js",
	"js/nav-tab-scrollable.js",
	"lib/",
	"lib/css/",
	"lib/css/colors.module.css",
	"lib/css/elevation.css",
	"lib/css/material-symbols-outlined.css",
	"lib/css/md-cards.css",
	"lib/css/md-fab-primary.css",
	"lib/css/md-filled-button.css",
	"lib/css/md-filled-text-field.css",
	"lib/css/md-list.css",
	"lib/css/md-menu.css",
	"lib/css/md-navigation-bar.css",
	"lib/css/md-outline-button.css",
	"lib/css/md-ripple.css",
	"lib/css/md-segmented-button.css",
	"lib/css/md-slider-field.css",
	"lib/css/md-standard-icon-button.css",
	"lib/css/md-switch.css",
	"lib/css/md-tab.css",
	"lib/css/md-top-app-bar.css",
	"lib/css/motion.css",
	"lib/css/roboto.css",
	"lib/css/shape.css",
	"lib/css/state.css",
	"lib/css/theme.dark.css",
	"lib/css/theme.light.css",
	"lib/css/typography.css",
	"lib/fonts/",
	"lib/fonts/MaterialSymbolsOutlined[FILL,GRAD,opsz,wght].codepoints",
	"lib/fonts/MaterialSymbolsOutlined[FILL,GRAD,opsz,wght].ttf",
	"lib/fonts/MaterialSymbolsOutlined[FILL,GRAD,opsz,wght].woff2",
	"lib/fonts/roboto-v32-latin-regular.woff2",
	"lib/js/",
	"lib/js/abreElementoHtml.js",
	"lib/js/cierraElementoHtmo.js",
	"lib/js/getAttribute.js",
	"lib/js/htmlentities.js",
	"lib/js/muestraError.js",
	"lib/js/muestraTextoDeAyuda.js",
	"lib/js/ProblemDetails.js",
	"lib/js/querySelector.js",
	"lib/js/registraServiceWorkerSiEsSoportado.js",
	"lib/js/resaltaSiEstasEn.js",
	"lib/js/const/ES_APPLE.js",
	"lib/js/custom/md-menu-button.js",
	"lib/js/custom/md-options-menu.js",
	"lib/js/custom/md-overflow-button.js",
	"lib/js/custom/md-overflow-menu.js",
	"lib/js/custom/md-select-menu.js",
	"lib/js/custom/md-slider-field.js",
	"lib/js/custom/md-top-app-bar.js",
	"lib/js/custom/MdNavigationDrawer.js",
	"maskable_icon_x128.png",
	"maskable_icon_x192.png",
	"maskable_icon_x48.png",
	"maskable_icon_x72.png",
	"maskable_icon_x96.png",
	"motion.css",
	"nav-tab-fixed.js",
	"nav-tab-scrollable.js",
	"navbar.html",
	"one-line.html",
	"ProblemDetails.js",
	"README.md",
	"secundaria.html",
	"segmentado.html",
	"select.html",
	"site.webmanifest",
	"slider.html",
	"sw.js",
	"tarjetas.html",
	"three-line.html",
	"two-line.html",
	"ungap/",
	"ungap/custom-elements.js",
	"/",
];

// Verifica si el código corre dentro de un service worker.
if (self instanceof ServiceWorkerGlobalScope) {
	// Evento al empezar a instalar el servide worker,
	self.addEventListener("install", (/** @type {ExtendableEvent} */ evt) => {
		console.log("El service worker se está instalando.");
		evt.waitUntil(llenaElCache());
	});

	// Evento al solicitar información a la red.
	self.addEventListener("fetch", (/** @type {FetchEvent} */ evt) => {
		if (evt.request.method === "GET") {
			evt.respondWith(buscaLaRespuestaEnElCache(evt));
		}
	});

	// Evento cuando el service worker se vuelve activo.
	self.addEventListener("activate", () => console.log("El service worker está activo."));
}

async function llenaElCache() {
	console.log("Intentando cargar caché:", CACHE);
	// Borra todos los cachés.
	const keys = await caches.keys();
	for (const key of keys) {
		await caches.delete(key);
	}
	// Abre el caché de este service worker.
	const cache = await caches.open(CACHE);
	// Carga el listado de ARCHIVOS.
	await cache.addAll(ARCHIVOS);
	console.log("Cache cargado:", CACHE);
	console.log("Versión:", VERSION);
}

/** @param {FetchEvent} evt */
async function buscaLaRespuestaEnElCache(evt) {
	// Abre el caché.
	const cache = await caches.open(CACHE);
	const request = evt.request;
	/* Busca la respuesta a la solicitud en el contenido del caché, sin
	 * tomar en cuenta la parte después del símbolo "?" en la URL. */
	const response = await cache.match(request, { ignoreSearch: true });
	if (response === undefined) {
		/* Si no la encuentra, empieza a descargar de la red y devuelve
		 * la promesa. */
		return fetch(request);
	} else {
		// Si la encuentra, devuelve la respuesta encontrada en el caché.
		return response;
	}
}
