/* empty css                         */
import { a as createAstro, b as createComponent, d as renderTemplate, e as renderComponent, f as renderScript, m as maybeRenderHead } from './astro/server_DjsQ5XKt.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from './MainLayout_CjIcgQY0.mjs';
import { $ as $$Btn404 } from './Btn404_CXb6I6Nc.mjs';

const $$Astro = createAstro("https://screwfast.uk");
const $$404 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$404;
  const title = "404";
  const subTitle = "Oops, ce n'est pas l'outil que vous recherchiez !";
  const content = "Ne laissez pas ce contretemps vous ralentir. Revenons \xE0 la construction de votre chef-d'\u0153uvre.";
  const btnTitle = "Retournez";
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Page Non Trouv\xE9e | ScrewFast", "lang": "fr" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="grid h-svh place-content-center"> <div class="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16"> <div class="mx-auto max-w-screen-sm text-center"> <h1 class="text-dark mb-4 text-7xl font-extrabold text-yellow-500 dark:text-yellow-400 lg:text-9xl"> ${title} </h1> <p class="mb-4 text-balance text-3xl font-bold tracking-tight text-neutral-700 dark:text-neutral-300 md:text-4xl"> ${subTitle} </p> <p class="mb-4 text-pretty text-lg text-neutral-600 dark:text-neutral-400"> ${content} </p> <!--Display a button that navigates user back to the previous page--> ${renderComponent($$result2, "Btn404", $$Btn404, { "title": btnTitle, "id": "go-back" })} </div> </div> </section> ` })} <!--JavaScript code that adds click event to the Button, resulting in going back to the previous page in history--> ${renderScript($$result, "D:/websites/ElektroSrem/src/pages/fr/404.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/websites/ElektroSrem/src/pages/fr/404.astro", void 0);

const $$file = "D:/websites/ElektroSrem/src/pages/fr/404.astro";
const $$url = "/fr/404";

export { $$404 as default, $$file as file, $$url as url };
