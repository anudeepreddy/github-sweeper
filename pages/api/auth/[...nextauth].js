import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { apiResolver } from 'next/dist/next-server/server/api-utils';

const options = {
  providers: [
    {
      id: 'github',
      name: 'GitHub',
      type: 'oauth',
      version: '2.0',
      scope: 'user repo',
      accessTokenUrl: 'https://github.com/login/oauth/access_token',
      authorizationUrl: 'https://github.com/login/oauth/authorize',
      profileUrl: 'https://api.github.com/user',
      profile: (profile) => {
        return {
          id: profile.id,
          username: profile.login,
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,

        }
      },
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET
    }
  ],
  session: { jwt: true },
  database: process.env.MONGO_URI,
}

export default (req, res) => NextAuth(req, res, options)