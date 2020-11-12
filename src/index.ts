import program from 'commander';
import packageInfo from 'package.json';
import 'src/config/dotenv';
import {Command} from 'src/core/Command';
import {GIT_EMAIL, GIT_PASSWORD, GIT_USERNAME} from './config/consts';

Object.setPrototypeOf(program, Command.prototype);

program.version(packageInfo.version);

program.description('Simple CI tool for k3s');

program
  .option(
    `-f, --workload-file <${nameof(Command.prototype.workloadFile)}>`,
    'Workload file',
  )
  .option(
    `--repository <${nameof(Command.prototype.repository)}>`,
    'Repository URL',
  )
  .option(
    `-b, --branch <${nameof(Command.prototype.branch)}>`,
    'Branch to clone',
    'master',
  )
  .option(
    `-u, --username <${nameof(Command.prototype.gitUsername)}>`,
    'Git username',
    GIT_USERNAME,
  )
  .option(
    `-p, --password <${nameof(Command.prototype.gitPassword)}>`,
    'Git password',
    GIT_PASSWORD,
  )
  .option(
    `-e, --email <${nameof(Command.prototype.gitEmail)}>`,
    'Git email',
    GIT_EMAIL,
  )
  .command('patch <commitID>')
  .action(program.patchCommit.bind(program));

program.parse(process.argv);
