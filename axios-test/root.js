const proxy = require('http-proxy-middleware')
const Bundler = require('parcel-bundler')
const express = require('express')

const bundler = new Bundler('src/index.html', {
  cache: true
})

const app = express()

app.use(
  '/api', proxy({
    target: 'http://localhost:8890'
  })
)


var port = process.env.PORT;
console.info(`port: ${port}`);

app.use(bundler.middleware())
app.listen(Number(port || 1234))