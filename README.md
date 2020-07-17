# quote_bot
## how to install
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

next: `cd src`

finally: `node main.js`

## usage

first: copy the message url to clipboard.(right click a message and copy the message link)

finally: send message url.

bot quotes like this:

<img src="https://github.com/kotarou1192/quote_bot/blob/master/pic/quote_strings.png" width="400">

<img src="https://github.com/kotarou1192/quote_bot/blob/master/pic/quote_image.png" width="400">

## info

note:
- node.js
  - 13.13.0
- discord.js
  - 12.2.0
