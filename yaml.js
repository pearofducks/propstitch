import yaml from 'js-yaml'
import fs from 'fs'

export const load () => yaml.safeLoad(fs.readFileSync('./annotations.yaml', 'utf-8'))
