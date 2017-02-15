# Quick API Simulator

A quick and dirty API simulator.

It simulates API responses on custom paths specified in localhost:1337

It would then respond with custom JS expressions when sent with a GET request.

This primarily serves to give a locally served dev machine an API to get responses from
so the rest of the app can be tested and visualized.

### Usage

Clone repo.

```
npm install
npm start
```

Go to http://localhost:1337, change settings.

```
GET /api/isit2?_input=4 200 12.080 ms - 23
```

Returns
```
it is not 2 but it is 4
```
(or whatever you specify in the settings)
