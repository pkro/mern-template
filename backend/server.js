require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';

import connectDB from './db';

import userRoute from './routes/users';
import authRoute from './routes/auth';

const PORT = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  return res.send('server running');
});

app.use('/api/users', userRoute); // user registration
app.use('/api/auth', authRoute); // authentication

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // set static folde
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
