import app from './app.js';
import { connectDb } from './config/db.js';

const PORT = process.env.PORT;

(async () => {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(
      'Critical: Server failed to start due to DB connection error.',
    );
    process.exit(1);
  }
})();
