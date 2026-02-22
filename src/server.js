require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const connectDB = require("./config/db");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const startServer = async () => {
    const app = express();
    connectDB();

    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    server.applyMiddleware({ app });

    app.listen(process.env.PORT, () =>
        console.log(`Server running on http://localhost:${process.env.PORT}${server.graphqlPath}`)
    );
};

startServer();