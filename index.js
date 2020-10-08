import * as testComponents from './dist/components'
import { writeFileSync } from 'fs'
import { loadYAML } from './yaml'

const notes = loadYAML()
export const getDefault = prop => {
  if (prop === null) return
  return 'default' in prop && typeof prop.default === 'function' ? JSON.stringify(prop.default()) : JSON.stringify(prop.default)
}
export const getTypes = prop => {
  if (prop === null) return ['Any']
  if (Array.isArray(prop)) return prop.flatMap(getTypes)
  if (typeof prop === 'object') return getTypes(prop.type)
  return 'name' in prop ? [prop.name] : ['Unknown']
}
export const getRequired = prop => {
  if (prop === null) return false
  if (typeof prop === 'object') return !!prop.required
  return false
}
export const getNote = (compName, propName) => notes[compName][propName]
export const getMetadata = compName => ({
  name: notes[compName].$name || compName,
  subtitle: notes[compName].$subtitle,
  description: notes[compName].$description,
  token: notes[compName].$token,
  slots: notes[compName].$slots
})
const internalMetadataName = '$metadata'
export const buildProps = (components) => Object.entries(components).reduce((acc, [name, comp]) => {
  acc[name] = Object.entries(comp.props).reduce((_acc, [k, v]) => {
    _acc[k] = { types: getTypes(v), required: getRequired(v), default: getDefault(v), note: getNote(name, k) }
    return _acc
  }, {})
  acc[name][internalMetadataName] = getMetadata(name)
  return acc
}, {})

const result = buildProps(testComponents)
console.log(result)
const newline = '\n'
const handleUndefined = d => typeof d === 'undefined' ? '' : d
const typeJoin = ` \\| `
console.log(typeJoin)
const markdownLine = ([propName, info]) => `| ${propName} | ${info.types.join(typeJoin)} | ${handleUndefined(info.default)} | ${handleUndefined(info.note)} |`
const print = Object.values(result).map(v => {
  const result = []
  const md = v[internalMetadataName]
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
console.log(print)
writeFileSync('./foo.md', print.join('\n'))
