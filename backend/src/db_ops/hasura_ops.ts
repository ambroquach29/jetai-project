const JET_FIELDS = `
  id
  name
  wingspan
  numberOfEngines
  manufacturingYear
  createdAt
  updatedAt
`;

export const GET_ALL_JETS = `
query GetAllJets {
  Jet {
    ${JET_FIELDS}
  }
}
`;

export const GET_JET_BY_ID = `
query GetJetById($id: Int!) {
  Jet(where: {id: {_eq: $id}}) {
    ${JET_FIELDS}
  }
}
`;

export const INSERT_JET = `
mutation InsertJet($input: Jet_insert_input!) {
  insert_Jet_one(object: $input) {
    ${JET_FIELDS}
  }
}
`;

export const INSERT_JETS = `
mutation InsertJets($objects: [Jet_insert_input!]!) {
  insert_Jet(objects: $objects) {
    returning {
      ${JET_FIELDS}
    }
  }
}
`;

export const UPDATE_JET_BY_ID = `
mutation UpdateJetById($id: Int!, $changes: Jet_set_input!) {
  update_Jet(
    where: {id: {_eq: $id}},
    _set: $changes) {
    returning {
      ${JET_FIELDS}
    }
  }
}
`;

export const DELETE_JET_BY_ID = `
mutation DeleteJetById($id: Int!) {
  delete_Jet(where: {id: {_eq: $id}}) {
    returning {
      ${JET_FIELDS}
    }
  }
}

`;
