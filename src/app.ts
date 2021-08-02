import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { UserResolver, CategoryResolver, RecipeResolver, IngredientResolver } from './resolvers';
import { buildSchema } from 'type-graphql';

const server = async () => {
    const app = express();
    const server = new ApolloServer({
        schema: await buildSchema({
            resolvers: [ UserResolver, IngredientResolver, RecipeResolver, CategoryResolver ],
            validate: false,
        }),
        context: ({req, res}) => ({ req, res })
    });
    await server.start();
    server.applyMiddleware({ app, path: '/api' });
    return app
}

export default server;
