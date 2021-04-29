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

module.exports = { options: options }
