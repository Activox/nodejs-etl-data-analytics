const http = require("http");
const server = http.createServer((request, response) => {
    response.writeHead(200, { "Content-Type": "text/plain" })
    response.end("Hello world!");
})

console.log("Your app is listening on port 8080.");
server.listen(8080)
