import { useState } from 'react';
import { EnergyBalanceType } from '../types/energy-balance.types';
import { processGenerationData } from '../libs/process-generation-data';

interface GenerationProps {
  energyBalances: EnergyBalanceType[];
}

export default function GenerationBreakdown ({ energyBalances }: GenerationProps) {
  const generationData = processGenerationData(energyBalances);
  const [hoverInfoRenewable, setHoverInfoRenewable] = useState<{ type: string; percentage: number; color?: string | null } | null>(null);
  const [hoverInfoNonRenewable, setHoverInfoNonRenewable] = useState<{ type: string; percentage: number; color?: string | null } | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="grid content-between bg-cyan-800 text-white shadow-md rounded-md p-4">
        <ul>
        <h3 className="font-semibold text-lg mb-2">Generación renovable</h3>
          {generationData.renewable.map((item) => (
            <li
              key={item.type}
              className="py-2 relative"
              onMouseEnter={() => setHoverInfoRenewable({ type: item.type, percentage: item.percentage, color: item.color })}
              onMouseLeave={() => setHoverInfoRenewable(null)}
            >
              <div className="grid gap-2 items-center space-x-2">
                {item.icon && <span>{item.icon}</span>}
                <span className='text-cyan-100 font-bold'>{item.title || item.type}</span>
                <div className='flex justify-between items-center space-x-2'>
                  <span className="text-white text-sm">{item.percentage.toFixed(1)}%</span>
                <span className="text-white text-sm">({item.value.toFixed(0)})</span>
                </div>
                <div className="relative bg-gray-200 rounded-full h-2 w-full overflow-hidden">
                  <div
                    className={`h-full rounded-full`}
                    style={{ width: `${item.percentage}%`, backgroundColor: item.color || 'blue' }}
                  ></div>
                </div>
              </div>
              {hoverInfoRenewable?.type === item.type && (
                <div className="absolute top-full left-0 bg-gray-800 text-white text-xs rounded py-1 px-2 mt-1 z-10" style={{ backgroundColor: hoverInfoRenewable.color || 'gray' }}>
                  {item.title || item.type}: {hoverInfoRenewable.percentage.toFixed(1)}%
                </div>
              )}
            </li>
          ))}
        </ul>
        <div className="mt-2 max-h-28 font-semibold bg-green-400 text-slate-800 shadow-md rounded-md p-4">
          <h3 className="font-semibold text-lg mb-2">Generación renovable</h3>
          <div className='flex justify-between items-center py-1'>
            <span className='font-bold'>{generationData.totalRenewablePercentage.toFixed(1)}%</span>
            <span className='font-bold'>{generationData.totalRenewable.toFixed(0)}</span>
          </div>
        </div>
      </div>
      <div className="grid content-between bg-cyan-800 text-white shadow-md rounded-md p-4">
        <ul>
        <h3 className="font-semibold text-lg mb-2">Generación no renovable</h3>
          {generationData.nonRenewable.map((item) => (
            <li
              key={item.type}
              className="py-2 relative"
              onMouseEnter={() => setHoverInfoNonRenewable({ type: item.type, percentage: item.percentage, color: item.color })}
              onMouseLeave={() => setHoverInfoNonRenewable(null)}
            >
              <div className="grid gap-2 items-center space-x-2">
                {item.icon && <span>{item.icon}</span>}
                <span className='text-cyan-100 font-bold'>{item.title || item.type}</span>
                <div className='flex justify-between items-center space-x-2'>
                  <span className="text-white text-sm">{item.percentage.toFixed(1)}%</span>
                <span className="text-white text-sm">({item.value.toFixed(0)})</span>
                </div>
                <div className="relative bg-gray-200 rounded-full h-2 w-full overflow-hidden">
                  <div
                    className={`h-full rounded-full`}
                    style={{ width: `${item.percentage}%`, backgroundColor: item.color || 'blue' }}
                  ></div>
                </div>
              </div>
              {hoverInfoNonRenewable?.type === item.type && (
                <div className="absolute top-full left-0 bg-gray-800 text-white text-xs rounded py-1 px-2 mt-1 z-10" style={{ backgroundColor: hoverInfoNonRenewable.color || 'gray' }}>
                  {item.title || item.type}: {hoverInfoNonRenewable.percentage.toFixed(1)}%
                </div>
              )}
            </li>
          ))}
        </ul>
        <div className="mt-2 max-h-28 font-semibold bg-gray-400 text-slate-800 shadow-md rounded-md p-4">
          <h3 className="font-semibold text-lg mb-2">Generación no renovable</h3>
          <div className='flex justify-between items-center py-1'>
            <span className='font-bold'>{generationData.totalNonRenewablePercentage.toFixed(1)}%</span>
            <span className='font-bold'>{generationData.totalNonRenewable.toFixed(0)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};