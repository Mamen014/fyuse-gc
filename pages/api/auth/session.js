// pages/api/auth/session.js
import Cors from 'cors';

const cors = Cors({
  origin: 'https://fyuse-gc-image-671019984810.asia-southeast1.run.app',
  methods: ['GET', 'POST', 'OPTIONS'],
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  // Your session logic here
  res.status(200).json({ message: 'Session data' });
}