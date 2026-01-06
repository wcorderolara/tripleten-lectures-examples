const http = require("http");
const fs = require("fs");
const { RedirectHandler } = require("undici-types");

http.createServer((req, res) => {
 /* // REQUEST
  method = ['POST', 'GET', 'PUT', 'DELETE']
  url = ['/api/todos', '/api/todos/:id']
  originalUrl = 'http://localhost:3005/api/todos?title=My+first+todo'
  path = '/api/todos'
  protocol = ['http', 'https']
  params: {id: '45'}
  query: {title: 'My first todo'},
  body = {
    title: 'My first todo',
    description: 'This is my first todo item',
    completed: false
  }
  // RESPONSE
  stastusCode = [200, 201, 204, 400, 401, 403, 404, 500]
  send = {}
  redirect
  sendFile*/
}).listen(3005);

console.log("Server running at http://localhost:3005/");
