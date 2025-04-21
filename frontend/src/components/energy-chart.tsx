// frontend/src/components/EnergyChart.jsx
import { useQuery } from '@apollo/client';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { GET_ENERGY_DATA } from '../queries';

export default function EnergyChart({ startDate, endDate, type }) {
  const { loading, error, data } = useQuery(GET_ENERGY_DATA, {
    variables: { startDate, endDate, type },
  });

  if (loading) return <div className="loading">Cargando...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  return (
    <LineChart width={800} height={400} data={data.energyBalances}>
      <XAxis dataKey="datetime" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
    </LineChart>
  );
};