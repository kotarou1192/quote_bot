# quote_bot

first: `tsc main.ts`

next: make `.env` file to the project root directory.

next: edit .env like this
  ```json
  {
    token: 'input_your_bot_token_here'
  }
  ```

in directory may be:

```
your-bot-directory-name/
  .env
  main.js
  bot-core.js
  quote.js
```

next: `npm install discord.js`

finally: `node main.js`


note:
- node.js
  - 13.13.0
- discord.js
  - 12.2.0
