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
  if (typeof type === 'object') return !!prop.required
  return false
}
const result = Object.entries(components).map(([name, component]) => {
  return name + '::' + Object.entries(component.props).map(([k, v]) => k + ' props:' + getTypes(v).join('|') + ' - required:' + getRequired(v) + ' - default:' + getDefault(v))
})
console.log(result)
//
// require('browser-env')()
// const { h, createApp } = require('vue')

// const Foo = {
//   props: {
//     one: String,
//     two: Boolean
//   },
//   render() {
//     return h('p', 'hello')
//   }
// }

// const App = {
//   name: 'App',
//   components: { Foo },
//   render() {
//     return h('h1', 'hi')
//   }
// }

// const app = createApp(App).component('foo', Foo).mount(document.createElement('div'))
// console.log(app.$)


