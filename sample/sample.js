var express = require('express')
var app = express()
var Buffer = require('buffer').Buffer
var Iconv  = require('iconv').Iconv

app.use(express.bodyParser())

var ipizza = require('ipizza')

ipizza.set('hostname', 'http://localhost:4000')
ipizza.set('appHandler', app)
ipizza.set('log level', 'verbose')


ipizza.provider('swedbank',
  { clientId: 'uid202196'
  , privateKey: __dirname + '/keys/swedbank.key.pem'
  , certificate: __dirname + '/keys/swedbank.cert.pem'
  })

ipizza.provider('seb',
  { clientId: 'uid203519'
  , privateKey: __dirname + '/keys/seb.key.pem'
  , certificate: __dirname + '/keys/seb.cert.pem'
  })

ipizza.provider(
  { provider: 'sampo'
  , clientId: 'uid203713'
  , privateKey: __dirname + '/keys/sampo.key.pem'
  , certificate: __dirname + '/keys/sampo.cert.pem'
  })


ipizza.on('success', function (reply, req, resp) {
  
})
ipizza.on('error', function (reply, req, resp) {
  
})


app.get('/', function (req, res) {
  res.sendfile(__dirname + '/pay.html')
})

app.post('/pay', function (req, res) {
  // Never do this in production. Don't send payment data directly from request.
  ipizza.payment(req.body).pipe(res)
})

app.listen(4000)