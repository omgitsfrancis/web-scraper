# Web Scraper
This is a simple website scraper for web pages using [CSS selectors](https://www.w3schools.com/css/css_selectors.asp). The API was developed using Node, Express, and Cheerio. The UI was written using React, Typescript, and Material UI.

## Setup
Clone repo
```
git clone https://github.com/omgitsfrancis/web-scraper
```
Install packages
```
cd web-scraper\api
npm install

cd ..\client
npm install
```
Create environment variables (in client folder)
```
cp .env.sample .env
```

## Execution
Start local API server
```
cd ..\api
npm run dev
```
Start local UI server
```
cd ..\client
npm run start
```
## Usage
Enter the URL of the page you want to scrape. Input the [CSS selector](https://www.w3schools.com/css/css_selectors.asp) of the element you want the innerText of. After that, click the scrape button and the results will populate in the TextArea below. 

Example:
```
URL: "https://djmag.com/top100djs"
Selector: ".top100dj-name a"
Results:
" Dimitri Vegas & Like Mike
  Martin Garrix
  David Guetta
  Armin Van Buuren
  Marshmello
  ..."
```

Results can be formated in three different ways: Text, Array, and Numbered.

Text
```
Dimitri Vegas & Like Mike
Martin Garrix
David Guetta
Armin Van Buuren
Marshmello
...
```
Array
```
[Dimitri Vegas & Like Mike,
Martin Garrix,
David Guetta,
Armin Van Buuren,
Marshmello,
...]
```
Numbered
```
1.	Dimitri Vegas & Like Mike
2.	Martin Garrix
3.	David Guetta
4.	Armin Van Buuren
5.	Marshmello 
...
```
