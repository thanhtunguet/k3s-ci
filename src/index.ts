import program from 'commander';
import packageInfo from 'package.json';
import {Command} from 'src/core/Command';
import 'src/config/dotenv';

Object.setPrototypeOf(program, Command.prototype);

program.version(packageInfo.version);

program.description('Simple CI tool for k3s');

program
  .command('patch <commitID> <workloadFile>')
  .description('Patch a workload file by a commit id')
  .action(program.patchCommit.bind(program));

program.parse(process.argv);
