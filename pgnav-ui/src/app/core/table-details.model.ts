import { Column } from './column.model';
/**
 * this covers the information for the table details after choosing one table
 * for the overview of all tables
 */
export interface TableDetailsModel {
  name: string;
  columns: Column[];
  rows: any[]; // flexible data types, type cannot be set
}
