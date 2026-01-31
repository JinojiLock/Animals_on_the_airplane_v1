export interface Airline {
  id: string;
  name: string;
  logo: string;
  transportMethods: TransportMethod[];
  conditions: {
    cabin?: TransportConditions;
    baggage?: TransportConditions;
    cargo?: TransportConditions;
  };
  rulesUrl?: string;
}

export type TransportMethod = 'cabin' | 'baggage' | 'cargo';

export interface TransportConditions {
  maxCarrierSize?: string;
  maxWeight?: string;
  allowedAnimals?: string[];
  additionalInfo?: string;
  // English fields
  maxCarrierSizeEn?: string;
  maxWeightEn?: string;
  allowedAnimalsEn?: string[];
  additionalInfoEn?: string;
}

export interface AirlineFilters {
  transportMethods?: TransportMethod[];
  searchQuery?: string;
}
