/**
 * the dialog data for the foreign-key-reference dialog window
 */
export interface DialogData {
  table: string; // the name of the table this column belongs to
  column: string; // the name of the column clicked
  refsFrom: any[]; // references from other tables
  refsTo: any[]; // references to other tables
  value: string; // the value of the current column
}
