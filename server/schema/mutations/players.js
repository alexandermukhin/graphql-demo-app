import { GraphQLID, GraphQLNonNull } from 'graphql';

import { PlayerType, PlayerInputCreateType, PlayerInputUpdateType } from '../types';
import * as DB from '../../db';

export const playerMutation = {
    addPlayer   : {
        type: PlayerType,
        args: { player: { type: new GraphQLNonNull(PlayerInputCreateType) } },
        resolve: (player, args) => DB.players.add(player, args)
    },
    updatePlayer: {
        type: PlayerType,
        args: { player: { type: new GraphQLNonNull(PlayerInputUpdateType) } },
        resolve: (player, args) => DB.players.update(player, args)
    },
    removePlayer: {
        type: PlayerType,
        args: { id: { type: new GraphQLNonNull(GraphQLID) } },
        resolve: (player, args) => DB.players.remove(player, args)
    }
};
