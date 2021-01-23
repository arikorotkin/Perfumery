- Consider using cheerio instead of puppeteer to grab the links
- To fetch the data use `node-fetch` or axios or any node server http request abstraction layer
- Use some SQL database
- Go to https://www.fragrantica.com/designers/
- Find/Store links for all designers
- For each designer link
    - Find all perfume links
    - For each perfume link : 
      - Extract data and store it in some local data structure (array)
- Store array in sql at the end of the crawl job
- Add .gitignore to ignore node_modules