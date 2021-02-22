const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios').default;

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const client_id = 'a4004wvruwzyyzvsxidyypk3qy9t15';
const client_secret = 'sdj85bology2lbhlxbzvb1xpg9k2wf';
const grant_type = 'client_credentials';
const scope = 'channel:read:hype_train';
let token = 'Bearer hpoxh5a0f4ahe56kduo96ognmtbvjo';

const options = {
  url: 'htpps://api.twitch.tv/helix/',
  url_token: 'https://id.twitch.tv/oauth2/token?',
  path: {
    hype: 'hypetrain/events',
    channel: 'channels',
    users: 'users',
    banned: 'moderation/banned',
  },
  query: {
    broadcaster_id: '96564203',
    login: 'sujagg',
  },
};

//GET TOKEN & SCOPE
// axios
//   .post(`${options.url_token}client_id=${client_id}&client_secret=${client_secret}&grant_type=${grant_type}&scope=${scope}`)
//   // .then((response) => (token += response.data.access_token))
//   .then((response) => console.log(response.data.access_token))
//   .catch((err) => console.log(err));

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
//   .get(`${options.url}${options.path.users}?id=${options.query.broadcaster_id}`, {
//     headers: {
//       'client-id': client_id,
//       Authorization: token,
//     },
//   })
//   .then((response) => console.log(response.data.data[0]))
//   .catch((err) => console.log(err));

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
    data: { type: 'channel.follow', version: '1', condition: { broadcaster_id: '96564203' }, transport: { method: 'webhooks', callback: 'localhost:3000/hook', secret: 'sujagg' } },
  });
}

app.post('/hook', (req, res) => {
  console.log(req.body);
  res.sendStatus(200).end();
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
