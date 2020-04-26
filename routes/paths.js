const h = url => url.indexOf('https://') === 0 ? url : 'https://' + url

const list = [{
    keys: ['spotify', 'spoti', '@root'],
    url: h('open.spotify.com/user/joaqo.esteban'),
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
  async get(slug) {
    return (list.find(itm => itm.keys.some(key => key === slug)) || {}).url
  }
}

module.exports = {
  list,
  ...controller
}