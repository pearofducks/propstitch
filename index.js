import { writeFile } from 'fs-extra'
import { roll } from './rollup'
import { loadNotes, buildProps } from './helpers'
import { buildMarkdown } from './markdown'
import minimist from 'minimist'
import path from 'path'

const argv = minimist(process.argv.slice(2))
const src = argv._[0]
const dest = argv._[1]
if (!src || !dest) {
  console.log('Usage: src dest [--docs]')
  process.exit(1)
}

export const tempFile = path.join(__dirname, './build.tmp.js')

async function main() {
  loadNotes(argv.notes)
  await roll(src)
  const components = await import(tempFile)
  const data = buildProps(components)
  const markdown = buildMarkdown(data)

  await writeFile(dest, markdown.join('\n'))
}
main()
