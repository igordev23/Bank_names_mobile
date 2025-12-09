import { useState, useCallback, useMemo } from 'react';
import { NameDetail } from '../model/entities/NameDetail';
import { NameRepository } from '../model/repositories/nameRepository';

export const useSearchViewModel = () => {
const [result, setResult] = useState<NameDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔥 Criado apenas uma vez → não perde cache
  const repository = useMemo(() => new NameRepository(), []);

  const searchName = useCallback(async (nome: string, sexo: "M" | "F" | "A") => {
  const cleanName = nome.trim().toLowerCase();

  if (!cleanName) {
    setError("Digite um nome válido");
    setResult(null);
    return;
  }

  setLoading(true);
  setError(null);
  setResult(null);

  try {
    const data = await repository.getNameDetail(cleanName, sexo);

    if (data) {
      // 🔥 Transformar períodos para visual bonito
      const formattedRes = data.res.map((item) => {
        const clean = item.periodo.replace("[", "").replace("[", "").replace("]", "").replace(",", "→");
        // Ex: "[1980,1990[" vira "1980 → 1990"

        return {
          ...item,
          periodoFormatado: clean.trim(),
        };
      });

      setResult({
        ...data,
        total: data.total ?? 0,
        res: formattedRes,
      });
    }
  } catch (err) {
    setError((err as Error).message || "Erro inesperado");
  } finally {
    setLoading(false);
  }
}, [repository]);


  return {
    state: { result, loading, error },
    actions: { searchName },
  };
};
