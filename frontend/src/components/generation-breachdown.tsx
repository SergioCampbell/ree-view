import { EnergyBalanceType } from '../types/energy-balance.types';

interface GenerationProps {
  energyBalances: EnergyBalanceType[];
}

function processGenerationData(energyBalances: EnergyBalanceType[]) {
  const renewable: { [type: string]: number } = {};
  const nonRenewable: { [type: string]: number } = {};
  let totalRenewable = 0;
  let totalNonRenewable = 0;

  energyBalances.forEach(item => {
    const { type, groupId, attributes } = item;
    const total = attributes?.total || 0;

    if (groupId === 'Renovable') {
      renewable[type] = (renewable[type] || 0) + total;
      totalRenewable += total;
    } else {
      nonRenewable[type] = (nonRenewable[type] || 0) + total;
      totalNonRenewable += total;
    }
  });

  const allGeneration = totalRenewable + totalNonRenewable;
  const renewableData = Object.entries(renewable).map(([type, value]) => ({
    type,
    value,
    percentage: (value / totalRenewable) * 100,
  }));

  const nonRenewableData = Object.entries(nonRenewable).map(([type, value]) => ({
    type,
    value,
    percentage: (value / totalNonRenewable) * 100,
  }));

  const totalRenewablePercentage = (totalRenewable / allGeneration) * 100 || 0;
  const totalNonRenewablePercentage = (totalNonRenewable / allGeneration) * 100 || 0;

  return {
    renewable: renewableData,
    nonRenewable: nonRenewableData,
    totalRenewable,
    totalNonRenewable,
    totalRenewablePercentage,
    totalNonRenewablePercentage,
    totalGeneration: allGeneration,
  };
}

const GenerationBreakdown: React.FC<GenerationProps> = ({ energyBalances }) => {
  const generationData = processGenerationData(energyBalances);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white shadow-md rounded-md p-4">
        <h3 className="font-semibold text-lg mb-2">Generación renovable</h3>
        <ul>
          {generationData.renewable.map((item) => (
            <li key={item.type} className="flex justify-between items-center py-1">
              <span>{item.type}</span>
              <span>{item.percentage.toFixed(1)}% ({item.value.toFixed(0)})</span>
            </li>
          ))}
        </ul>
        <div className="mt-2 font-semibold">
          Total: {generationData.totalRenewable.toFixed(0)} ({generationData.totalRenewablePercentage.toFixed(1)}%)
        </div>
      </div>
      <div className="bg-white shadow-md rounded-md p-4">
        <h3 className="font-semibold text-lg mb-2">Generación no renovable</h3>
        <ul>
          {generationData.nonRenewable.map((item) => (
            <li key={item.type} className="flex justify-between items-center py-1">
              <span>{item.type}</span>
              <span>{item.percentage.toFixed(1)}% ({item.value.toFixed(0)})</span>
            </li>
          ))}
        </ul>
        <div className="mt-2 font-semibold">
          Total: {generationData.totalNonRenewable.toFixed(0)} ({generationData.totalNonRenewablePercentage.toFixed(1)}%)
        </div>
      </div>
    </div>
  );
};

export default GenerationBreakdown;