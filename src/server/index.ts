import handler from 'serve-handler';
import http from 'http';

const server = http.createServer((request, response) => {
  return handler(request, response, {
    public: 'dist/view/',
  });
});

server.listen(3000, () => {
  console.log('[SERVER]: Running at http://localhost:3000');
});
