const PATHS = require('./paths')

const reject = (res, status = 404) => {
  res.status(status).send()
}

const redirect = async (res, slug) => {
  const url = await PATHS.get(slug)
  console.log(url)
  if (url) return res.redirect(url)
  reject(res)
}

const handleReq = (req, res) => {
  const host = req.get('host')
  console.log('HOST:', host)
  if (!host.includes('joacoesteban.com')) return reject(res)
  return redirect(res, host.slice(0, host.indexOf('.')))
}

module.exports = app => {
  app.get('*', handleReq)
}
