import { NameItem } from '../entities/NameItem';
import { NameDetail } from '../entities/NameDetail';
import { NameService } from '../services/NameIBGEService';
import { INameRepository } from './INameRepository';

export class NameRepository implements INameRepository {
  private cache = new Map<string, NameItem[] | NameDetail | null>();

  async getTopNames(limit: number): Promise<NameItem[]> {
    const key = `top-${limit}`;

    if (this.cache.has(key)) {
      return this.cache.get(key) as NameItem[];
    }

    const data = await NameService.getTopNames(limit);
    this.cache.set(key, data);
    return data;
  }

  async getBottomNames(limit: number): Promise<NameItem[]> {
    const key = `bottom-${limit}`;

    if (this.cache.has(key)) {
      return this.cache.get(key) as NameItem[];
    }

    const data = await NameService.getBottomNames(limit);
    this.cache.set(key, data);
    return data;
  }

 async getNameDetail(nome: string, sexo: "M" | "F" | "A"): Promise<NameDetail | null> {
  const key = `detail-${nome}-${sexo}`; // cache separado por sexo

  if (this.cache.has(key)) {
    return this.cache.get(key) as NameDetail | null;
  }

  const detail = await NameService.getNameDetail(nome, sexo);

  this.cache.set(key, detail);
  return detail;
}

}
