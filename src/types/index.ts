// Способ перевозки животного
export type TransportMethod = 'cargo' | 'baggage' | 'cabin';

// Значение с поддержкой мультиязычности
export type LocalizedValue = string | { ru?: string; en?: string };
export type LocalizedArray = string[] | { ru?: string[]; en?: string[] };

// Интерфейс для условий перевозки с поддержкой RU/EN
export interface Conditions {
  maxCarrierSize?: LocalizedValue;
  maxWeight?: LocalizedValue;
  allowedAnimals?: LocalizedArray;
  additionalInfo?: LocalizedValue;
}

// Интерфейс для условий перевозки (старое название для обратной совместимости)
export type TransportConditions = Conditions;

// Интерфейс для авиакомпании
export interface Airline {
  id: string;
  name: string;
  logo: string;
  transportMethods: TransportMethod[];
  conditions: {
    [key in TransportMethod]?: Conditions;
  };
  rulesUrl: string;
}

// Интерфейс для фильтров
export interface Filters {
  transportMethods: TransportMethod[];
  searchQuery: string;
}
