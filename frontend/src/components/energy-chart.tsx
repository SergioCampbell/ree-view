import { useState } from 'react';
import { useQuery } from '@apollo/client';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { GET_ENERGY_DATA } from '../queries/energy-balance.query';
import { formatDate } from '../libs/date-formatter';
import { EnergyBalanceType, QueryVariables } from '../types/energy-balance.types';
import { processGenerationData } from '../libs/process-generation-data';
import { Demand } from './demanda';
import GenerationBreakdown from './generation-data';
import { InternationalExchanges } from './internation-exange';
import { StorageBalance } from './storage-balance';

export default function EnergyChart({
  startDate,
  endDate,
  type,
  groupId,
  groupType,
}: {
  startDate: string;
  endDate: string;
  type?: string | null;
  groupId?: string | null;
  groupType?: string | null;
}) {
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');

  const { loading, error, data, refetch } =
    useQuery<{ getEnergyBalances: EnergyBalanceType[] }, QueryVariables>(
      GET_ENERGY_DATA,
      {
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
        errorPolicy: 'all',
      }
    );

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (data === null)
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
        <pre>Error: {error?.message}</pre>
        <button
          onClick={() => refetch()}
          className="mt-2 bg-red-600 text-white py-1 px-3 rounded text-sm"
        >
          Retry
        </button>
      </div>
    );

  if (!data?.getEnergyBalances)
    return (
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">
        <p>No available data for the selected date range.{/*  */}</p>
      </div>
    );

  const generationData = processGenerationData(data.getEnergyBalances);
  const totalGeneration = generationData.totalNonRenewable + generationData.totalRenewable;

  return (
    <>
      <h1 className="text-2xl font-bold mb-4 text-white">Balance Eléctrico Nacional</h1>
      <div className="flex justify-end mb-2 text-white">Generación Total: {totalGeneration.toLocaleString()}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <GenerationBreakdown energyBalances={data.getEnergyBalances} />
        <div>
          {<InternationalExchanges internationalExchanges={data?.getInternationalExchanges || []} />}
      {<StorageBalance storageBalance={data?.getStorageBalance || []} />}
      {<Demand demand={data?.getDemand || []} />}
      </div>
      </div>
    </>
  );

  // return (
  //   <div className="energy-chart mt-6">
  //     <div className="mb-4">
  //       <button
  //         className={`py-2 px-4 rounded mr-2 ${chartType === 'bar' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
  //           }`}
  //         onClick={() => handleChartTypeChange('bar')}
  //       >
  //         Gráfica de Barras
  //       </button>
  //       <button
  //         className={`py-2 px-4 rounded ${chartType === 'line' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
  //           }`}
  //         onClick={() => handleChartTypeChange('line')}
  //       >
  //         Gráfica Lineal
  //       </button>
  //     </div>

  //     <ResponsiveContainer width="100%" height={400}>
  //       {chartType === 'bar' ? (
  //         <BarChart
  //           data={chartData}
  //           margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
  //           layout="vertical"
  //         >
  //           <YAxis dataKey="name" type="category" />
  //           <XAxis type="number" label={{ value: 'MW', position: 'bottom' }} />
  //           <Tooltip
  //             formatter={(value: number) => [`${value} MW`, 'Generación']}
  //             labelFormatter={(label) => `Fecha: ${label}`}
  //           />
  //           <Legend />
  //           <Bar dataKey="value" name="Generación" fill="#8884d8" />
  //         </BarChart>
  //       ) : (
  //         <LineChart
  //           data={chartData}
  //           margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
  //         >
  //           <XAxis
  //             dataKey="datetime"
  //             tickFormatter={(value) => formatDate(new Date(value))}
  //           />
  //           <YAxis label={{ value: 'MW', angle: -90, position: 'insideLeft' }} />
  //           <Tooltip
  //             formatter={(value: number) => [`${value} MW`, 'Generación']}
  //             labelFormatter={(label) => `Fecha: ${formatDate(new Date(label))}`}
  //           />
  //           <Legend />
  //           <Line
  //             type="monotone"
  //             dataKey="value"
  //             name="Generación"
  //             stroke="#8884d8"
  //             activeDot={{ r: 8 }}
  //           />
  //         </LineChart>
  //       )}
  //     </ResponsiveContainer>
  //   </div>
  // );
}