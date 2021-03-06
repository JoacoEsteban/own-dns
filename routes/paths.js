const h = global.url = url => url.search(/https?:\/\//) === 0 ? url : 'https://' + url

const list = {
  self: [{
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
  ],
  songbasket: [{
      keys: ['download'],
      url: h('github.com/JoacoEsteban/SongBasket/releases/latest'),
      paths: require('./songbasket/downloads')
    }
  ]
}

const controller = {
  async get({tld, subDomains, pathComponent}) {
    const top = (list[tld.name].find(itm => itm.keys.some(key => key === subDomains[0])) || {})
    const sub = subDomains[1] ? (top.subs && top.subs.find(itm => itm.keys.some(key => key === subDomains[1])) || {}) : top
    if (pathComponent) {
      return (sub.paths || []).find(itm => itm.keys.some(key => key === pathComponent[0])) || sub
    }
    return {url: sub.url, cb: sub.cb}
  }
}

module.exports = {
  list,
  ...controller
}