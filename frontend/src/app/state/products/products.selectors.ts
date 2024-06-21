import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ProductState } from './product.model';
export const selectProductState =
  createFeatureSelector<ProductState>('products');

export const selectAllProducts = createSelector(
  selectProductState,
  (state: ProductState) => state.products
);

export const selectLoading = createSelector(
  selectProductState,
  (state: ProductState) => state.loading
);

export const selectError = createSelector(
  selectProductState,
  (state: ProductState) => state.error
);

export const selectSelectedProductId = createSelector(
  selectProductState,
  (state: ProductState) => state.selectedProductId
);

export const selectSelectedProduct = createSelector(
  selectAllProducts,
  selectSelectedProductId,
  (products, selectedProductId) =>
    products.find((product) => product.id === selectedProductId)
);
