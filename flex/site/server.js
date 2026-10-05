// Tiny static server: `node server.js` then open http://localhost:8642/v2/ (or /v1/)
const http=require('http'),fs=require('fs'),path=require('path');
const T={'.html':'text/html; charset=utf-8','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.js':'text/javascript','.css':'text/css'};
http.createServer((q,r)=>{let u=decodeURIComponent(q.url.split('?')[0]);if(u.endsWith('/'))u+='index.html';
  const f=path.join(__dirname,path.normalize(u).replace(/^(\.\.[\/\\])+/,''));
  fs.readFile(f,(e,b)=>{if(e){r.writeHead(404);return r.end('not found')}r.writeHead(200,{'Content-Type':T[path.extname(f)]||'application/octet-stream'});r.end(b)});
}).listen(8642,()=>console.log('Open http://localhost:8642/v2/  (V1: /v1/)'));
