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

#### Example 1: Text
```
URL: "https://djmag.com/top100djs"
Selector: ".top100dj-name a"
Data to fetch: "text"
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

#### Example 2: Attribute
```
URL: "https://www.bing.com/search?q=github"
Selector: "h2 > a"
Attribute: "href"
Data to fetch: "attribute"
Results:
" https://github.com/
  https://en.wikipedia.org/wiki/GitHub
  https://play.google.com/store/apps/details?id=com.github.android& hl=en_US
  /news/search?q=GitHub&qpvt=github&FORM=EWRE
  /news/search?q=GitHub&qpvt=github&FORM=EWRE
  https://www.howtogeek.com/180167/ htg-explains-what-is-github-and-what-do-geeks-use-it-for/
  https://help.github.com/en/github/getting-started-with-github
  https://github.blog/
  https://twitter.com/github
  https://lab.github.com/
  https://www.zhihu.com/question/20070065
  /videos/search?q=github&qpvt=github&FORM=VDRE
  ..."
```
