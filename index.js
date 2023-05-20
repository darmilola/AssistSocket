const app = require('express')();
2
const { v4 } = require('uuid');
3

4
app.get('/api', (req, res) => {
5
  const path = `/api/item/${v4()}`;
6
  res.setHeader('Content-Type', 'text/html');
7
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
8
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
9
});
10

11
app.get('/api/item/:slug', (req, res) => {
12
  const { slug } = req.params;
13
  res.end(`Item: ${slug}`);
14
});
15

16
module.exports = app;
