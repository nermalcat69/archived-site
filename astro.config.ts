import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import expressiveCode from "astro-expressive-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import imgAttr from "remark-imgattr";
import { autolinkConfig } from "./plugins/rehype-autolink-config";
import astroLLMsGenerator from 'astro-llms-generate';

export default defineConfig({
  site: "https://arjunaditya.xyz",
  prefetch: true,
  integrations: [
    astroLLMsGenerator(),
    react(),
    expressiveCode({
      styleOverrides: {
        codeFontFamily:
          "'MonoLisa', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
      },
    }),
    mdx({
      rehypePlugins: [
        [
          rehypeExternalLinks,
          { target: "_blank", rel: ["noopener", "noreferrer"] },
        ],
      ],
    }),
    sitemap({
      customPages: [
        "https://arjunaditya.xyz/llms.txt",
        "https://arjunaditya.xyz/llms-full.txt",
        "https://arjunaditya.xyz/llms-small.txt"],
      }),
  ],
  trailingSlash: "never",
  adapter: vercel(),
  markdown: {
    rehypePlugins: [
      rehypeHeadingIds,
      [rehypeAutolinkHeadings, autolinkConfig],
      [
        rehypeExternalLinks,
        { target: "_blank", rel: ["noopener", "noreferrer"] },
      ],
    ],
    remarkPlugins: [imgAttr],
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["fsevents"],
    },
    assetsInclude: ["**/*.heic", "**/*.HEIC"],
  },
  // redirects: {
  //   "/projects": "/",

  //   "/projects/commonplace": "/posts/commonplace",
  //   "/friends": "/webrings",
  // },
});
