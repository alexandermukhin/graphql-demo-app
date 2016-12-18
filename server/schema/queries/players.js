import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLBoolean } from 'graphql';

import * as types from '../types';
import * as DB from '../../db';

export const playerQuery = {
    player : {
        type   : types.PlayerType,
        args   : { id: { type: new GraphQLNonNull(GraphQLID) } },
        resolve: (root, args) => DB.players.getOne(args.id)
    },
    players: {
        type   : new GraphQLList(types.PlayerType),
        args   : { captain: { type: GraphQLBoolean } },
        resolve: (root, args) => DB.players.getList(null, args)
    }
};
