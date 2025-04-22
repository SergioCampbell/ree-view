import { QueryResult, useQuery } from '@apollo/client';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { GET_ENERGY_DATA } from '../queries/energy-balance.query';
import { formatDate } from '../libs/date-formatter';
import { EnergyBalanceType, QueryVariables } from '../types/energy-balance.types';

export default function EnergyChart({
  startDate,
  endDate,
  type,
  groupId,
  groupType
}: {
  startDate: string;
  endDate: string;
  type?: string | null;
  groupId?: string | null;
  groupType?: string | null;
}) {

  const { loading, error, data, refetch } =
    useQuery<QueryResult<EnergyBalanceType, QueryVariables>>(GET_ENERGY_DATA, {
      variables: {
        input: {
          startDate,
          endDate,
          ...(groupId && { groupId }),
          ...(type && { type }),
          ...(groupType && { groupType }),
        },
      },
      onError: (error) => {
        console.error('GraphQL Error:', error);
      },
      errorPolicy: 'all'
    });
  console.log({ data })
  console.log({ error })

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
    </div>
  );

  if (data === null) return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
      <p>Error: {error?.message}</p>
      <button
        onClick={() => refetch()}
        className="mt-2 bg-red-600 text-white py-1 px-3 rounded text-sm"
      >
        Retry
      </button>
    </div>
  );

  if (!data || !data.data) return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">
      <p>No available data for the selected date range.</p>
    </div>
  );

  const chartData = data?.energyBalances?.map((item: EnergyBalanceType) => ({
    ...item,
    datetime: formatDate(new Date(item.datetime)),
    [item.type]: item.value,
  })) || [];

  return (
    <div className="energy-chart mt-6">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis
            dataKey="datetime"
            tickFormatter={(value) => formatDate(new Date(value))}
          />
          <YAxis label={{ value: 'MW', angle: -90, position: 'insideLeft' }} />
          <Tooltip
            formatter={(value: number) => [`${value} MW`, 'Generation']}
            labelFormatter={(label) => `Fecha: ${formatDate(new Date(label))}`}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            name="Generación"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}