export interface QueryResult {
  energyBalances: EnergyBalanceType[];
}

export interface QueryVariables {
  input: {
    startDate: string;
    endDate: string;
    groupId?: string | null;
    type?: string | null;
  };
}

export interface EnergyBalanceData {
  energyBalances: EnergyBalanceType[];
}

export interface EnergyBalanceVars {
  input: {
    startDate: string;
    endDate: string;
    type?: string | null;
    groupId?: string | null;
  };
}

type ValueEntry = {
  value?: number | null;
  percentage?: number | null;
  datetime?: string | null;
};

type EnergyBalanceAttributes = {
  title: string;
  description?: string | null;
  color?: string | null;
  icon?: string | null;
  type?: string | null;
  magnitude?: string | null;
  composite?: string | null;
  lastUpdate?: string | null;
  values?: ValueEntry[] | null;
  total?: number | null;
  totalPercentage?: number | null;
};

export type EnergyBalanceType = {
  startDate: Date;
  endDate: Date;
  id: string;
  type: string;
  groupId: string;
  attributes: EnergyBalanceAttributes;
  createdAt: Date;
  updatedAt: Date;
};