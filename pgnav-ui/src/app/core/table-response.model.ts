import { Column } from './column.model';

export interface TableResponse {
  name: string;
  columns: Column[];
  rows: any;
}
