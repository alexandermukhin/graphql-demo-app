import {
    GraphQLID,
    GraphQLInt,
    GraphQLFloat,
    GraphQLString,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLObjectType,
    GraphQLInputObjectType
} from 'graphql';

import * as types   from './index';
import * as DB      from '../../db';

// Output
export const PlayerType = new GraphQLObjectType({
    name      : 'Player',
    interfaces: [types.HumanInterface],
    fields    : () => ({
        id      : { type: new GraphQLNonNull(GraphQLID) },
        name    : { type: new GraphQLNonNull(GraphQLString) },
        birthday: { type: GraphQLString },
        country : { type: new GraphQLNonNull(GraphQLString) },
        height  : { type: GraphQLFloat },
        captain : { type: new GraphQLNonNull(GraphQLBoolean) },
        position: { type: new GraphQLNonNull(types.PositionType) },
        number  : { type: new GraphQLNonNull(GraphQLInt) },
        team    : {
            type   : new GraphQLNonNull(types.TeamType),
            resolve: (player, args) => DB.teams.getOne(player.team)
        }
    })
});

// Input Create
export const PlayerInputCreateType = new GraphQLInputObjectType({
    name  : 'PlayerInputCreate',
    fields: {
        name    : { type: new GraphQLNonNull(GraphQLString) },
        birthday: { type: GraphQLString, defaultValue: '' },
        country : { type: new GraphQLNonNull(GraphQLString) },
        height  : { type: GraphQLFloat },
        captain : { type: GraphQLBoolean, defaultValue: false },
        position: { type: new GraphQLNonNull(types.PositionType) },
        number  : { type: new GraphQLNonNull(GraphQLInt) },
        team    : { type: new GraphQLNonNull(GraphQLInt) }
    }
});

// Input Update
export const PlayerInputUpdateType = new GraphQLInputObjectType({
    name  : 'PlayerInputUpdate',
    fields: {
        id      : { type: new GraphQLNonNull(GraphQLID) },
        name    : { type: GraphQLString },
        birthday: { type: GraphQLString, defaultValue: '' },
        country : { type: GraphQLString },
        height  : { type: GraphQLFloat },
        captain : { type: GraphQLBoolean, defaultValue: false },
        position: { type: types.PositionType },
        number  : { type: GraphQLInt },
        team    : { type: GraphQLInt }
    }
});