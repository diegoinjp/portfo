import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
// import node from '@astrojs/node';

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  // output: 'server',
  // adapter: node({
  //   mode: 'standalone'
  // }),
  integrations: [tailwind(), preact()]
});