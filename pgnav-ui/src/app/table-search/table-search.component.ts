import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

/**
 * connects to input field an constantly updates the exposed property value
 * which can easily be accessed from within templates via viewChilds #search.value
 * used in combination with the TableSearchPipe to filter tables
 */
@Component({
  selector: 'pgnav-ui-table-search',
  templateUrl: './table-search.component.html',
  styleUrls: ['./table-search.component.css']
})
export class TableSearchComponent implements OnInit {

  tableSearchForm: FormGroup;
  // expose the search term
  value: string;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.tableSearchForm = this.formBuilder.group({
      searchInput: null
    });

    // update the exposed search term
    this.tableSearchForm.get('searchInput').valueChanges.subscribe( (value: string) => {
      this.value = value;
    });
  }

}
