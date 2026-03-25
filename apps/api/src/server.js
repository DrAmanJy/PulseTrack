import app from "./app.js";

app.listen(3000, (err) => {
  if (err) console.error(err.message);
  console.log("Server is running on http://localhost:3000");
});
