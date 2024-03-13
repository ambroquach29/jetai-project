import { query, mutate } from './graphql';
import * as gql_strings from './hasura_ops';
import dotenv from 'dotenv';
import { GraphQLError } from 'graphql';
dotenv.config();

/***********************************
    CRUD operations for JETS
************************************/

/** This function returns a list of all Jets. */
export const getAllJets = async () => {
  const result = await query(gql_strings.GET_ALL_JETS);
  return result.data.Jet;
};

/** This function returns a Jet by its ID. */
export const getJetById = async (id: number) => {
  const result = await query(gql_strings.GET_JET_BY_ID, { id: id });
  return result.data.Jet[0];
};

/** This function inserts a new Jet into the database. */
export const insertJet = async (args: any) => {
  const result = await mutate(gql_strings.INSERT_JET, {
    input: {
      name: args.name,
      wingspan: args.wingspan,
      numberOfEngines: args.numberOfEngines,
      manufacturingYear: args.manufacturingYear,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  return result.data.insert_Jet_one;
};

/** This function updates an existing Jet in the database. */
export const updateJetById = async (args: any) => {
  console.log(args);
  const result = await mutate(gql_strings.UPDATE_JET_BY_ID, {
    id: args.id,
    changes: {
      name: args.name,
      wingspan: args.wingspan,
      numberOfEngines: args.numberOfEngines,
      manufacturingYear: args.manufacturingYear,
      updatedAt: new Date(),
    },
  });
  return result.data.update_Jet.returning[0];
};

/** This function deletes an existing Jet from the database. */
export const deleteJetById = async ({ id }: any) => {
  const result = await mutate(gql_strings.DELETE_JET_BY_ID, { id: id });
  return result.data.delete_Jet.returning[0];
};
