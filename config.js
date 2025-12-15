import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env'), quiet: true });

const settings = {
  SECRET_KEY: process.env.SECRET_KEY,
  SESSION_KEY: process.env.SESSION_KEY,
}

export default settings;
