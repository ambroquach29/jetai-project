"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const schema_1 = require("./schema");
function startApolloServer(typeDefs, resolvers) {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        const server = new apollo_server_express_1.ApolloServer({ typeDefs, resolvers });
        yield server.start();
        server.applyMiddleware({ app });
        const PORT = 4000;
        app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}${server.graphqlPath}`));
    });
}
startApolloServer(schema_1.typeDefs, schema_1.resolvers);
