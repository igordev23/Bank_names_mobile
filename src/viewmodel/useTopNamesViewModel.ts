import { useState, useEffect } from 'react';
import { NameItem } from '../model/entities/NameItem';
import { NameRepository } from '../model/repositories/nameRepository';

export type useTopNamesViewModelState = {
  names: NameItem[];
  loading: boolean;
  error: string | null;
};

export type useTopNamesViewModelActions = {
  fetchTopNames: (limit: number, ano?: number, regiao?: string) => void;
};

export const useTopNamesViewModel = (): {
  state: useTopNamesViewModelState;
  actions: useTopNamesViewModelActions;
} => {
  const [names, setNames] = useState<NameItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTopNames = async (limit: number, ano?: number, regiao?: string) => {
    setLoading(true);
    setError(null);
    try {
      const repository = new NameRepository();
      const data = await repository.getTopNames(limit);

      setNames(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return {
    state: { names, loading, error },
    actions: { fetchTopNames },
  };
};
