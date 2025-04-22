import { useState } from 'react';
import DataSelector from './components/data-selector';
import EnergyChart from './components/energy-chart';
import { formatDate } from './libs/date-formatter';

export default function App() {
  const [filters, setFilters] = useState({
    startDate: formatDate(new Date()),
    endDate: formatDate(new Date()),
    type: '',
    groupId: ''
  });

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="global">
      <div className="dashboard container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6 text-white">Energy monitoring REE</h1>

        <DataSelector
          onDateChange={({ start, end }) => handleFilterChange({ startDate: start, endDate: end })}
          onGroupChange={(groupId) => handleFilterChange({ groupId })}
          onTypeChange={(type) => handleFilterChange({ type })}
        />

        <div className="mt-8">
          <EnergyChart
            startDate={filters.startDate}
            endDate={filters.endDate}
            type={filters.type}
            groupId={filters.groupId}
          />
        </div>
      </div>
    </div>
  );
}