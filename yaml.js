import yaml from 'js-yaml'
import fs from 'fs-extra'

export const loadYAML = (location) => yaml.safeLoad(fs.readFileSync(location, 'utf-8'))
