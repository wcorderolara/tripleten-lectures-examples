const http = require("http");
const fs = require("fs");

http.createServer((req, res) => {
  fs.readFile("data.txt", (err, data) => {
    if (err) {
        res.writeHead(500);
        res.end("Error loading data.txt file");
        return;
    }
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(data);
  });
}).listen(3005);

console.log("Server running at http://localhost:3005/");
