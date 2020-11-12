import program from 'commander';
import packageInfo from 'package.json';
import 'src/config/dotenv';
import {Command} from 'src/core/Command';
import {checkPath} from 'src/helpers/checkPath';

checkPath('git');

Object.setPrototypeOf(program, Command.prototype);

program.version(packageInfo.version);

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
    `-b, --branch <${Command.prototype.branch}>`,
    'Branch to clone',
    'master',
  )
  .command('patch <commitID>')
  .action(program.patchCommit.bind(program));

program.parse(process.argv);
