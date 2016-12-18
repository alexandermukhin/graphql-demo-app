import { GraphQLList, GraphQLString, GraphQLNonNull } from 'graphql';
import union from 'lodash/union'
import { leagueQuery } from './leagues';
import { teamQuery } from './teams';
import { stadiumQuery } from './stadiums';
import { playerQuery } from './players';
import { managerQuery } from './managers';

import * as types from '../types';
import * as DB from '../../db';

const searchQuery = {
    search: {
        type   : new GraphQLList(types.SearchType),
        args   : { name: { type: new GraphQLNonNull(GraphQLString) } },
        resolve: (root, args) => union(DB.teams.findByName(args.name), DB.players.findByName(args.name), DB.managers.findByName(args.name))
    }
};

export default Object.assign(searchQuery, leagueQuery, teamQuery, stadiumQuery, playerQuery, managerQuery);
