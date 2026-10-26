import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";
import path from "node:path";
import { fileURLToPath } from "node:url";

const aqui = path.dirname(fileURLToPath(import.meta.url));
const modulos = path.join(aqui, "node_modules");

// O kit (../src/components) fica fora desta pasta; por isso as dependências dele
// são procuradas aqui dentro, em vez de em ../node_modules (que não existe).
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  resolve: {
    alias: [
      {
        find: /^(react|react-dom|prop-types|classnames|@fortawesome\/[^/]+)(\/.*)?$/,
        replacement: `${modulos}/$1$2`,
      },
      { find: "@kit", replacement: path.join(aqui, "../src/components") },
    ],
  },
  server: { fs: { allow: [path.join(aqui, "..")] } },
});
