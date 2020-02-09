import { Column } from './column.model';
import { Reference } from './reference.model';

export interface TableResponse {
  name: string;
  columns: Column[];
  rows: any[];
  // referencing other tables
  refsTo: Reference[];
  // referenced by other tables
  refsFrom: Reference[];
}
