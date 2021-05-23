import chalk from 'chalk';
import {execSync} from 'child_process';

export function checkPath(command: string): boolean {
  const path: string = execSync(`which ${command}`, {
    encoding: 'utf-8',
  }).trim();

  if (path) {
    return true;
  }

  // eslint-disable-next-line no-console
  console.log(chalk.red(`${command} is required`));
  process.exit();
}
