const fs = require('fs');

const messages = (req, res) => {
  let url = req.url;
  let method = req.method;
  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write(`<html>
    <body>
      <h1> 
        Hello
      </h1>
      <form action ='/message' method ='POST'>
        <input type='text' name='message'>
          <button type='submit'>
            click
          </button>
        </input>
      </form>
    </body>
    </html>`)
    res.end()
  }
  if (url === '/message' && method === 'POST') {
    let body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    req.on('end', () => {
      let parsebody = Buffer.concat(body).toString();
      let msg = parsebody.split('=')[1];
      fs.writeFileSync('message.txt', msg);
    })
    let msg = ""
    fs.readFile('message.txt', (err, data) => {
      let newmsg = data.toString();
      msg = newmsg
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.write(`<html>
    <body>
      <h2> 
        Hello <h1>${msg}</h1>
      </h2>
      <form action ='/message' method ='POST'>
        <input type='text' name='message'>
          <button type='submit'>
            click
          </button>
        </input>
      </form>
    </body>
    </html>`)
      res.end()
    });
  }
}
module.exports = messages;

// module.exports = {
//   handler : messages,
//   someText : 'some text'
// }