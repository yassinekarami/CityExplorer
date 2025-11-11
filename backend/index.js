// ESM
import Fastify  from 'fastify'
import { filterRestaurantsRoute, getRestaurantsRoute } from './route/restaurant.route.js'
import { registerRoute, loginRoute } from './route/auth.route.js';

import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastifyMiddie from '@fastify/middie';
import { checkJWT } from './middleware/security.js';

import dotenv from 'dotenv'
import { postFavoriteRoute, deleteFavoriteRoute, getFavoritesRoute } from './route/favorite.route.js';
import mongoose from 'mongoose';

dotenv.config({ path: './.env' })

async function build() {
  const fastify = Fastify({ logger: false });
  await fastify.register(fastifyMiddie);

  await fastify.register(
    fastifySwagger, {
      openapi: {
        openapi: '3.0.0',
        info: {
          title: 'Test swagger',
          description: 'Testing the Fastify swagger API',
          version: '0.1.0'
        },
        servers: [
          {
            url: 'http://localhost:3000',
            description: 'Development server'
          }

        ]
      }
    }
  );
    await fastify.register(
    fastifySwaggerUi, {
      routePrefix: '/documentation',
      uiConfig: {
        docExpansion: 'full',
        deepLinking: false
      }
    }
  );


  await fastify.register(async function(app) {
    app.route(getRestaurantsRoute)
    app.route(filterRestaurantsRoute)
  }, { prefix: '/api/restaurants' });

  await fastify.register(async function(app) {

      app.route(postFavoriteRoute)
      app.route(getFavoritesRoute)
      app.route(deleteFavoriteRoute)

  }, { prefix: '/api/favorite' });


  await fastify.register(async function(app) {
    app.route(loginRoute)
    app.route(registerRoute)
  }, { prefix: '/api/auth' });



  fastify.setNotFoundHandler((req, reply) => {
  console.error('404 Not Found:', req.method, req.url);
  reply.status(404).send({
    error: 'Not Found',
    method: req.method,
    url: req.url
  });
});

  return fastify
}

;(async () => {
  const fastify = await build()
  await fastify.listen({ host: 'localhost', port: 3000 })
  console.log('🚀 Server running at http://localhost:3000')
  console.log(fastify.printRoutes()) // optional: to verify all routes
})()





async function run() {
  try {
   
    await mongoose.connect(process.env.MONGO_URI)
  
    console.log("connected to mongoAtlas !!!!")
  
  } finally {
    // Ensures that the client will close when you finish/error
   
  }
}
run().catch(console.dir);


