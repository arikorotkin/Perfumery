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

ARI NOTES 14 FEB 2021:
- since there is no "all perfumes" page on Frag, we will have to get perfumes from perfumers pages
- since there are no URLs for categories thoes instances will have to be created on first appearance when adding note instances
- since there is no "all brands" page on Frag, we will have to get brands from perfume pages
- scrape order should be the following:
  1. notes (& categories)
  2. perfumers (which will internally scrape perfumes, which will internally scrape brands)
- there might need to be some retooling but it seems like it would make sense to scrape reviews along with users, not perfumes? (depends on user page)