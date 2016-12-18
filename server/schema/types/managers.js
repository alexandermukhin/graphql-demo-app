import {
    GraphQLID,
    GraphQLFloat,
    GraphQLString,
    GraphQLNonNull,
    GraphQLObjectType
} from 'graphql';

import * as types   from './index';
import * as DB      from '../../db';

// Output
export const ManagerType = new GraphQLObjectType({
    name  : 'Manager',
    interfaces: [types.HumanInterface],
    fields: () => ({
        id      : { type: new GraphQLNonNull(GraphQLID) },
        name    : { type: new GraphQLNonNull(GraphQLString) },
        birthday: { type: GraphQLString },
        country : { type: new GraphQLNonNull(GraphQLString) },
        height  : { type: GraphQLFloat },
        team    : {
            type   : new GraphQLNonNull(types.TeamType),
            resolve: (manager, args) => DB.teams.getOne(manager.team)
        }
    })
});
