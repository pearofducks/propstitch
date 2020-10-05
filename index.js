const components = require('./dist/components')

const getDefault = prop => {
  if (prop === null) return
  return 'default' in prop && typeof prop.default === 'function' ? JSON.stringify(prop.default()) : JSON.stringify(prop.default)
}
const getTypes = prop => {
  if (prop === null) return ['Any']
  if (Array.isArray(prop)) return prop.flatMap(getTypes)
  if (typeof prop === 'object') return getTypes(prop.type)
  return 'name' in prop ? [prop.name] : ['Unknown']
}
const getRequired = prop => {
  if (prop === null) return false
  if (typeof prop === 'object') return !!prop.required
  return false
}
const result = Object.entries(components).reduce((acc, [name, comp]) => {
  acc[name] = Object.entries(comp.props).reduce((_acc, [k, v]) => {
    _acc[k] = { types: getTypes(v), required: getRequired(v), default: getDefault(v) }
    return _acc
  }, {})
  return acc
}, {})
console.log(result)
