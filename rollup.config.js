export default {
  input: 'index.js',
  output: {
    dir: 'dist',
    format: 'cjs',
    banner: '#!/usr/bin/env node',
  },
  external: [
    'path',
    'rollup',
    'fs-extra',
    'js-yaml',
    'minimist',
    'rollup-plugin-vue',
    '@rollup/plugin-node-resolve',
    '@rollup/plugin-commonjs'
  ]
}
