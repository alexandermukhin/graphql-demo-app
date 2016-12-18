import {
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLString,
    GraphQLNonNull,
    GraphQLObjectType
} from 'graphql';

import * as types   from './index';
import * as DB      from '../../db';

// Output
export const LeagueType = new GraphQLObjectType({
    name  : 'League',
    fields: () => ({
        id          : { type: new GraphQLNonNull(GraphQLID) },
        name        : { type: new GraphQLNonNull(GraphQLString) },
        founded     : { type: new GraphQLNonNull(GraphQLInt) },
        country     : { type: new GraphQLNonNull(GraphQLString) },
        descriptions: { type: GraphQLString },
        teams       : {
            type   : new GraphQLList(types.TeamType),
            resolve: (league, args) => DB.teams.getList(league.teams)
        }
    })
});
