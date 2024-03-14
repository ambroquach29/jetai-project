'use client';
import React, { useEffect, useState } from 'react';
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  gql,
  useQuery,
  useLazyQuery,
} from '@apollo/client';

// HTTP connection to the GraphQL API
const httpLink = new HttpLink({
  uri: 'http://localhost:5000/graphql', // Your GraphQL endpoint
});

// Create a custom ApolloLink middleware to set the authorization header
const authMiddleware = new ApolloLink((operation, forward) => {
  // Use operation.setContext to modify the headers of the request
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: 'apollo-starter-kit', // Set your authorization token here
    },
  }));

  return forward(operation);
});

// Combine the authMiddleware with the httpLink
const link = ApolloLink.from([authMiddleware, httpLink]);

// Create the ApolloClient instance
const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

const GET_ALL_JETS = gql`
  query JetsQuery {
    GetAllJets {
      id
      name
      wingspan
      numberOfEngines
      manufacturingYear
      createdAt
      updatedAt
    }
  }
`;

const JetTable = () => {
  // const { loading, error, data } = useQuery(GET_ALL_JETS, { client });

  // if (loading) return <p>Loading...</p>;
  // if (error) {
  //   console.error('GraphQL Query Error:', error);
  //   return <p>Error :(</p>;
  // }
  // if (!data) return null;

  const [jets, setJets] = useState([]);
  const [getJets, { called, loading, data, error }] = useLazyQuery(
    GET_ALL_JETS,
    {
      client,
      onCompleted: (data) => {
        // Update state when query completes
        setJets(data.GetAllJets);
      },
    }
  );

  useEffect(() => {
    getJets(); // Execute the query when the component mounts
  }, [getJets]); // Ensure the query is executed only once on component mount

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="container mx-auto">
      <h1 className="text-xl font-bold mb-4">Top 10 Charter Jets</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Select
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Wingspan
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Number of Engines
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Manufacturing Year
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created At
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Updated At
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {jets.map((jet: any) => (
            <tr key={jet.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <input type="checkbox" className="rounded" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{jet.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{jet.wingspan}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {jet.numberOfEngines}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {jet.manufacturingYear}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{jet.createdAt}</td>
              <td className="px-6 py-4 whitespace-nowrap">{jet.updatedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function Home() {
  return (
    <main>
      <JetTable />
    </main>
  );
}
