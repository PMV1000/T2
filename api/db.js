import jsonServer from 'json-server';
import path from 'path';

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, '../database.json')); // Đường dẫn đến database.json
const middlewares = jsonServer.defaults();

// Sử dụng middlewares
server.use(middlewares);
server.use(router);

// Lắng nghe trên cổng mà Vercel cung cấp
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
