import { GraphQLUnionType } from 'graphql';
import * as types   from './index';

// Search
export const SearchType = new GraphQLUnionType({
    name : 'Search',
    types: [types.TeamType, types.PlayerType, types.ManagerType],
    resolveType: obj => obj.shirt ? types.TeamType : obj.number ? types.PlayerType : types.ManagerType
});
