import { Table } from './../core/table.model';
/**
 * describing the dialog data for the table-add-entity dialog
 */
export interface DialogData {
  table: Table;
  tableName: string;
  columns: string[];
}
