//import 'dotenv/config';  // Usando 'import' agora
import { env } from './lib/env';

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: '',
});

export default openai;

