const PATHS = require('./paths')

const reject = (res, status = 404) => {
  res.status(status).send('Not Found')
}

const redirect = async (res, slug) => {
  console.log(slug)
  const url = await PATHS.get(slug)
  if (url) return res.redirect(url)
  reject(res)
}

const getHost = host => {
  if (!(host && host.includes('joacoesteban.com'))) return null
  host = host.slice(0, host.indexOf('joacoesteban.com'))
  host[host.length - 1] === '.' && (host = host.substring(0, host.length - 1))
  return host === '' ? '@root' : host
}

const handleReq = (req, res) => {
  const host = getHost(req.get('host'))
  if (!host) return reject(res)
  redirect(res, host)
}

module.exports = app => {
  app.get('*', handleReq)
}
