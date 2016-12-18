import { GraphQLID, GraphQLList, GraphQLNonNull } from 'graphql';

import * as types from '../types';
import * as DB from '../../db';

export const teamQuery = {
    team : {
        type   : types.TeamType,
        args   : { id: { type: new GraphQLNonNull(GraphQLID) } },
        resolve: (root, args) => DB.teams.getOne(args.id)
    },
    teams: {
        type   : new GraphQLList(types.TeamType),
        resolve: (root, args) => DB.teams.getList(null, args)
    }
};
