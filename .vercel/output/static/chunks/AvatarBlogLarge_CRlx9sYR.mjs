import { a as createAstro, b as createComponent, d as renderTemplate, m as maybeRenderHead, e as renderComponent } from './astro/server_DjsQ5XKt.mjs';
import 'kleur/colors';
import { $ as $$Image } from './_astro_assets_BIMc2scS.mjs';

function formatDate(date) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(date).toLocaleDateString(void 0, options);
}
function capitalize(str) {
  if (typeof str !== "string" || str.length === 0) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const $$Astro = createAstro("https://screwfast.uk");
const $$AvatarBlogLarge = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AvatarBlogLarge;
  const { blogEntry } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="flex-shrink-0"> ${renderComponent($$result, "Image", $$Image, { "class": "size-10 rounded-full sm:h-14 sm:w-14", "src": blogEntry.data.authorImage, "alt": blogEntry.data.authorImageAlt, "draggable": "false", "format": "avif" })} </div>`;
}, "D:/websites/ElektroSrem/src/components/ui/avatars/AvatarBlogLarge.astro", void 0);

export { $$AvatarBlogLarge as $, capitalize as c, formatDate as f };
