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
  uri: 'http://localhost:5000/graphql',
});

// Create a custom ApolloLink middleware to set the authorization header
const authMiddleware = new ApolloLink((operation, forward) => {
  // Use operation.setContext to modify the headers of the request
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: 'apollo-starter-kit',
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
    }
  }
`;

export default function Home() {
  const [selectedJets, setSelectedJets] = useState([]);
  return (
    <main>
      <JetTable selectedJets={selectedJets} setSelectedJets={setSelectedJets} />
      <CompareJets
        selectedJets={selectedJets}
        setSelectedJets={setSelectedJets}
      />
    </main>
  );
}

const JetTable = ({ selectedJets, setSelectedJets }) => {
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

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    jetId: number
  ) => {
    if (e.target.checked) {
      // Add jet ID to the selectedJets array if it's not already included
      setSelectedJets((prevSelected) => [...prevSelected, jetId]);
    } else {
      // Remove the jet ID from the selectedJets array
      setSelectedJets((prevSelected) =>
        prevSelected.filter((id) => id !== jetId)
      );
    }
  };

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
              Id
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
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {jets.map((jet: any) => (
            <tr key={jet.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  className="rounded"
                  checked={selectedJets.some(
                    (selectedJet) => selectedJet.id === jet.id
                  )}
                  onChange={(e) => handleCheckboxChange(e, jet)}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{jet.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{jet.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{jet.wingspan}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {jet.numberOfEngines}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {jet.manufacturingYear}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const CompareJets = ({ selectedJets, setSelectedJets }) => {
  const [comparisonCategory, setComparisonCategory] = useState('top_speed');
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCompare = async () => {
    setLoading(true);
    try {
      // Assuming selectedJets is available in this scope
      const response = await fetch('http://localhost:8000/api/compare_jets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comparisonCategory,
          jets: selectedJets,
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setRankings(data);
    } catch (error) {
      console.error('Failed to compare jets:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Ask OpenAI to Compare Selected Jets By:{' '}
      </h1>
      <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
        <select
          className="block w-full md:w-auto px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          value={comparisonCategory}
          onChange={(e) => setComparisonCategory(e.target.value)}
        >
          <option value="top_speed">Top Speed (mph)</option>
          <option value="fuel_efficiency">Fuel Efficiency (mpg)</option>
          <option value="maximum_seats">Maximum Seats</option>
        </select>
        <button
          className={`px-4 py-2 font-semibold text-white bg-blue-500 rounded-md ${
            loading ? 'bg-blue-300' : 'hover:bg-blue-700'
          } focus:outline-none disabled:opacity-50`}
          onClick={handleCompare}
          disabled={loading}
        >
          {loading ? 'Comparing...' : 'Compare Selected Jets'}
        </button>
      </div>
      {rankings?.length > 0 && (
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {rankings.map((ranking, index) => (
              <tr key={index}>
                <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                  {ranking.Rank}
                </td>
                <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                  {ranking.Name}
                </td>
                <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                  {ranking.Value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
