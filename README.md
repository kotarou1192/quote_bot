# quote_bot
first: `git clone git@github.com:kotarou1192/quote_bot.git`

next: open the quote_bot folder on the console.

next: `npm install`

next: `tsc src/main.ts`

next: create `.env` to the `src/`

next: edit .env like this
  ```json
  {
    token: 'input_your_bot_token_here'
  }
  ```

in directory may be:

```
your-bot-directory-name/
  .git
  .gitignore
  node_modules
  package.json
  package-lock.json
  README.md
  src/
    .env
    main.js
    main.ts
    bot-core.js
    bot-core.ts
    quote.js
    quote.ts
```

finally: `node main.js`


note:
- node.js
  - 13.13.0
- discord.js
  - 12.2.0
