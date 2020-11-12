import chalk from 'chalk';
import {execSync, ExecSyncOptionsWithStringEncoding} from 'child_process';
import {Command as Commander} from 'commander';
import fs from 'fs';
import {Deployment} from 'k3s-deployment';
import path from 'path';
import {escape} from 'querystring';
import {
  GIT_BRANCH,
  GIT_EMAIL,
  GIT_PASSWORD,
  GIT_REPO,
  GIT_USERNAME,
} from 'src/config/consts';
import 'src/config/dotenv';
import {checkOption} from 'src/helpers/checkOption';
import {checkPath} from 'src/helpers/checkPath';
import {patchImage} from 'src/helpers/patchImage';
import {v4} from 'uuid';
import YAML, {Document} from 'yaml';

const execOptions: ExecSyncOptionsWithStringEncoding = {
  stdio: [process.stdin, process.stdout, process.stderr],
  encoding: 'utf-8',
};

export class Command extends Commander {
  public patchCommit(commitID: string, workloadFile: string) {
    checkPath('git');

    checkOption(nameof(GIT_USERNAME), GIT_USERNAME);

    checkOption(nameof(GIT_EMAIL), GIT_EMAIL);

    checkOption(nameof(GIT_REPO), GIT_REPO);

    const repoPath: string = v4();

    const repository: string = GIT_REPO.replace(
      /^https:\/\//,
      `https://${escape(GIT_USERNAME)}:${escape(GIT_PASSWORD)}@`,
    );

    try {
      // Clone repository
      execSync(
        `git clone --single-branch --branch ${GIT_BRANCH} ${repository} ${repoPath}`,
        execOptions,
      );

      const workloadRealPath: string = path.join(repoPath, workloadFile);

      if (!fs.existsSync(workloadRealPath)) {
        // eslint-disable-next-line no-console
        console.error(chalk.red('File %s does not exist!'), workloadFile);
        process.exit();
      }

      const yamlContent: string = fs.readFileSync(workloadRealPath, {
        encoding: 'utf-8',
      });

      const documents: Document.Parsed[] = YAML.parseAllDocuments(yamlContent);

      const deployment: Deployment = documents[0].toJSON();

      const restDocs: Document.Parsed[] = documents.slice(1);

      let result: string = patchImage(deployment, commitID);

      if (restDocs.length > 0) {
        result +=
          '\n' +
          restDocs
            .map((doc: Document.Parsed) => {
              return doc.toString();
            })
            .join('\n---\n');
      }

      fs.writeFileSync(workloadRealPath, result);

      process.chdir(repoPath);

      execSync(`git add -A ${workloadFile}`, execOptions);

      execSync('git config user.name k3s-ci', execOptions);

      execSync(`git config user.email ${GIT_EMAIL}`, execOptions);

      execSync(
        `git commit -m 'Patch file ${workloadFile} with commit ${commitID}'`,
        execOptions,
      );

      execSync(`git push origin ${GIT_BRANCH}`, execOptions);

      process.chdir('..');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      execSync(`rm -rf ${repoPath}`);
    }
  }
}
