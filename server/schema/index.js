import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import queries from './queries';
import mutations from './mutations';

// Query
const rootQuery = new GraphQLObjectType({
    name  : 'Query',
    fields: queries
});

// Mutation
 const rootMutation = new GraphQLObjectType({
     name: 'Mutation',
     fields: mutations
 });

// Schema
export const schema = new GraphQLSchema({
    query: rootQuery,
    mutation: rootMutation
});
