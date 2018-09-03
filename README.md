# hvemcasta

# How to run

1. Provide youtube data API key in `client/src/controller/Search.js`

[Getting an API key](https://developers.google.com/youtube/registering_an_application)

NB! Only API key is needed, not OAuth 2.0

2. Build the client web app
```
$ cd client
$ npm run build
```
3. go to backend and start the server
```bash
$ cd backend
$ npm start
```

navigate to localhost:PORT in your browser.
Default port is 3000, can be changed in backend/package.json
