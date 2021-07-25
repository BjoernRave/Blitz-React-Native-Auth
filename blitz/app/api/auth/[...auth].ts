import { passportAuth } from "blitz"
import db from "db"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import { Strategy as TwitterStrategy } from "passport-twitter"

export default passportAuth({
  successRedirectUrl: "/dashboard",
  errorRedirectUrl: "/",
  secureProxy: true,
  strategies: [
    {
      strategy: new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/google/callback`,
          scope: ["email"],
        },
        async function (_token, _tokenSecret, profile, done) {
          const email = profile.emails && profile.emails[0]?.value

          if (!email) {
            return done(new Error("Google OAuth response doesn't have email."))
          }

          const user = await db.user.upsert({
            where: { email },
            create: {
              email,
              name: profile.displayName,
            },
            update: { email },
          })

          const publicData = {
            userId: user.id,
            roles: [user.role],
            source: "google",
          }
          done(null, { publicData })
        }
      ),
    },
    {
      strategy: new TwitterStrategy(
        {
          consumerKey: process.env.TWITTER_CONSUMER_KEY,
          consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
          callbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/twitter/callback`,
          includeEmail: true,
        },
        async function (_token, _tokenSecret, profile, done) {
          const email = profile.emails && profile.emails[0]?.value
          if (!email) {
            // This can happen if you haven't enabled email access in your twitter app permissions
            return done(new Error("Twitter OAuth response doesn't have email."))
          }

          const user = await db.user.upsert({
            where: { email },
            create: {
              email,
              name: profile.displayName,
            },
            update: { email },
          })

          const publicData = {
            userId: user.id,
            roles: [user.role],
            source: "twitter",
          }
          done(null, { publicData })
        }
      ),
    },
  ],
})
