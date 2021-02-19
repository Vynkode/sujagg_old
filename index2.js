const express = require('express');
const https = require('https');

const app = express();

const options = {
  hostname: 'api.twitch.tv',
  path: '/helix/search/channels?query=a_seagull',
  headers: {
    'client-id': 'a4004wvruwzyyzvsxidyypk3qy9t15',
  },
};

https
  .get(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      console.log(data);
    });
  })
  .on('error', (err) => {
    console.log('Error: ' + err.message);
  });
