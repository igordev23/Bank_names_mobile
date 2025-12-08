import { useState } from 'react';
import { NameItem } from '../model/entities/NameItem';
// Importa JSON local
import nomesFiltrados from '../bottomNames/nomes_filtrados.json';

export type useBottomNamesViewModelState = {
  names: NameItem[];
  loading: boolean;
  error: string | null;
};

export type useBottomNamesViewModelActions = {
  fetchBottomNames: (limit: number) => void;
};

export const useBottomNamesViewModel = () => {
  const [names, setNames] = useState<NameItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBottomNames = (limit: number) => {
    setLoading(true);
    setError(null);

    try {
      // Corta pela quantidade desejada
      const limited = nomesFiltrados.slice(0, limit);

      setNames(limited as NameItem[]);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return {
    state: { names, loading, error },
    actions: { fetchBottomNames },
  };
};
