import app from '#app.js';
import { connectDB } from '#config/db.js';

const PORT = process.env.PORT ?? 3000;

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error('Uncaught Promise Rejection:', err);
  process.exit(1);
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}.`);
  console.log(`Docs running at http://localhost:${PORT}/docs.`);
});

connectDB();
