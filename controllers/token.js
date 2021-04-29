const getToken = (axios, twitchApp, options) => (req, res) => {
  // setInterval(() => console.log('timeout'), 3000);
  axios
    .post(
      `${options.url_token}client_id=${twitchApp.clientId}&client_secret=${twitchApp.clientSecret}&grant_type=${twitchApp.grantType}&scope=${twitchApp.scope}`
    )
    // .then((response) => (token += response.data.access_token))
    .then(response => {
      twitchApp.token = `Bearer ${response.data.access_token}`;
      console.log([response.data.access_token, twitchApp.token]);
    })
    .catch(err => console.log(err));
};

module.exports = { getToken: getToken };
