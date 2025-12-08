import { NameItem } from '../entities/NameItem';
import { NameDetail } from '../entities/NameDetail';

export class NameService {
  private static BASE_URL = 'https://servicodados.ibge.gov.br/api/v2/censos/nomes';

  /**
   * Busca ranking geral de nomes (todos os nomes)
   */
private static async fetchRanking(): Promise<any[]> {
  const res = await fetch(`${this.BASE_URL}/ranking`);
  if (!res.ok) throw new Error("Erro ao buscar ranking");
  return res.json();
}


static async getTopNames(limit: number): Promise<NameItem[]> {
  const data = await this.fetchRanking();

  const list: NameItem[] = data[0]?.res ?? [];

  return list
    .sort((a: NameItem, b: NameItem) => b.frequencia - a.frequencia)
    .slice(0, limit);
}


static async getBottomNames(limit: number): Promise<NameItem[]> {
  const data = await this.fetchRanking();
  const list: NameItem[] = data[0]?.res ?? [];

  if (!list.length) return [];

  // 1️⃣ tenta pegar nomes com frequência baixa
  const raros = list.filter(item => item.frequencia <= 100);

  if (raros.length > 0) {
    return raros.sort((a, b) => a.frequencia - b.frequencia).slice(0, limit);
  }
  console.log("Menor frequência do ranking:", list[list.length - 1]?.frequencia);
console.log("10 piores:", list.slice(-10));

  // 2️⃣ se não existir nenhum raro, pega os menos usados do ranking
  return list
    .sort((a, b) => a.frequencia - b.frequencia)
    .slice(0, limit);
}





  /**
   * Detalhes por nome (frequência ano a ano)
   * Exemplo: /api/v2/censos/nomes/maria
   */
 static async getNameDetail(nome: string, sexo: "M" | "F" | "A") {
  const safeName = nome.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  let url = `${this.BASE_URL}/${safeName}`;

  // Se NÃO for "A", manda sexo
  if (sexo !== "A") {
    url += `?sexo=${sexo}`;
  }

  const response = await fetch(url);
  if (!response.ok) return null;

  const data = await response.json();
  if (!data.length) return null;

  const item = data[0];

  // 🔥 Se sexo = A → API retorna tudo → setar sexo: null
  const finalSexo = sexo === "A" ? null : item.sexo;

  return this.withTotal({
    ...item,
    sexo: finalSexo
  });
}


private static withTotal(item: any) {
  const total = item.res.reduce((sum: number, x: any) => sum + x.frequencia, 0);
  return { ...item, total };
}




}