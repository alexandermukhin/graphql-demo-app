import { GraphQLID, GraphQLList, GraphQLNonNull } from 'graphql';

import * as types from '../types';
import * as DB from '../../db';

export const leagueQuery = {
    league : {
        type   : types.LeagueType,
        args   : { id: { type: new GraphQLNonNull(GraphQLID) } },
        resolve: (root, args) => DB.leagues.getOne(args.id)
    },
    leagues: {
        type   : new GraphQLList(types.LeagueType),
        resolve: (root, args) => DB.leagues.getList(null, args)
    }
};
