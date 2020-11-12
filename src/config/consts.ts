import chalk from 'chalk';
import 'src/config/dotenv';

export const GIT_USERNAME: string = process.env.GIT_USERNAME;

if (!GIT_USERNAME) {
  // eslint-disable-next-line no-console
  console.log(chalk.red('Missing GIT_USERNAME'));
  process.exit();
}

export const GIT_PASSWORD: string = process.env.GIT_PASSWORD;

if (!GIT_PASSWORD) {
  // eslint-disable-next-line no-console
  console.log(chalk.red('Missing GIT_PASSWORD'));
  process.exit();
}

export const GIT_EMAIL: string = process.env.GIT_EMAIL;

if (!GIT_EMAIL) {
  // eslint-disable-next-line no-console
  console.log(chalk.red('Missing GIT_EMAIL'));
  process.exit();
}
