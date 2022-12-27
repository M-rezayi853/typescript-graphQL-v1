// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()
import express, { Application } from 'express'
import { ApolloServer } from 'apollo-server-express'

import { typeDefs, resolvers } from './graphql'
import { connectDatabase } from './database'

async function startApolloServer(app: Application) {
  const db = await connectDatabase()
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ db }),
  })

  await server.start()

  server.applyMiddleware({
    app,
    path: '/api',
  })

  app.listen(process.env.PORT)

  console.log(`[app]: http://localhost:${process.env.PORT}`)
}

startApolloServer(express())
