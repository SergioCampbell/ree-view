import { InternationalExchangesProps } from "../types/frontera.type";

export default function InternationalExchanges ({ internationalExchanges, saldoInternacional }: InternationalExchangesProps) {
  return (
    <div className="bg-cyan-800 text-white shadow-md rounded-md p-4 mt-4">
      <table className="w-full text-center rounded-md overflow-hidden">
  <thead className="bg-cyan-700">
    <tr>
      <th className="py-3 px-4 font-semibold uppercase">País</th>
      <th className="py-3 px-4 font-semibold uppercase">Importación</th>
      <th className="py-3 px-4 font-semibold uppercase">Exportación</th>
    </tr>
  </thead>
  <tbody>
    {Object.entries(internationalExchanges)
      .filter(([country]) => country !== 'saldoInternacional')
      .map(([country, data]) => (
        <tr key={country} className="border-b border-gray-200">
          <td className="py-3 px-4 font-semibold">{country}</td>
          <td className="py-3 px-4">{typeof data === 'object' && data.import !== undefined ? data.import.toLocaleString(undefined, { maximumFractionDigits: 0 }) : '-'}</td>
          <td className={`py-3 px-4`}>{typeof data === 'object' && data.export !== undefined ? data.export.toLocaleString(undefined, { maximumFractionDigits: 0 }) : '-'}</td>
        </tr>
      ))}
  </tbody>
</table>
      <div className="mt-4 font-semibold flex justify-between">
        <span className="text-lg">Saldo Internacional: </span>
        <span className="text-lg">{saldoInternacional.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
      </div>
    </div>
  );
};