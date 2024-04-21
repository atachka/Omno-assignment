import Fastify, { FastifyInstance } from 'fastify';
import { paymentsRoutes } from './routes/index.js';

const fastify: FastifyInstance = Fastify({
  logger: true,
});

fastify.register(paymentsRoutes, { prefix: '/payments' });

try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
