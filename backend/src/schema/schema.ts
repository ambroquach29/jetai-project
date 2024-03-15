import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    GetAllJets: [Jet]
    GetJetById(id: ID!): Jet
  }

  type Mutation {
    InsertJet(
      name: String
      wingspan: Float
      numberOfEngines: Int
      manufacturingYear: Int
    ): Jet

    UpdateJet(
      id: ID!
      name: String
      wingspan: Float
      numberOfEngines: Int
      manufacturingYear: Int
    ): Jet

    DeleteJet(id: ID!): Jet
  }

  type Jet {
    id: ID!
    name: String
    wingspan: Float
    numberOfEngines: Int
    manufacturingYear: Int
    createdAt: DateTime
    updatedAt: DateTime
  }

  scalar DateTime
`;
