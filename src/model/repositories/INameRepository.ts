import { NameItem } from '../entities/NameItem';
import { NameDetail } from '../entities/NameDetail';

export interface INameRepository {
  getTopNames(limit: number): Promise<NameItem[]>;
  getBottomNames(limit: number): Promise<NameItem[]>;
  getNameDetail(nome: string, sexo?: "M" | "F" | "A"): Promise<NameDetail | null>;

}

