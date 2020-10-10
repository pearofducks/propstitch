import { internalMetadataName } from './helpers'
const newline = '\n'
const handleUndefined = d => typeof d === 'undefined' ? '' : d
const typeJoin = ` \\| `
const markdownLine = ([propName, info]) => `| ${propName} | ${info.types.join(typeJoin)} | ${handleUndefined(info.default)} | ${handleUndefined(info.note)} |`
export const buildMarkdown = data => Object.values(data).map(v => {
  const result = []
  const md = v[internalMetadataName]
  result.push(newline)
  result.push(`# ${md.name}${newline}`)
  if (md.subtitle) result.push(`## ${md.subtitle}${newline}`)
  if (md.description) result.push(md.description + newline)
  if (md.token) {
    result.push('```')
    result.push(md.token.trim())
    result.push('```' + newline)
  }

  result.push('| Name | Types | Default | Notes |')
  result.push('|:-----|:------|:--------|:------|')
  const props = Object.entries(v).filter(([k]) => k !== internalMetadataName).map(markdownLine)
  result.push(...props)

  return result.join('\n')
})
