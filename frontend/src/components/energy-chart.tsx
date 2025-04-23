import { processGenerationData } from '../libs/process-generation-data';
import Demand from './demanda';
import GenerationBreakdown from './generation-data';
import InternationalExchanges from './internation-exange';
import { StorageBalance } from './storage-balance';
import { InternationalExchangesProps } from '../types/frontera.type';
import { SkeletonComponent } from './skeleton';
import useEnergyData from '../hooks/useEnergyData';
import useFronteraData from '../hooks/useFronteraData';
import EnergyErrorState from './states/energy-error-state';
import FronteraErrorState from './states/frontera-error-state';
import LoadingState from './states/loading-state';
import NoDataState from './states/no-data-state';

interface EnergyChartProps {
  startDate: string;
  endDate: string;
  type?: string | null;
  groupId?: string | null;
  groupType?: string | null;
}

export default function EnergyChart({ startDate, endDate, type, groupId, groupType }: EnergyChartProps) {
  const { loadingEnergy, errorEnergy, energyData, refetchEnergy } = useEnergyData(startDate, endDate, groupId, type, groupType);
  const { loadingFrontera, errorFrontera, fronteraDataResponse, refetchFrontera } = useFronteraData(startDate, endDate);

  const internationalExchangeData: InternationalExchangesProps['internationalExchanges'] = {};
  const intercambios = fronteraDataResponse?.getIntercambios || [];
  let saldoTotalInternacional = 0;

  intercambios.forEach((item) => {
    const country = item.country;
    if (!internationalExchangeData[country]) {
      internationalExchangeData[country] = { import: 0, export: 0 };
    }

    if (item.type === 'Importación') {
      internationalExchangeData[country].import += item.attributes?.total || 0;
    } else if (item.type === 'Exportación') {
      internationalExchangeData[country].export += item.attributes?.total || 0;
    } else if (item.type === 'saldo') {
      saldoTotalInternacional += item.attributes?.total || 0;
    }
  });

  internationalExchangeData.saldoInternacional = { import: 0, export: saldoTotalInternacional };

  let totalDemand = 0;
  let numberOfDemandEntries = 0;

  if (energyData?.getEnergyBalances) {
    energyData.getEnergyBalances.forEach((balance) => {
      totalDemand += balance.attributes?.total || 0;
      numberOfDemandEntries++;
    });
  }

  const promedioDemand = numberOfDemandEntries > 0 ? totalDemand / numberOfDemandEntries : 0;

  if (loadingEnergy || loadingFrontera) {
    return <LoadingState />;
  }

  if (errorEnergy) {
    return <EnergyErrorState error={errorEnergy} refetch={refetchEnergy} />;
  }

  if (errorFrontera) {
    return <FronteraErrorState error={errorFrontera} refetch={refetchFrontera} />;
  }

  if (energyData === null) {
    return <NoDataState />;
  }

  const generationData = energyData && processGenerationData(energyData.getEnergyBalances);
  const totalGeneration = generationData && generationData.totalNonRenewable + generationData.totalRenewable;

  return (
    <>
      <h1 className="text-2xl font-bold mb-4 text-white">Balance eléctrico (GWh) | Sistema eléctrico: nacional</h1>
      <div className="flex justify-between mb-2">
        <div className="text-gray-400 italic">Del {startDate} al {endDate}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loadingEnergy ? (<SkeletonComponent />) : (<GenerationBreakdown energyBalances={energyData?.getEnergyBalances || []} />)}
        <div>
          <div className="flex justify-between font-semibold text-white bg-cyan-700 p-4 rounded-md mb-4">
            <span className="text-lg">Generación</span>
            <span className="text-lg">{totalGeneration?.toFixed(3)}</span>
          </div>
          {loadingFrontera ? (<SkeletonComponent />) : (
            <InternationalExchanges internationalExchanges={internationalExchangeData} saldoInternacional={saldoTotalInternacional} />
          )}
          {loadingFrontera ? (<SkeletonComponent />) : (
            fronteraDataResponse && <StorageBalance getIntercambios={fronteraDataResponse.getIntercambios} />
          )}
          <Demand demandValue={promedioDemand} />
        </div>
      </div>
    </>
  );
}