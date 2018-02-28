import {
    ActionReducerMap,
    createSelector,
    createFeatureSelector,
    ActionReducer,
    MetaReducer,
} from '@ngrx/store';

import * as fromLayout from '../core/reducers/layout';
import * as fromData from '../core/reducers/data';

export interface State {
    layout: fromLayout.State;
    data: fromData.State;
}

export const reducers: ActionReducerMap<State> = {
    layout: fromLayout.reducer,
    data: fromData.reducer,
};

export const getLayoutState = createFeatureSelector<fromLayout.State>('layout');
export const getDataState = createFeatureSelector<fromData.State>('data');

export const getShowSidenav = createSelector(
    getLayoutState,
    fromLayout.getShowSidenav
);
export const getQuery = createSelector(
    getDataState,
    fromData.getQuery
);