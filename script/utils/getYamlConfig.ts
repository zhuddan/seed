import fs from 'fs';

import yaml from 'js-yaml';

export function getYamlConfig<T>(yamlConfigPath: string) {
  const yamlContent = fs.readFileSync(yamlConfigPath).toString();

  const colorConfig = yaml.load(yamlContent) as T;
  return colorConfig;
}