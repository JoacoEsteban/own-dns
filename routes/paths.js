const h = global.url = url => url.search(/https?:\/\//) === 0 ? url : 'https://' + url

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
    keys: ['mixcloud'],
    url: h('mixcloud.com/iknowus'),
  },
  {
    keys: ['soundcloud'],
    url: h('soundcloud.com/iknowus'),
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
    keys: ['steam'],
    url: h('steamcommunity.com/id/whimahwhe/'),
  },
  {
    keys: ['contact', 'mail', 'email'],
    url: 'mailto:me@joacoesteban.com'
  },
  {
    keys: ['boxes'],
    cb: (res) => {
      res.sendFile(process.cwd() + '/public/color-boxes.html')
    }
  },
]

const controller = {
  async get(domains) {
    const top = (list.find(itm => itm.keys.some(key => key === domains[0])) || {})
    if (!domains[1]) return {url: top.url, cb: top.cb}
    const sub = (top.subs && top.subs.find(itm => itm.keys.some(key => key === domains[1])) || {})
    return {url: sub.url, cb: sub.cb}
  }
}

module.exports = {
  list,
  ...controller
}