// Sanity Studio configuration. Not yet mounted as a route — no Sanity
// project has been created for this site. Once `SANITY_PROJECT_ID` /
// `NEXT_PUBLIC_SANITY_PROJECT_ID` exist, embed the Studio (see next-sanity's
// NextStudio component) at app/studio/[[...tool]]/page.tsx pointing at this
// config, or run `pnpm dlx sanity dev` from a separate Studio deployment.
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
  name: "ashersimmonsmusic",
  title: "Asher Simmons Music",
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
