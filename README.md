# wslogs

Simple logging over websockets, hooks into console.log, console.warn and console.error to send remote messages.

Run a server locally:

`npm start`

Include a script tag into the webpage you want to remote log from:
```
<script src="http://localhost:9000/client.js"
        data-host="http://localhost:9000/log"></script>
```
**NB: Be sure to update the host to where it can be accessed from**

Console logs will now be displayed both locally and remotely.

## Setup

- `npm install --production`
- `npm start`

## Development

- `npm install`
- `npm start:dev`

## Build output files

- `npm run build`
