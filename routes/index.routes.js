const PATHS = require('./paths')
const BASES = [
  {
    name: 'self',
    url: 'joacoesteban.com'
  },
  {
    name: 'songbasket',
    url: 'songbasket.com'
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

const getHost = host => {
  console.log('HOSTS_____', host)
  if (!host) return null
  let base = BASES.find(base => host.includes(base.url))
  if (!base) return null

  host = host.replace(base.url, '').split('.').filter(d => d.length).map(d => d.toLowerCase())
  !host.length && (host = ['@root'])
  let pathComponent
  if (host[host.length - 1].includes('/')) {
    pathComponent = host.pop().split('/').filter(s => s)
  }
  const subDomains = host.reverse()
  return {
    tld: base,
    subDomains,
    pathComponent
  }
}

const handleReq = (req, res) => {
  const host = getHost(req.get('host'))
  console.log(host)
  if (!host || !host.subDomains.length) return reject(res)
  redirect(res, host)
}

module.exports = app => {
  app.get('*', handleReq)
}
