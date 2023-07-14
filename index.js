const app = require("./server");
const DB = require("./models/db_connection");
DB.initDb(() => {
  console.log(`⚡️[server]: Connection with MongoDB database was successful!`);
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
});
