#!/usr/bin/env node

import { writeFile } from 'fs-extra'
import { roll, tempFile } from './lib/rollup'
import { loadNotes, buildProps } from './lib/helpers'
import { buildMarkdown } from './lib/markdown'
import minimist from 'minimist'

const argv = minimist(process.argv.slice(2))
const src = argv._[0]
const dest = argv._[1]
if (!src || !dest) {
  console.log('Usage: src dest [--docs]')
  process.exit(1)
}

async function main() {
  loadNotes(argv.notes)
  await roll(src)
  const components = await import(tempFile)
  const data = buildProps(components)
  const markdown = buildMarkdown(data)

  await writeFile(dest, markdown.join('\n'))
}
main()
