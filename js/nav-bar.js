import { resaltaSiEstasEn } from "../lib/js/resaltaSiEstasEn.js";

export class NavBar extends HTMLElement {
	connectedCallback() {
		this.classList.add("md-navigation-bar");

		this.innerHTML = /* HTML */ `
			<a ${resaltaSiEstasEn(["/index.html", "", "/"])} href="index.html">
				<span class="material-symbols-outlined">bolt</span>
				Próximamente
			</a>

      <a ${resaltaSiEstasEn(["/formulario.html"])} href="proximamente.html">
				<span class="material-symbols-outlined">newspaper</span>
				Forma
			</a>

			<a ${resaltaSiEstasEn(["/formulario.html"])} href="formulario.html">
				<span class="material-symbols-outlined">newspaper</span>
				Forma
			</a>

      <a ${resaltaSiEstasEn(["/ayuda.html"])} href="ayuda.html">
				<span class="material-symbols-outlined">help</span>
				Ayuda
			</a>
		`;
	}
}

customElements.define("nav-bar", NavBar);
