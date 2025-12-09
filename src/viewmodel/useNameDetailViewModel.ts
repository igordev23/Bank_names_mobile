import { useState, useMemo, useCallback } from "react";
import { NameDetail } from "../model/entities/NameDetail";
import { NameRepository } from "../model/repositories/nameRepository";

export const useNameDetailViewModel = () => {
  const [detail, setDetail] = useState<NameDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const repository = useMemo(() => new NameRepository(), []);

  // utilitário de formatação
  const formatPeriod = (p: string): string => {
    return p
      .replace("[", "")
      .replace("[", "")
      .replace("]", "")
      .replace(",", " → ");
  };

  const fetchNameDetail = useCallback(
    async (nome: string) => {
      setLoading(true);
      setError(null);

      try {
        const data = await repository.getNameDetail(nome, "A");

        // Proteção: caso API retorne null
        if (!data) {
          throw new Error("Nenhum dado encontrado.");
        }

        // 🔥 Montar NameDetail COMPLETO, garantindo tipagem correta
        const formatted: NameDetail = {
          nome: data.nome ?? "",
          sexo: data.sexo ?? null,
          localidade: data.localidade ?? "",
          total: data.total ?? 0,

          res: data.res.map((item) => ({
            periodo: item.periodo,
            frequencia: item.frequencia,
            periodoFormatado: formatPeriod(item.periodo),
          })),
        };

        setDetail(formatted);
      } catch (err) {
        setError((err as Error).message);
        setDetail(null);
      } finally {
        setLoading(false);
      }
    },
    [repository]
  );

  return {
    state: { detail, loading, error },
    actions: { fetchNameDetail },
  };
};
