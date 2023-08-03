import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';
import express from 'express';
import cors from 'cors';

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI,
});

const openai = new OpenAIApi(configuration);
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello world');
})

app.post('/image', async (req, res) => {
  const prompt = req.body.prompt;

  const aiResponse = await openai.createImage({
    prompt: prompt,
    n: 1,
    size: '512x512',
  });
  const image = aiResponse.data.data[0].url;
  res.send({ image });
});

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});

export default app;
