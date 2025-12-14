import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: 'development',
  entry: './javascript/mobile_verification.js',
  output: {
    filename: 'mobile_verification.js',
    path: path.resolve(__dirname, 'public', 'js'),
  },
}
