import { FronteraType } from '../types/frontera.type';

interface StorageBalanceProps {
  getIntercambios: FronteraType[];
}

export default function StorageBalance({ getIntercambios }: StorageBalanceProps) {
  console.debug("🚀 ~ StorageBalance ~ getIntercambios:", getIntercambios)
  const storageData = {
    saldoAlmacenamiento: 0,
    turbinacionBombeo: 0,
    consumoBombeo: 0,
    entregaBateria: 0,
    cargaBateria: 0,
  };

  return (
    <div className="bg-cyan-800 text-white shadow-md rounded-md p-4 mt-4">
      <table className="w-full text-center shadow-inner rounded-md overflow-hidden">
        <tbody className="text-sm">
          <tr className="border-b border-cyan-700">
            <td className="py-2 px-4 font-semibold">Turbinación bombeo</td>
            <td className="py-2 px-4">{storageData.turbinacionBombeo !== undefined ? storageData.turbinacionBombeo.toLocaleString(undefined, { maximumFractionDigits: 0 }) : '-'}</td>
          </tr>
          <tr className="border-b border-cyan-700">
            <td className="py-2 px-4 font-semibold">Consumo bombeo</td>
            <td className={`py-2 px-4 ${storageData.consumoBombeo < 0 ? 'text-red-500' : ''}`}>
              {storageData.consumoBombeo !== undefined ? storageData.consumoBombeo.toLocaleString(undefined, { maximumFractionDigits: 0 }) : '-'}
            </td>
          </tr>
          <tr className="border-b border-cyan-700">
            <td className="py-2 px-4 font-semibold">Entrega batería</td>
            <td className="py-2 px-4">{storageData.entregaBateria !== undefined ? storageData.entregaBateria.toLocaleString(undefined, { maximumFractionDigits: 0 }) : '-'}</td>
          </tr>
          <tr className="border-b border-cyan-700">
            <td className="py-2 px-4 font-semibold">Carga batería</td>
            <td className={`py-2 px-4 ${storageData.cargaBateria < 0 ? 'text-red-500' : ''}`}>
              {storageData.cargaBateria !== undefined ? storageData.cargaBateria.toLocaleString(undefined, { maximumFractionDigits: 0 }) : '-'}
            </td>
          </tr>
          <tr className="bg-cyan-700 font-semibold">
            <td className="py-2 px-4">Saldo almacenamiento</td>
            <td className={`py-2 px-4 ${storageData.saldoAlmacenamiento < 0 ? 'text-red-500' : 'text-white'}`}>
              {storageData.saldoAlmacenamiento !== undefined ? storageData.saldoAlmacenamiento.toLocaleString(undefined, { maximumFractionDigits: 0 }) : '-'}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export { StorageBalance };