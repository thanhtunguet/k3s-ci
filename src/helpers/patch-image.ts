import {Deployment} from 'k3s-deployment';
import YAML from 'yaml';

export function patchImage(deployment: Deployment, commitID: string): string {
  const image: string = deployment.spec.template.spec.containers[0].image;

  deployment.spec.template.spec.containers[0].image = image.replace(
    /:([A-Za-z0-9\-_]+)$/,
    `:${commitID}`,
  );

  return YAML.stringify(deployment, {schema: 'json'}).replace(
    /"([A-Za-z0-9]+)":/gim,
    '$1:',
  );
}
