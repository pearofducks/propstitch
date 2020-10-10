export default {
  input: 'index.js',
  output: {
    dir: 'dist',
    format: 'cjs'
  },
  external: [
    'rollup',
    'fs-extra',
    'js-yaml',
    'minimist',
    'rollup-plugin-vue',
    '@rollup/plugin-node-resolve',
    '@rollup/plugin-commonjs'
  ]
}
