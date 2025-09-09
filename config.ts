import * as dotenv from 'dotenv';
dotenv.config();

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Environment variable ${name} is required but not set`);
  }
  return value;
}

export const config = {
  username: requireEnv('USERNAME'),
  password: requireEnv('PASSWORD'),
};
