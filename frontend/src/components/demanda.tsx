interface DemandProps {
  demandValue: number;
}

export default function Demand({ demandValue }: DemandProps) {
  return (
    <div className="bg-cyan-800 text-white shadow-md rounded-md p-4 mt-4 text-center">
      <h2 className="font-semibold text-xl mb-2">Demanda (b.c.)</h2>
      <p className="text-2xl font-bold">{demandValue !== undefined ? demandValue.toLocaleString(undefined, { maximumFractionDigits: 0 }) : '-'}</p>
    </div>
  );
};