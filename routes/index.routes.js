const PATHS = require('./paths')
const tld = process.env.ENV_PROD ? '.com' : '.dev'
const BASES = [
  {
    name: 'self',
    url: 'joacoesteban' + tld
  },
  {
    name: 'songbasket',
    url: 'songbasket' + tld
  },
]

const reject = (res, status = 404) => {
  res.status(status).send('Not Found')
}

const redirect = async (res, domains) => {
  console.log('redirecting to => ', domains)
  const {url, cb} = await PATHS.get(domains)
  if (cb) return cb(res)
  if (url) return res.redirect(url)
  reject(res)
}

const getHost = (host, path) => {
  console.log('HOSTS_____', host)
  if (!host) return null
  let base = BASES.find(base => host.includes(base.url))
  if (!base) return null

  host = host.replace(base.url, '').split('.').filter(d => d.length).map(d => d.toLowerCase())
  if (!process.env.ENV_PROD) {
    host = host.filter(h => !h.includes(':')) // Cleans port if specified
  }
  !host.length && (host = ['@root'])
  let pathComponent
  pathComponent = path.split('/').filter(s => s)
  const subDomains = host.reverse()
  return {
    tld: base,
    subDomains,
    pathComponent: pathComponent.length ? pathComponent : null
  }
}

const handleReq = (req, res) => {
  const host = getHost(req.get('host'), req.url)
  console.log(host)
  if (!host || !host.subDomains.length) return reject(res)
  redirect(res, host)
}

module.exports = app => {
  app.get('*', handleReq)
}
