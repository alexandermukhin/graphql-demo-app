import {
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLFloat,
    GraphQLString,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLObjectType
} from 'graphql';

import * as types   from './index';
import * as DB      from '../../db';

// Output
export const StadiumType = new GraphQLObjectType({
    name  : 'Stadium',
    fields: () => ({
        id            : { type: GraphQLID },
        name          : { type: new GraphQLNonNull(GraphQLString) },
        opened        : { type: new GraphQLNonNull(GraphQLInt) },
        capacity      : { type: new GraphQLNonNull(GraphQLFloat) },
        runningTrack  : { type: new GraphQLNonNull(GraphQLBoolean) },
        classification: { type: GraphQLInt },
        teams         : {
            type   : new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(types.TeamType))),
            resolve: (stadium, args) => DB.teams.getList(stadium.teams)
        }
    })
});