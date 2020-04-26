const h = global.url = url => url.indexOf('https://') === 0 ? url : 'https://' + url

const list = [{
    keys: ['spotify', 'spoti', '@root', 'www'],
    url: h('open.spotify.com/user/joaqo.esteban'),
    subs: require('./spotify/playlists')
  },
  {
    keys: ['instagram', 'insta'],
    url: h('instagram.com/joa.qo'),
  },
  {
    keys: ['github', 'git'],
    url: h('github.com/joacoesteban'),
  },
  {
    keys: ['linkedin'],
    url: h('linkedin.com/in/joaquin-esteban-627ab6183/'),
  },
  {
    keys: ['contact', 'mail', 'email'],
    url: 'mailto:me@joacoesteban.com'
  },
]

const controller = {
  async get(domains) {
    const top = (list.find(itm => itm.keys.some(key => key === domains[0])) || {})
    if (!domains[1]) return top.url
    return (top.subs && top.subs.find(itm => itm.keys.some(key => key === domains[1])) || {}).url
  }
}

module.exports = {
  list,
  ...controller
}