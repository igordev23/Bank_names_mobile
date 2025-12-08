export type NamePeriod = {
  periodo: string;      // ex: "[1940,1950["
  frequencia: number;   // ex: 40
};

export type NameDetail = {
  nome: string;
  sexo: "M" | "F" | null;
  localidade: string;
  res: NamePeriod[];
  total: number;
};
