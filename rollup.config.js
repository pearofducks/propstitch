import pkg from './package.json'

export default {
  input: 'index.js',
  output: {
    dir: 'dist',
    format: 'cjs',
    banner: '#!/usr/bin/env node',
  },
  external: ['path', ...Object.keys(pkg.dependencies)]
}
