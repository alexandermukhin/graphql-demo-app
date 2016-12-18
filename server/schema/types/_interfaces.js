import {
    GraphQLID,
    GraphQLFloat,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInterfaceType
} from 'graphql';

import * as types   from './index';

// Interface
export const HumanInterface = new GraphQLInterfaceType({
    name       : 'Human',
    fields     : () => ({
        id      : { type: new GraphQLNonNull(GraphQLID) },
        name    : { type: new GraphQLNonNull(GraphQLString) },
        birthday: { type: GraphQLString },
        country : { type: new GraphQLNonNull(GraphQLString) },
        height  : { type: GraphQLFloat }
    }),
    resolveType: obj => obj.number ? types.PlayerType : types.ManagerType
});
