import 'src/config/dotenv';

export const GIT_USERNAME: string = process.env.GIT_USERNAME;

export const GIT_PASSWORD: string = process.env.GIT_PASSWORD;

export const GIT_EMAIL: string = process.env.GIT_EMAIL;

export const GIT_REPO: string = process.env.GIT_REPO;

export const GIT_BRANCH: string = process.env.GIT_BRANCH ?? 'master';
