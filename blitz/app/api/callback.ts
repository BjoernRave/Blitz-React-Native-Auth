import { BlitzApiRequest, BlitzApiResponse } from "blitz"

export default async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  console.log("req.query.redirectUrl", req.query)
  console.log("cookies", req.headers.cookie)
  res.redirect(
    `${req.query.redirectUrl}?cookies=${encodeURIComponent(req.headers.cookie as string)}`
  )
}
