import app from '#app.js';

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}.`);
  console.log(`Docs running at http://localhost:${PORT}/docs.`);
});
