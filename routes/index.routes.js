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
  if (!host) return null
  let base = BASES.find(base => host.includes(base))
  if (!base) return null

  host = host.replace(base.url, '').split('.').filter(d => d.length).map(d => d.toLowerCase())
  !host.length && (host = ['@root'])
  return {
    tld,
    subDomains: host.reverse()
  }
}

const handleReq = (req, res) => {
  const host = getHost(req.get('host'))
  if (!host || !host.subDomains.length) return reject(res)
  redirect(res, host)
}

module.exports = app => {
  app.get('*', handleReq)
}
