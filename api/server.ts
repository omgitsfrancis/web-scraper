import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import { scrape } from './src/scrape';

const cors = require('cors')
const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json())
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to web scraper API!');
});

// scrape:
// body {
//   target: website url,
//   selector: css selector 
//   attribute: html attribute to scrape (optional) 
//              default is to scrape text
// }
app.post('/scrape', (req, res) => {
  let selector = req.body.selector;
  let target = req.body.target;
  let attribute = req.body.attribute;

  if(selector == '' || selector == null) {
    res.status(400).send('Invalid selector entered')
    return;
  } 

  axios.get(target).then(response => {
    res.send(scrape(response.data, selector, attribute))
  }).catch((e) => {
    res.status(400).send('Invalid target url entered')
  })
})

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});