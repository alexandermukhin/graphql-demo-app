import { GraphQLID, GraphQLList, GraphQLNonNull } from 'graphql';

import * as types from '../types';
import * as DB from '../../db';

export const stadiumQuery = {
    stadium : {
        type   : types.StadiumType,
        args   : { id: { type: new GraphQLNonNull(GraphQLID) } },
        resolve: (root, args) => DB.stadiums.getOne(args.id)
    },
    stadiums: {
        type   : new GraphQLList(types.StadiumType),
        resolve: (root, args) => DB.stadiums.getList(null, args)
    }
};
