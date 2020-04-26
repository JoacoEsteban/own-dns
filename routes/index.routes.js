const PATHS = require('./paths')
const BASE = 'joacoesteban.com'

const reject = (res, status = 404) => {
  res.status(status).send('Not Found')
}

const redirect = async (res, domains) => {
  console.log(domains)
  const url = await PATHS.get(domains)
  console.log(url)
  if (url) return res.redirect(url)
  reject(res)
}

const getHost = host => {
  if (!(host && host.includes(BASE))) return null

  host = host.replace(BASE, '').split('.').filter(d => d.length).map(d => d.toLowerCase())
  !host.length && (host = ['@root'])
  return host.reverse()
}

const handleReq = (req, res) => {
  const host = getHost(req.get('host'))
  if (!host || !host.length) return reject(res)
  redirect(res, host)
}

module.exports = app => {
  app.get('*', handleReq)
}
