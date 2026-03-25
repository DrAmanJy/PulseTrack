import e from "express";

const app = e();

app.use(e.json({ limit: "1kb" }));

app.get("/", (req, res) => res.json({ message: "hello world" }));

export default app;
