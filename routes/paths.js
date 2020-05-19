const h = global.url = url => url.search(/https?:\/\//) === 0 ? url : 'https://' + url

const list = {
  'self': [{
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
      url: h('https://doc-00-2g-docs.googleusercontent.com/docs/securesc/de1so4a2bh94jr1qnndqtgpfha3efous/i58m60r2e6r63qrgk4hf7lbi14jnms9j/1589862750000/04924979768647543851/08279115034598829155Z/1Uqpx6CfshOTYMa1_VFeSLcfY0yl-HwBB?e=download&nonce=7q4q4ai30nllq&user=08279115034598829155Z&hash=t7o0teosd0fbrrvch1jfjf3r6jj6ll2i')
    }
  ]
}

const controller = {
  async get({tld, subDomains}) {
    const top = (list[tld.name].find(itm => itm.keys.some(key => key === subDomains[0])) || {})
    if (!subDomains[1]) return {url: top.url, cb: top.cb}
    const sub = (top.subs && top.subs.find(itm => itm.keys.some(key => key === subDomains[1])) || {})
    return {url: sub.url, cb: sub.cb}
  }
}

module.exports = {
  list,
  ...controller
}