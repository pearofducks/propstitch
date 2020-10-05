import vue from 'rollup-plugin-vue'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: 'documentation/components.js',
  output: {
    dir: 'dist',
    format: 'cjs'
  },
  external: ['vue', '@vue/server-renderer'],
  plugins: [
    nodeResolve(),
    commonjs(),
    vue({ target: 'node' })
  ]
}
