import { GraphQLID, GraphQLList, GraphQLNonNull } from 'graphql';

import * as types from '../types';
import * as DB from '../../db';

export const managerQuery = {
    manager : {
        type   : types.ManagerType,
        args   : { id: { type: new GraphQLNonNull(GraphQLID) } },
        resolve: (root, args) => DB.managers.getOne(args.id)
    },
    managers: {
        type   : new GraphQLList(types.ManagerType),
        resolve: (root, args) => DB.managers.getList(null, args)
    }
};
