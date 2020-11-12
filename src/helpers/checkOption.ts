import chalk from 'chalk';

export function checkOption(name: string, value: string): boolean {
  if (value) {
    return true;
  }
  // eslint-disable-next-line no-console
  console.log(chalk.red(`${name} is required`));
  process.exit();
}
