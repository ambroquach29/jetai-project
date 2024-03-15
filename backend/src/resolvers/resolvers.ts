import { GraphQLScalarType, Kind } from 'graphql';
import * as db_ops from '../db_ops/jet_queries_mutations';

const dateTimeScalar = new GraphQLScalarType({
  name: 'DateTime',
  description: 'A date-time string in ISO 8601 format',
  serialize(value) {
    if (value instanceof Date) {
      // Convert Date to ISO 8601 string
      return value.toISOString();
    } else if (typeof value === 'string') {
      // Assume it's already in ISO 8601 format or other desired string format
      return value;
    }
    throw new Error(
      'DateTime Scalar serializer expected a `Date` object or valid date string'
    );
  },
  parseValue(value) {
    if (typeof value === 'number') {
      // Convert numeric timestamp to Date object
      return new Date(value);
    } else if (typeof value === 'string') {
      // Convert string to Date object
      return new Date(value);
    }
    throw new Error(
      'DateTime Scalar parser expected a `number` or valid date string'
    );
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      // Convert integer literal to Date
      return new Date(parseInt(ast.value, 10));
    } else if (ast.kind === Kind.STRING) {
      // Convert string literal to Date
      return new Date(ast.value);
    }
    return null;
  },
});

export const resolvers = {
  Query: {
    GetJetById: async (_: any, { id }: any) => {
      const resolved = await db_ops.getJetById(id);
      return resolved;
    },

    GetAllJets: async (_: any, args: any) => {
      const resolved = await db_ops.getAllJets();
      return resolved;
    },
  },

  Mutation: {
    InsertJet: async (_: any, args: any) => {
      const resolved = await db_ops.insertJet(args);
      return resolved;
    },
    InsertJets: async (_: any, args: any) => {
      const resolved = await db_ops.insertJets();
      return resolved;
    },
    UpdateJet: async (_: any, args: any) => {
      const resolved = await db_ops.updateJetById(args);
      console.log(resolved);
      return resolved;
    },
    DeleteJet: async (_: any, args: any) => {
      const resolved = await db_ops.deleteJetById(args);
      return resolved;
    },
  },

  DateTime: dateTimeScalar,
};
