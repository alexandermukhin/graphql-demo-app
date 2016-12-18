import {
    GraphQLEnumType
} from 'graphql';

// Enum
export const PositionType = new GraphQLEnumType({
    name  : 'Position',
    values: {
        GK: {},
        DF: {},
        MF: {},
        FW: {}
    }
});
