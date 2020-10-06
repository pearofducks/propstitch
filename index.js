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
export const buildProps = (components) => Object.entries(components).reduce((acc, [name, comp]) => {
  acc[name] = Object.entries(comp.props).reduce((_acc, [k, v]) => {
    _acc[k] = { types: getTypes(v), required: getRequired(v), default: getDefault(v), note: getNote(name, k) }
    return _acc
  }, {})
  acc[name].metadata = getMetadata(name)
  return acc
}, {})

const result = buildProps(testComponents)
const newline = '\n'
const print = Object.entries(result).map(([k, v]) => {
  const result = []
  result.push(`# ${v.metadata.name}${newline}`)
  if (v.metadata.subtitle) result.push(`## ${v.metadata.subtitle}${newline}`)
  if (v.metadata.description) result.push(v.metadata.description + newline)
  if (v.metadata.token) {
    result.push('```')
    result.push(v.metadata.token.trim())
    result.push('```' + newline)
  }

  return result.join('\n')
})
console.log(print)
writeFileSync('./foo.md', print.join('\n'))
