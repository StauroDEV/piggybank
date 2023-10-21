import { globby } from 'globby'

await Bun.build({
  entrypoints: await globby('./src/**/*.{js,ts}'),
  outdir: 'dist',
  root: 'src',
  target: 'node',
  format: 'esm',
  external: ['*'],
}).catch((err) => console.error(err))
