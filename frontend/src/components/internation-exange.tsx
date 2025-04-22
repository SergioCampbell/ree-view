interface InternationalExchangesProps {
  internationalExchanges: {
    [country: string]: { import: number; export: number };
    saldoInternacional: any;
  };
}

const InternationalExchanges: React.FC<InternationalExchangesProps> = ({ internationalExchanges }) => {
  return (
    <div className="bg-cyan-800 text-white shadow-md rounded-md p-4 mt-4">
      <h2 className="font-semibold text-xl mb-2">Intercambios Internacionales</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th>País</th>
            <th>Importación</th>
            <th>Exportación</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(internationalExchanges).map(([country, data]) => (
            country !== 'saldoInternacional' && (
              <tr key={country}>
                <td>{country}</td>
                <td>{data.import}</td>
                <td>{data.export}</td>
              </tr>
            )
          ))}
        </tbody>
      </table>
      <div className="mt-2 font-semibold">Saldo I. Internacionales: {internationalExchanges.saldoInternacional}</div>
    </div>
  );
};

export { InternationalExchanges };