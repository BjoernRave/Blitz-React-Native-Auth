import { BlitzConfig, sessionMiddleware, simpleRolesIsAuthorized } from "blitz"

const cookieMiddleware = (req, res, next) => {
  if (req.body.cookie) {
    req.headers.cookie = req.body.cookie
    delete req.body.cookie
  }

  return next()
}

const config: BlitzConfig = {
  middleware: [
    sessionMiddleware({
      cookiePrefix: "blitz",
      isAuthorized: simpleRolesIsAuthorized,
    }),
    cookieMiddleware,
  ],
  /* Uncomment this to customize the webpack config
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    return config
  },
  */
}
module.exports = config
