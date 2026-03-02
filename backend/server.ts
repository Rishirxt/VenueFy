import app from './app';
import { config } from './src/config/config';
import connectDB from './src/config/db';
const startServer = async () => {
  const PORT = config.port;

  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();