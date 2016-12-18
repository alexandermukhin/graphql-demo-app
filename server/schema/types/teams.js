import {
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLString,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLObjectType
} from 'graphql';
import union from 'lodash/union';

import * as types   from './index';
import * as DB      from '../../db';

// Output
export const TeamType = new GraphQLObjectType({
    name  : 'Team',
    fields: () => ({
        id     : { type: GraphQLID },
        name   : { type: new GraphQLNonNull(GraphQLString) },
        founded: { type: new GraphQLNonNull(GraphQLInt) },
        shirt  : { type: new GraphQLNonNull(GraphQLString) },
        city   : { type: new GraphQLNonNull(GraphQLString) },
        league : {
            type   : new GraphQLNonNull(types.LeagueType),
            resolve: (team, args) => DB.leagues.getOne(team.league)
        },
        stadium: {
            type   : new GraphQLNonNull(types.StadiumType),
            resolve: (team, args) => DB.stadiums.getOne(team.stadium)
        },
        manager: {
            type   : new GraphQLNonNull(types.ManagerType),
            resolve: (team, args) => DB.managers.getOne(team.manager)
        },
        players: {
            type   : new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(types.PlayerType))),
            args   : { captain: { type: GraphQLBoolean } },
            resolve: (team, args) => DB.players.getList(team.players, args)
        },
        staff: {
            type   : new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(types.HumanInterface))),
            resolve: (team, args) => union(DB.players.getList(team.players, args), [DB.managers.getOne(team.manager)])
        }
    })
});
