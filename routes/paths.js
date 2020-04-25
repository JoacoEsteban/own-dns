const h = url => url.indexOf('https://') === 0 ? url : 'https://' + url

const list = {
  spotify: h('open.spotify.com/user/joaqo.esteban'),
  instagram: h('instagram.com/joa.qo'),
  github: h('github.com/joacoesteban'),
  linkedin: h('linkedin.com/in/joaquin-esteban-627ab6183/'),
  contact: 'mailto:me@joacoesteban.com'
}

const controller = {
  async get (slug) {
    return list[slug]
  }
}

module.exports = {
  list,
  ...controller
}