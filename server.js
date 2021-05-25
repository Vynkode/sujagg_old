const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const fs = require('fs');

const server = express();
const PORT = 3000;

//UTILS & DATA
const { options } = require('./utils/options');

//ROUTE CONTROLLERS
const tokenRoute = require('./controllers/token');

//MIDDLEWARE
server.use(bodyParser.json());

const twitchApp = {
  clientId: 'a4004wvruwzyyzvsxidyypk3qy9t15',
  clientSecret: 'sdj85bology2lbhlxbzvb1xpg9k2wf',
  grantType: 'client_credentials',
  scope: 'channel:read:hype_train',
  token: 'Bearer i1y94zo62ipnly2corso00jbibrq45',
};

server.get('/getToken', tokenRoute.getToken(axios, twitchApp, options));
server.get('/showToken', tokenRoute.showToken(twitchApp));

//SEARCH CHANNEL
// axios
//   .get(`${options.url}search/channels?query=sujagg`, {
//     headers: {
//       'client-id': client_id,
//       Authorization: token,
//     },
//   })
//   .then((response) => console.log(response.data.data));

//HYPETRAIN EVENT
// axios
//   .get(`${options.url}${options.path.hype}?broadcaster_id=${options.query.broadcaster_id}&first=50`, {
//     headers: {
//       'client-id': client_id,
//       Authorization: token,
//     },
//   })
//   .then((response) => response.data.data)
//   .then((data) => data.map((d) => console.log(d.event_data)))
//   .catch((err) => console.log(err));

//LAST CHANNEL INFO
// axios
//   .get(`${options.url}${options.path.channel}?broadcaster_id=${options.query.broadcaster_id}`, {
//     headers: {
//       'client-id': client_id,
//       Authorization: token,
//     },
//   })
//   .then((response) => console.log(response.data.data[0]))
//   .catch((err) => console.log(err));

//USER INFO
// axios
//   .get(
//     `${options.url}${options.path.users}?id=${options.query.broadcaster_id}`,
//     {
//       headers: {
//         'client-id': client_id,
//         Authorization: token,
//       },
//     }
//   )
//   .then(response => {
//     const userInfo = response.data.data[0];
//     const fileData = JSON.parse(fs.readFileSync('suja.json'));
//     fileData.suja.push(userInfo);
//     const data = JSON.stringify(fileData);
//     console.log(fileData.suja);
//     fs.writeFileSync('suja.json', data);
//     // console.log(response.data.data[0])
//   })
//   .catch(err => console.log(err));

const hub = {
  callback: 'localhost:3000/hook',
  mode: 'subscribe',
  topic: '',
};

function subsHypeTrain() {
  axios.post('https://api.twitch.tv/helix/eventsub/subscriptions', {
    headers: {
      'Client-ID': client_id,
      Authorization: token,
      'Content-Type': 'application/json',
    },
    data: {
      type: 'channel.follow',
      version: '1',
      condition: { broadcaster_id: '96564203' },
      transport: {
        method: 'webhooks',
        callback: 'localhost:3000/hook',
        secret: 'sujagg',
      },
    },
  });
}

server.post('/hook', (req, res) => {
  console.log(req.body);
  res.sendStatus(200).end();
});

server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
