export const SkeletonComponent = () => {
  return (
    <div className="bg-slate-200 p-4 rounded-md animate-pulse">
      <div className="h-4 w-full bg-slate-300 rounded-md"></div>
      <div className="h-4 w-1/2 bg-slate-300 rounded-md mt-2"></div>
    </div>
  );
};
