/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@apollo/client';
import { GET_FRONTERAS } from '../queries/fronteras.query';
import { FronteraType } from '../types/frontera.type';

interface UseFronteraDataResult {
  loadingFrontera: boolean;
  errorFrontera: any;
  fronteraDataResponse: { getIntercambios: FronteraType[] } | undefined;
  refetchFrontera: (variables?: { input: { startDate: string; endDate: string } }) => Promise<any>;
}

const useFronteraData = (startDate: string, endDate: string): UseFronteraDataResult => {
  const { loading: loadingFrontera, error: errorFrontera, data: fronteraDataResponse, refetch: refetchFrontera } = useQuery<{ getIntercambios: FronteraType[] }, { input: { startDate: string; endDate: string } }>(
    GET_FRONTERAS,
    {
      variables: {
        input: {
          startDate,
          endDate,
        },
      },
      onError: (error) => {
        console.error('GraphQL Error (Frontera):', error);
      },
      errorPolicy: 'all',
    }
  );

  return { loadingFrontera, errorFrontera, fronteraDataResponse, refetchFrontera };
};

export default useFronteraData;