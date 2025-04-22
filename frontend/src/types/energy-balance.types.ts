export interface EnergyBalanceAttributes {
  title: string;
  description?: string;
  color?: string;
  icon?: string | null;
  lastUpdate?: string;
  total?: number;
  totalPercentage?: number;
}

export interface EnergyBalanceType {
  startDate: Date;
  endDate: Date;
  type: string;
  groupId?: string | null;
  value: number;
  percentage: number;
  attributes: EnergyBalanceAttributes;
}

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