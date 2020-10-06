import yaml from 'js-yaml'
import fs from 'fs'

export const loadYAML = () => yaml.safeLoad(fs.readFileSync('./documentation/components.yaml', 'utf-8'))
