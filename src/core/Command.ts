import chalk from 'chalk';
import {execSync} from 'child_process';
import {Command as Commander} from 'commander';
import fs from 'fs';
import {Deployment} from 'k3s-deployment';
import path from 'path';
import {escape} from 'querystring';
import {GIT_EMAIL, GIT_PASSWORD, GIT_USERNAME} from 'src/config/consts';
import {patchImage} from 'src/helpers/patchImage';
import {v4} from 'uuid';
import YAML, {Document} from 'yaml';

export class Command extends Commander {
  public workloadFile: string;

  public repository: string;

  public branch: string;

  public patchCommit(commitID: string) {
    const repoPath: string = v4();

    const repository: string = this.repository.replace(
      /^https:\/\//,
      `https://${escape(GIT_USERNAME)}:${escape(GIT_PASSWORD)}@`,
    );

    try {
      // Clone repository
      execSync(
        `git clone --single-branch --branch ${this.branch} ${repository} ${repoPath}`,
      );

      const workloadRealPath: string = path.join(repoPath, this.workloadFile);

      if (!fs.existsSync(workloadRealPath)) {
        // eslint-disable-next-line no-console
        console.error(chalk.red('File %s does not exist!'), this.workloadFile);
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

      execSync(`git add -A ${this.workloadFile}`);

      execSync('git config user.name k3s-ci');

      execSync(`git config user.email ${GIT_EMAIL}`);

      execSync(
        `git commit -m 'Patch file ${this.workloadFile} with commit ${commitID}'`,
      );

      execSync(`git push origin ${this.branch}`);

      process.chdir('..');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      execSync(`rm -rf ${repoPath}`);
    }
  }
}
