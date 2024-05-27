import pLimit from 'p-limit';
import { A as AstroError, U as UnknownContentCollectionError, p as prependForwardSlash } from './astro/assets-service_DpDUt0LL.mjs';
import { b as createComponent, j as renderUniqueStylesheet, k as renderScriptElement, l as createHeadAndContent, d as renderTemplate, e as renderComponent, u as unescapeHTML } from './astro/server_DjsQ5XKt.mjs';
import 'kleur/colors';

function createCollectionToGlobResultMap({
  globResult,
  contentDir
}) {
  const collectionToGlobResultMap = {};
  for (const key in globResult) {
    const keyRelativeToContentDir = key.replace(new RegExp(`^${contentDir}`), "");
    const segments = keyRelativeToContentDir.split("/");
    if (segments.length <= 1)
      continue;
    const collection = segments[0];
    collectionToGlobResultMap[collection] ??= {};
    collectionToGlobResultMap[collection][key] = globResult[key];
  }
  return collectionToGlobResultMap;
}
const cacheEntriesByCollection = /* @__PURE__ */ new Map();
function createGetCollection({
  contentCollectionToEntryMap,
  dataCollectionToEntryMap,
  getRenderEntryImport
}) {
  return async function getCollection(collection, filter) {
    let type;
    if (collection in contentCollectionToEntryMap) {
      type = "content";
    } else if (collection in dataCollectionToEntryMap) {
      type = "data";
    } else {
      console.warn(
        `The collection ${JSON.stringify(
          collection
        )} does not exist or is empty. Ensure a collection directory with this name exists.`
      );
      return [];
    }
    const lazyImports = Object.values(
      type === "content" ? contentCollectionToEntryMap[collection] : dataCollectionToEntryMap[collection]
    );
    let entries = [];
    if (!Object.assign({"BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": "https://screwfast.uk", "ASSETS_PREFIX": undefined}, { Path: process.env.Path })?.DEV && cacheEntriesByCollection.has(collection)) {
      entries = [...cacheEntriesByCollection.get(collection)];
    } else {
      const limit = pLimit(10);
      entries = await Promise.all(
        lazyImports.map(
          (lazyImport) => limit(async () => {
            const entry = await lazyImport();
            return type === "content" ? {
              id: entry.id,
              slug: entry.slug,
              body: entry.body,
              collection: entry.collection,
              data: entry.data,
              async render() {
                return render({
                  collection: entry.collection,
                  id: entry.id,
                  renderEntryImport: await getRenderEntryImport(collection, entry.slug)
                });
              }
            } : {
              id: entry.id,
              collection: entry.collection,
              data: entry.data
            };
          })
        )
      );
      cacheEntriesByCollection.set(collection, entries);
    }
    if (typeof filter === "function") {
      return entries.filter(filter);
    } else {
      return entries;
    }
  };
}
async function render({
  collection,
  id,
  renderEntryImport
}) {
  const UnexpectedRenderError = new AstroError({
    ...UnknownContentCollectionError,
    message: `Unexpected error while rendering ${String(collection)} → ${String(id)}.`
  });
  if (typeof renderEntryImport !== "function")
    throw UnexpectedRenderError;
  const baseMod = await renderEntryImport();
  if (baseMod == null || typeof baseMod !== "object")
    throw UnexpectedRenderError;
  const { default: defaultMod } = baseMod;
  if (isPropagatedAssetsModule(defaultMod)) {
    const { collectedStyles, collectedLinks, collectedScripts, getMod } = defaultMod;
    if (typeof getMod !== "function")
      throw UnexpectedRenderError;
    const propagationMod = await getMod();
    if (propagationMod == null || typeof propagationMod !== "object")
      throw UnexpectedRenderError;
    const Content = createComponent({
      factory(result, baseProps, slots) {
        let styles = "", links = "", scripts = "";
        if (Array.isArray(collectedStyles)) {
          styles = collectedStyles.map((style) => {
            return renderUniqueStylesheet(result, {
              type: "inline",
              content: style
            });
          }).join("");
        }
        if (Array.isArray(collectedLinks)) {
          links = collectedLinks.map((link) => {
            return renderUniqueStylesheet(result, {
              type: "external",
              src: prependForwardSlash(link)
            });
          }).join("");
        }
        if (Array.isArray(collectedScripts)) {
          scripts = collectedScripts.map((script) => renderScriptElement(script)).join("");
        }
        let props = baseProps;
        if (id.endsWith("mdx")) {
          props = {
            components: propagationMod.components ?? {},
            ...baseProps
          };
        }
        return createHeadAndContent(
          unescapeHTML(styles + links + scripts),
          renderTemplate`${renderComponent(
            result,
            "Content",
            propagationMod.Content,
            props,
            slots
          )}`
        );
      },
      propagation: "self"
    });
    return {
      Content,
      headings: propagationMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: propagationMod.frontmatter ?? {}
    };
  } else if (baseMod.Content && typeof baseMod.Content === "function") {
    return {
      Content: baseMod.Content,
      headings: baseMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: baseMod.frontmatter ?? {}
    };
  } else {
    throw UnexpectedRenderError;
  }
}
function isPropagatedAssetsModule(module) {
  return typeof module === "object" && module != null && "__astroPropagation" in module;
}

// astro-head-inject

const contentDir = '/src/content/';

const contentEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/blog/en/post-1.md": () => import('./post-1_CQAIOToM.mjs'),"/src/content/blog/en/post-2.md": () => import('./post-2_BYVn-MDD.mjs'),"/src/content/blog/en/post-3.md": () => import('./post-3_Ck962Gxq.mjs'),"/src/content/blog/fr/post-1.md": () => import('./post-1_C9eVIeSF.mjs'),"/src/content/blog/fr/post-2.md": () => import('./post-2_DVjVgT8r.mjs'),"/src/content/blog/fr/post-3.md": () => import('./post-3_BKVJEwg5.mjs'),"/src/content/docs/advanced/technical-specifications.mdx": () => import('./technical-specifications_wVsuZdj0.mjs'),"/src/content/docs/construction/custom-solutions.mdx": () => import('./custom-solutions_BAK8twHo.mjs'),"/src/content/docs/construction/project-planning.mdx": () => import('./project-planning_B_8ZOfJl.mjs'),"/src/content/docs/construction/safety.mdx": () => import('./safety_CK8IWrTP.mjs'),"/src/content/docs/construction/service-overview.mdx": () => import('./service-overview_Dp9DH3Yf.mjs'),"/src/content/docs/de/guides/first-project-checklist.mdx": () => import('./first-project-checklist_A7MJdtyK.mjs'),"/src/content/docs/de/guides/getting-started.mdx": () => import('./getting-started_BuOwpP2G.mjs'),"/src/content/docs/de/guides/intro.mdx": () => import('./intro_CdMQHYwo.mjs'),"/src/content/docs/de/welcome-to-docs.mdx": () => import('./welcome-to-docs_7Y-gK7WP.mjs'),"/src/content/docs/es/guides/first-project-checklist.mdx": () => import('./first-project-checklist_BjpwHZtC.mjs'),"/src/content/docs/es/guides/getting-started.mdx": () => import('./getting-started_XX0OQn7-.mjs'),"/src/content/docs/es/guides/intro.mdx": () => import('./intro_ButKmGBk.mjs'),"/src/content/docs/es/welcome-to-docs.mdx": () => import('./welcome-to-docs_oO0rFTYz.mjs'),"/src/content/docs/fa/guides/first-project-checklist.mdx": () => import('./first-project-checklist_CL6mb1Q8.mjs'),"/src/content/docs/fa/guides/getting-started.mdx": () => import('./getting-started_B1TXocpi.mjs'),"/src/content/docs/fa/guides/intro.mdx": () => import('./intro_D4uzEuFX.mjs'),"/src/content/docs/fa/welcome-to-docs.mdx": () => import('./welcome-to-docs_B7wwT8SF.mjs'),"/src/content/docs/fr/guides/first-project-checklist.mdx": () => import('./first-project-checklist_CJfVeGrh.mjs'),"/src/content/docs/fr/guides/getting-started.mdx": () => import('./getting-started_D69ijgsG.mjs'),"/src/content/docs/fr/guides/intro.mdx": () => import('./intro_Cnj8jigm.mjs'),"/src/content/docs/fr/welcome-to-docs.mdx": () => import('./welcome-to-docs_DLc4KEi-.mjs'),"/src/content/docs/guides/first-project-checklist.mdx": () => import('./first-project-checklist_BQwHgEkP.mjs'),"/src/content/docs/guides/getting-started.mdx": () => import('./getting-started_DipgKF1u.mjs'),"/src/content/docs/guides/intro.mdx": () => import('./intro_0c29B1w_.mjs'),"/src/content/docs/ja/guides/first-project-checklist.mdx": () => import('./first-project-checklist_sMQz82ap.mjs'),"/src/content/docs/ja/guides/getting-started.mdx": () => import('./getting-started_Dm7mDApV.mjs'),"/src/content/docs/ja/guides/intro.mdx": () => import('./intro_DWSEMU7u.mjs'),"/src/content/docs/ja/welcome-to-docs.mdx": () => import('./welcome-to-docs_CNr-eAIe.mjs'),"/src/content/docs/tools/equipment-care.mdx": () => import('./equipment-care_CqgFU-ig.mjs'),"/src/content/docs/tools/tool-guides.mdx": () => import('./tool-guides_Di-IgrA7.mjs'),"/src/content/docs/welcome-to-docs.mdx": () => import('./welcome-to-docs_iWqR23W5.mjs'),"/src/content/docs/zh-cn/guides/first-project-checklist.mdx": () => import('./first-project-checklist_yK7zicZS.mjs'),"/src/content/docs/zh-cn/guides/getting-started.mdx": () => import('./getting-started_yXqiCppA.mjs'),"/src/content/docs/zh-cn/guides/intro.mdx": () => import('./intro_j0Ckvz3c.mjs'),"/src/content/docs/zh-cn/welcome-to-docs.mdx": () => import('./welcome-to-docs_Cdl9Ewya.mjs'),"/src/content/insights/insight-1.md": () => import('./insight-1_C_eSyZKk.mjs'),"/src/content/insights/insight-2.md": () => import('./insight-2_DdqCdvri.mjs'),"/src/content/insights/insight-3.md": () => import('./insight-3_aS9UhdOz.mjs'),"/src/content/products/a765.md": () => import('./a765_BteB3Uld.mjs'),"/src/content/products/b203.md": () => import('./b203_Nhdsuuj1.mjs'),"/src/content/products/f303.md": () => import('./f303_CcxhbD70.mjs'),"/src/content/products/t845.md": () => import('./t845_CVhdy8fq.mjs')});
const contentCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: contentEntryGlob,
	contentDir,
});

const dataEntryGlob = /* #__PURE__ */ Object.assign({});
const dataCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: dataEntryGlob,
	contentDir,
});
createCollectionToGlobResultMap({
	globResult: { ...contentEntryGlob, ...dataEntryGlob },
	contentDir,
});

let lookupMap = {};
lookupMap = {"docs":{"type":"content","entries":{"welcome-to-docs":"/src/content/docs/welcome-to-docs.mdx","construction/project-planning":"/src/content/docs/construction/project-planning.mdx","construction/service-overview":"/src/content/docs/construction/service-overview.mdx","construction/safety":"/src/content/docs/construction/safety.mdx","advanced/technical-specifications":"/src/content/docs/advanced/technical-specifications.mdx","construction/custom-solutions":"/src/content/docs/construction/custom-solutions.mdx","de/welcome-to-docs":"/src/content/docs/de/welcome-to-docs.mdx","es/welcome-to-docs":"/src/content/docs/es/welcome-to-docs.mdx","guides/getting-started":"/src/content/docs/guides/getting-started.mdx","guides/first-project-checklist":"/src/content/docs/guides/first-project-checklist.mdx","guides/intro":"/src/content/docs/guides/intro.mdx","fr/welcome-to-docs":"/src/content/docs/fr/welcome-to-docs.mdx","ja/welcome-to-docs":"/src/content/docs/ja/welcome-to-docs.mdx","fa/welcome-to-docs":"/src/content/docs/fa/welcome-to-docs.mdx","zh-cn/welcome-to-docs":"/src/content/docs/zh-cn/welcome-to-docs.mdx","tools/equipment-care":"/src/content/docs/tools/equipment-care.mdx","tools/tool-guides":"/src/content/docs/tools/tool-guides.mdx","de/guides/first-project-checklist":"/src/content/docs/de/guides/first-project-checklist.mdx","de/guides/intro":"/src/content/docs/de/guides/intro.mdx","de/guides/getting-started":"/src/content/docs/de/guides/getting-started.mdx","es/guides/getting-started":"/src/content/docs/es/guides/getting-started.mdx","es/guides/first-project-checklist":"/src/content/docs/es/guides/first-project-checklist.mdx","es/guides/intro":"/src/content/docs/es/guides/intro.mdx","fr/guides/first-project-checklist":"/src/content/docs/fr/guides/first-project-checklist.mdx","fr/guides/getting-started":"/src/content/docs/fr/guides/getting-started.mdx","fr/guides/intro":"/src/content/docs/fr/guides/intro.mdx","fa/guides/first-project-checklist":"/src/content/docs/fa/guides/first-project-checklist.mdx","fa/guides/getting-started":"/src/content/docs/fa/guides/getting-started.mdx","fa/guides/intro":"/src/content/docs/fa/guides/intro.mdx","ja/guides/getting-started":"/src/content/docs/ja/guides/getting-started.mdx","ja/guides/intro":"/src/content/docs/ja/guides/intro.mdx","ja/guides/first-project-checklist":"/src/content/docs/ja/guides/first-project-checklist.mdx","zh-cn/guides/first-project-checklist":"/src/content/docs/zh-cn/guides/first-project-checklist.mdx","zh-cn/guides/getting-started":"/src/content/docs/zh-cn/guides/getting-started.mdx","zh-cn/guides/intro":"/src/content/docs/zh-cn/guides/intro.mdx"}},"insights":{"type":"content","entries":{"insight-1":"/src/content/insights/insight-1.md","insight-2":"/src/content/insights/insight-2.md","insight-3":"/src/content/insights/insight-3.md"}},"products":{"type":"content","entries":{"a765":"/src/content/products/a765.md","b203":"/src/content/products/b203.md","f303":"/src/content/products/f303.md","t845":"/src/content/products/t845.md"}},"blog":{"type":"content","entries":{"fr/post-1":"/src/content/blog/fr/post-1.md","fr/post-2":"/src/content/blog/fr/post-2.md","fr/post-3":"/src/content/blog/fr/post-3.md","en/post-1":"/src/content/blog/en/post-1.md","en/post-2":"/src/content/blog/en/post-2.md","en/post-3":"/src/content/blog/en/post-3.md"}}};

function createGlobLookup(glob) {
	return async (collection, lookupId) => {
		const filePath = lookupMap[collection]?.entries[lookupId];

		if (!filePath) return undefined;
		return glob[collection][filePath];
	};
}

const renderEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/blog/en/post-1.md": () => import('./post-1_BaWY2Iet.mjs'),"/src/content/blog/en/post-2.md": () => import('./post-2__clwKYyP.mjs'),"/src/content/blog/en/post-3.md": () => import('./post-3_CFoiE3S3.mjs'),"/src/content/blog/fr/post-1.md": () => import('./post-1_LfvOamLB.mjs'),"/src/content/blog/fr/post-2.md": () => import('./post-2_BHUljOOM.mjs'),"/src/content/blog/fr/post-3.md": () => import('./post-3_CVpByHAh.mjs'),"/src/content/docs/advanced/technical-specifications.mdx": () => import('./technical-specifications_Dc-zaemM.mjs'),"/src/content/docs/construction/custom-solutions.mdx": () => import('./custom-solutions_DaqEal_V.mjs'),"/src/content/docs/construction/project-planning.mdx": () => import('./project-planning__fPnOFc_.mjs'),"/src/content/docs/construction/safety.mdx": () => import('./safety_BAJOcmaD.mjs'),"/src/content/docs/construction/service-overview.mdx": () => import('./service-overview_B9m_if3U.mjs'),"/src/content/docs/de/guides/first-project-checklist.mdx": () => import('./first-project-checklist_DXLVHVAj.mjs'),"/src/content/docs/de/guides/getting-started.mdx": () => import('./getting-started_B56Ke_PE.mjs'),"/src/content/docs/de/guides/intro.mdx": () => import('./intro_BSicl5P2.mjs'),"/src/content/docs/de/welcome-to-docs.mdx": () => import('./welcome-to-docs_DkZPtXcO.mjs'),"/src/content/docs/es/guides/first-project-checklist.mdx": () => import('./first-project-checklist_CdfJfHLQ.mjs'),"/src/content/docs/es/guides/getting-started.mdx": () => import('./getting-started_DZYlHlrx.mjs'),"/src/content/docs/es/guides/intro.mdx": () => import('./intro_BVxYHIN2.mjs'),"/src/content/docs/es/welcome-to-docs.mdx": () => import('./welcome-to-docs_BzEcuBpF.mjs'),"/src/content/docs/fa/guides/first-project-checklist.mdx": () => import('./first-project-checklist_KpAs4frq.mjs'),"/src/content/docs/fa/guides/getting-started.mdx": () => import('./getting-started_DIcX8STT.mjs'),"/src/content/docs/fa/guides/intro.mdx": () => import('./intro_DVGbxxgT.mjs'),"/src/content/docs/fa/welcome-to-docs.mdx": () => import('./welcome-to-docs_BBQznMKB.mjs'),"/src/content/docs/fr/guides/first-project-checklist.mdx": () => import('./first-project-checklist_CfiNTPic.mjs'),"/src/content/docs/fr/guides/getting-started.mdx": () => import('./getting-started_DZoKK8a0.mjs'),"/src/content/docs/fr/guides/intro.mdx": () => import('./intro_B2FiZj6I.mjs'),"/src/content/docs/fr/welcome-to-docs.mdx": () => import('./welcome-to-docs_CujNQA7o.mjs'),"/src/content/docs/guides/first-project-checklist.mdx": () => import('./first-project-checklist_BSBbZAXM.mjs'),"/src/content/docs/guides/getting-started.mdx": () => import('./getting-started_CZGWzgvx.mjs'),"/src/content/docs/guides/intro.mdx": () => import('./intro_C6_Abu6b.mjs'),"/src/content/docs/ja/guides/first-project-checklist.mdx": () => import('./first-project-checklist_CZcAt7wT.mjs'),"/src/content/docs/ja/guides/getting-started.mdx": () => import('./getting-started_DQfFy63y.mjs'),"/src/content/docs/ja/guides/intro.mdx": () => import('./intro_DpSPAbv7.mjs'),"/src/content/docs/ja/welcome-to-docs.mdx": () => import('./welcome-to-docs_Dnp0A9ex.mjs'),"/src/content/docs/tools/equipment-care.mdx": () => import('./equipment-care_DLdpR9dw.mjs'),"/src/content/docs/tools/tool-guides.mdx": () => import('./tool-guides_XOu4lj6W.mjs'),"/src/content/docs/welcome-to-docs.mdx": () => import('./welcome-to-docs_DFanjLPC.mjs'),"/src/content/docs/zh-cn/guides/first-project-checklist.mdx": () => import('./first-project-checklist_BPF8s6i7.mjs'),"/src/content/docs/zh-cn/guides/getting-started.mdx": () => import('./getting-started_BvqQtZLv.mjs'),"/src/content/docs/zh-cn/guides/intro.mdx": () => import('./intro_CVJ97iso.mjs'),"/src/content/docs/zh-cn/welcome-to-docs.mdx": () => import('./welcome-to-docs_CeVwjpiS.mjs'),"/src/content/insights/insight-1.md": () => import('./insight-1_vS_mRzJX.mjs'),"/src/content/insights/insight-2.md": () => import('./insight-2_KKuCvU7k.mjs'),"/src/content/insights/insight-3.md": () => import('./insight-3_CYVQDgtN.mjs'),"/src/content/products/a765.md": () => import('./a765_CtYIEyBU.mjs'),"/src/content/products/b203.md": () => import('./b203_CuMwFYSr.mjs'),"/src/content/products/f303.md": () => import('./f303_DKCp20jo.mjs'),"/src/content/products/t845.md": () => import('./t845_COGFbDPo.mjs')});
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const getCollection = createGetCollection({
	contentCollectionToEntryMap,
	dataCollectionToEntryMap,
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
});

export { getCollection as g };
