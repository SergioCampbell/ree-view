 
// export function processGenerationData(apiData: any[]) {
//   const renewable: Record<string, { value: number; percentage: number }> = {};
//   const nonRenewable: Record<string, { value: number; percentage: number }> = {};
//   let totalRenewable = 0;
//   let totalNonRenewable = 0;

import { EnergyBalanceType } from "../types/energy-balance.types";

//   apiData.forEach(item => {
//     const { type, groupId, attributes } = item;
//     const total = attributes?.total || 0;
//     const totalPercentage = attributes?.totalPercentage || 0;

//     if (groupId === 'Renovable') {
//       renewable[type] = { value: total, percentage: totalPercentage };
//       totalRenewable += total;
//     } else {
//       nonRenewable[type] = { value: total, percentage: totalPercentage };
//       totalNonRenewable += total;
//     }
//   });

//   const renewableWithPercentage = Object.entries(renewable).map(([type, data]) => {
//     const typedData = data as { value: number; percentage: number };
//     return {
//       type,
//       value: typedData.value,
//       percentage: (typedData.value / totalRenewable) * 100,
//     };
//   });

//   const nonRenewableWithPercentage = Object.entries(nonRenewable).map(([type, data]) => {
//     const typedData = data as { value: number; percentage: number };
//     return {
//       type,
//       value: typedData.value,
//       percentage: (typedData.value / totalNonRenewable) * 100,
//     };
//   });

//   const totalRenewablePercentage = (totalRenewable / (totalRenewable + totalNonRenewable)) * 100;
//   const totalNonRenewablePercentage = (totalNonRenewable / (totalRenewable + totalNonRenewable)) * 100;

//   return {
//     renewable: renewableWithPercentage,
//     nonRenewable: nonRenewableWithPercentage,
//     totalRenewable,
//     totalNonRenewable,
//     totalRenewablePercentage,
//     totalNonRenewablePercentage,
//   };
// }

export function processGenerationData(energyBalances: EnergyBalanceType[]) {
  const renewable: { [type: string]: { value: number; percentage: number; color?: string | null; icon?: string | null; title?: string | null } } = {};
  const nonRenewable: { [type: string]: { value: number; percentage: number; color?: string | null; icon?: string | null; title?: string | null } } = {};
  let totalRenewable = 0;
  let totalNonRenewable = 0;

  energyBalances.forEach(item => {
    const { type, groupId, attributes } = item;
    const total = attributes?.total || 0;
    const color = attributes?.color;
    const icon = attributes?.icon;
    const title = attributes?.title;

    if (groupId === 'Renovable') {
      renewable[type] = { value: (renewable[type]?.value || 0) + total, percentage: 0, color, icon, title };
      totalRenewable += total;
    } else {
      nonRenewable[type] = { value: (nonRenewable[type]?.value || 0) + total, percentage: 0, color, icon, title };
      totalNonRenewable += total;
    }
  });

  const allGeneration = totalRenewable + totalNonRenewable;
  const renewableData = Object.entries(renewable).map(([type, data]) => ({
    type,
    value: data.value,
    percentage: (data.value / totalRenewable) * 100,
    color: data.color,
    icon: data.icon,
    title: data.title,
  }));

  const nonRenewableData = Object.entries(nonRenewable).map(([type, data]) => ({
    type,
    value: data.value,
    percentage: (data.value / totalNonRenewable) * 100,
    color: data.color,
    icon: data.icon,
    title: data.title,
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