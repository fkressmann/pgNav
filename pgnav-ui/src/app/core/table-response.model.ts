import { Column } from './column.model';

export interface TableResponse {
  name: string;
  columns: Column[];
  rows: any[];
  // referencing other tables
  refsTo: any[];
  // referenced by other tables
  refsFrom: any[];
}
