import { useState, useRef, useEffect } from "react";
import { NameItem } from "../model/entities/NameItem";
import { NameRepository } from "../model/repositories/nameRepository";
import { generateBrazilianNames } from "../utils/generateBrazilianNames";

/* ================= CACHE EM MEMÓRIA ================= */
let cachedNames: NameItem[] = [];
let cachedPage = 1;
let cachedTestedNames = new Set<string>();
/* ==================================================== */

export const useBottomNamesViewModel = () => {
  const [names, setNames] = useState<NameItem[]>(cachedNames);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(cachedPage);

  const repository = new NameRepository();
  const testedNames = useRef<Set<string>>(cachedTestedNames);

  const MAX_ATTEMPTS = 100;

  // 🔁 sincroniza estado com cache
  useEffect(() => {
    cachedNames = names;
    cachedPage = page;
    cachedTestedNames = testedNames.current;
  }, [names, page]);

  const fetchBottomNames = async (limit: number) => {
    // 👉 se já tem cache, não refaz
    if (cachedNames.length > 0) return;

    setLoading(true);
    setError(null);

    try {
      const collected: NameItem[] = [];
      let attempts = 0;

      while (collected.length < limit && attempts < MAX_ATTEMPTS) {
        attempts++;

        const [nome] = generateBrazilianNames(1, testedNames.current);
        if (!nome) continue;

        testedNames.current.add(nome);

        const detail = await repository.getNameDetail(nome, "A");
        const frequencia =
          detail?.res?.reduce((sum, r) => sum + r.frequencia, 0) ?? 0;

        if (frequencia > 0) {
          collected.push({
            nome,
            frequencia,
            ranking: 0,
          });
        }
      }

      setNames(collected);
      setPage(1);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async (limit: number) => {
    setLoading(true);

    try {
      const collected: NameItem[] = [];
      let attempts = 0;

      while (collected.length < limit && attempts < MAX_ATTEMPTS) {
        attempts++;

        const [nome] = generateBrazilianNames(1, testedNames.current);
        if (!nome) continue;

        testedNames.current.add(nome);

        const detail = await repository.getNameDetail(nome, "A");
        const frequencia =
          detail?.res?.reduce((sum, r) => sum + r.frequencia, 0) ?? 0;

        if (frequencia > 0) {
          collected.push({
            nome,
            frequencia,
            ranking: 0,
          });
        }
      }

      setNames((prev) => [...prev, ...collected]);
      setPage((p) => p + 1);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return {
    state: { names, loading, error, page },
    actions: { fetchBottomNames, loadMore },
  };
};
