import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import { scrapeData } from './src/scrape';

const cors = require('cors')
const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json())
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to web scraper API!');
});

// scrape
// body {
//   target: website url,
//   selector: css selector
// }
app.post('/scrape', (req, res) => {
  let selector = req.body.selector;
  let target = req.body.target;

  if(selector == '' || selector == null) {
    res.status(400).send('Invalid selector entered')
    return;
  } 

  axios.get(target).then(response => {
    res.send(scrapeData(response.data, selector))
  }).catch(err => {
    res.status(400).send('Invalid target url entered')
  })
})

// app.post('/html', (req, res) => {
//   let target = req.body.target;

//   axios.get(target).then(response => {
//     res.send(response.data)
//   }).catch(err => {
//     res.status(400).send('Invalid target url entered')
//   })
// })

app.listen(err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});