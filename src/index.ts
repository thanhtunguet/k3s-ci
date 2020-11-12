import program from 'commander';
import packageInfo from 'package.json';
import 'src/config/dotenv';
import {Command} from 'src/core/Command';

Object.setPrototypeOf(program, Command.prototype);

program.version(packageInfo.version);

program.description('Simple CI tool for k3s');

program
  .command('patch <commitID> <workloadFile>')
  .action(program.patchCommit.bind(program));

program.parse(process.argv);
