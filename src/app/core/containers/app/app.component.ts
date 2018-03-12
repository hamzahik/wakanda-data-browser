import { Component } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../../reducers';
import * as layoutActions from '../../actions/layout';
import * as routerActions from '../../actions/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  showSidenav$: Observable<boolean>;
  tables$: Observable<Array<string>>;
  tableName$: Observable<string>;

  constructor(private store: Store<fromRoot.State>) {
    this.showSidenav$ = this.store.pipe(select(fromRoot.getShowSidenav));
    this.tables$ = this.store.pipe(select(fromRoot.getTables));
    this.tableName$ = this.store.pipe(select(fromRoot.getTableName));
  }

  switchTable(tableName) {
    this.store.dispatch(new routerActions.SwitchTable({table: tableName}));
  }

  toggleSideNav() {
    this.store.dispatch(new layoutActions.ToggleSidenav());
  }
}
