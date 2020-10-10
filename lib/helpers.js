import { loadYAML } from './yaml'

let notes

export function loadNotes(notesLocation) {
  notes = notesLocation ? loadYAML(notesLocation) : {}
}

export const getDefault = prop => {
  if (prop === null) return
  return 'default' in prop && typeof prop.default === 'function' ? JSON.stringify(prop.default()) : JSON.stringify(prop.default)
}
export const getTypes = prop => {
  if (prop === null || typeof prop === 'undefined') return ['Any']
  if (Array.isArray(prop)) return prop.flatMap(getTypes)
  if (typeof prop === 'object') return getTypes(prop.type)
  return 'name' in prop ? [prop.name] : ['Unknown']
}
export const getRequired = prop => {
  if (prop === null) return false
  if (typeof prop === 'object') return !!prop.required
  return false
}
export const getMetadata = compName => ({
  name: notes[compName].$name || compName,
  subtitle: notes[compName].$subtitle,
  description: notes[compName].$description,
  token: notes[compName].$token,
  slots: notes[compName].$slots
})
export const internalMetadataName = '$metadata'
export const buildProps = (components) => Object.entries(components).reduce((acc, [name, comp]) => {
  acc[name] = Object.entries(comp.props).reduce((_acc, [k, v]) => {
    _acc[k] = { types: getTypes(v), required: getRequired(v), default: getDefault(v), note: notes[name]?.[k] }
    return _acc
  }, {})
  acc[name][internalMetadataName] = 'name' in notes ? getMetadata(name) : { name }
  return acc
}, {})
