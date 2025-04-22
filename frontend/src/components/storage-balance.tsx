interface StorageBalanceProps {
  storageBalance: {
    saldoAlmacenamiento: number;
    turbinacionBombeo: number;
    consumoBombeo: number;
    entregaBateria: number;
    cargaBateria: number;
  };
}

const StorageBalance: React.FC<StorageBalanceProps> = ({ storageBalance }) => {
  return (
    <div className="bg-cyan-800 text-white shadow-md rounded-md p-4 mt-4">
      <h2 className="font-semibold text-xl mb-2">Saldo Almacenamiento</h2>
      <p>Saldo: {storageBalance.saldoAlmacenamiento}</p>
      <p>Turbinación Bombeo: {storageBalance.turbinacionBombeo}</p>
      <p>Consumo Bombeo: {storageBalance.consumoBombeo}</p>
      <p>Entrega Batería: {storageBalance.entregaBateria}</p>
      <p>Carga Batería: {storageBalance.cargaBateria}</p>
    </div>
  );
};

export { StorageBalance };