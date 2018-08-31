import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Entity from 'wakanda-client/dist/presentation/entity';

import { ColumnKinds } from '../../models/data';
import { Column } from '../../reducers/data';
import * as data from '../../actions/data';
import * as fromRoot from '../../../reducers';
import { HideAddRow } from '../../actions/layout';

export interface DialogData {

};

@Component({
  selector: 'app-entity-dialog',
  templateUrl: './entity-dialog.component.html',
  styleUrls: ['./entity-dialog.component.css']
})
export class EntityDialogComponent implements OnInit {

  entity: Entity;
  columns$: Observable<Array<Column>>
  tableName$: Observable<string>;
  values: any = {};
  columns: Array<any>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<EntityDialogComponent>,
    private store: Store<fromRoot.State>
  ) {
    this.tableName$ = this.store.pipe(select(fromRoot.getTableName));
    this.columns$ = this.store.pipe(
      select(fromRoot.getColumns),
      map(_columns => {
        this.columns = _columns.filter(column => {
          return [
            ColumnKinds.RelatedEntities,
            ColumnKinds.calculated
          ].indexOf(column.kind) === -1;
        });

        return this.columns;
      })
    );
  }

  ngOnInit() {
  }

  save() {
    let _values = {
      ...this.values
    };
    this.columns.forEach(column => {
      if (column.simpleDate) {
        let value: Date = _values[column.name];
        let day = ('0' + value.getDate()).slice(-2);
        let month = ('0' + (value.getMonth() + 1)).slice(-2);
        let year = value.getFullYear();
        _values[column.name] = `${day}!${month}!${year}`;
      }
    });

    this.store.dispatch(new data.AddRow(_values));
  }

  close() {
    this.store.dispatch(new HideAddRow());
  }

  isNumerical(column) {
    return [
      'long',
      'long64',
      'number',
      'word',
      'byte'
    ].indexOf(column.type) > -1;
  }

}
