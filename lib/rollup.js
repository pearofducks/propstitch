import { rollup } from 'rollup'
import vue from 'rollup-plugin-vue'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export const tempFile = path.join(__dirname, './build.tmp.js')

export async function roll(components) {
  const bundle = await rollup({
    input: components,
    external: ['vue', '@vue/server-renderer'],
    plugins: [ nodeResolve(), commonjs(), vue({ target: 'node' }) ]
  })

  await bundle.write({ format: 'cjs', file: tempFile })
}
