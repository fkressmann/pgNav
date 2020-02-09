import { Column } from './column.model';

export interface TableMeta {
  name: string;
  columns: Column[];
  rows: any[];
}
