import app from './src/app.js';

if (process.env.NODE_ENV === 'production') {
  app.listen(3000, () => null);
} else {
  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
}
