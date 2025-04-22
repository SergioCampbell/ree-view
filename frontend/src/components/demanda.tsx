interface DemandProps {
  demand: { value: number };
}

const Demand: React.FC<DemandProps> = ({ demand }) => {
  return (
    <div className="bg-cyan-800 text-white shadow-md rounded-md p-4 mt-4">
      <h2 className="font-semibold text-xl mb-2">Demanda (b.c.)</h2>
      <p className="text-center text-2xl font-bold">{demand.value}</p>
    </div>
  );
};

export { Demand };