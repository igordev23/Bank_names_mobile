import { useState, useMemo } from "react";
import { NameDetail } from "../model/entities/NameDetail";
import { NameRepository } from "../model/repositories/nameRepository";

export const useNameDetailViewModel = () => {
  const [detail, setDetail] = useState<NameDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const repository = useMemo(() => new NameRepository(), []);

  const fetchNameDetail = async (nome: string) => {
    setLoading(true);
    setError(null);

    try {
      const data = await repository.getNameDetail(nome, "A");
      setDetail(data);
    } catch (err) {
      setError((err as Error).message);
      setDetail(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    state: { detail, loading, error },
    actions: { fetchNameDetail },
  };
};
