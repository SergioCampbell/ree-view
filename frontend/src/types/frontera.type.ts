export interface FronteraType {
  type: string
  id: string
  groupId: string
  attributes: Attributes
  country: string
  __typename: string
}

interface Attributes {
  title: string
  description: string | null
  color: string
  icon: string | null
  type: string
  magnitude: string | null
  composite: boolean
  lastUpdate: Date
  values: Value[]
  total: number
  totalPercentage: number | null
  __typename: string
}

interface Value {
  value: number
  percentage: number
  datetime: string
  __typename: string
}

export interface InternationalExchangesProps {
  internationalExchanges: {
    [country: string]: { import: number; export: number };
  };
  saldoInternacional: number;
}