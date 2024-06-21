import { createReducer, on } from '@ngrx/store';
import { ProductState, Product } from './product.model'; // Import Product and ProductState interfaces
import { ProductActions } from './products.actions';

const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Cable Termination.',
    description:
      'Termination of twisted pair cables to ensure stable connection and data transmission.',
    price: '200',
    imageUrl:
      'https://www.dsecctv.com/images/RE-RJ45P%20plug%20md%20fly.png',
  },
  {
    id: '2',
    name: 'Single Camera Installation.',
    description:
      'Installation and configuration of a single camera to ensure security on your property.',
    price: '5000/шт',
    imageUrl:
      'https://www.alliedhomesecurity.net/wp-content/uploads/2021/06/Dome_Camera_features-01.png.pagespeed.ce.XQvkkhaxU1.png',
  },
  {
    id: '3',
    name: 'Complete Camera System Setup.',
    description:
      'Installation of a full camera surveillance system with multiple cameras for comprehensive coverage.',
    price: '4000/шт',
    imageUrl:
      'https://blob.vivotek.com/downloadfile/Home/Slider/banners-05.png',
  },
  {
    id: '4',
    name: 'Network Configuration.',
    description:
      'Network setup to ensure seamless operation of the surveillance system.',
    price: '1000',
    imageUrl:
      'https://www.synology.com/img/vms/solution/home/nas.png',
  },
];

export const initialState: ProductState = {
  products: initialProducts,
  selectedProductId: null,
  loading: false,
  error: null,
};

export const productReducer = createReducer(
  initialState,
  on(ProductActions.loadProducts, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ProductActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    loading: false,
    products,
  })),
  on(ProductActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(ProductActions.selectProduct, (state, { productId }) => ({
    ...state,
    selectedProductId: productId,
  })),
  on(ProductActions.addProduct, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ProductActions.addProductSuccess, (state, { product }) => ({
    ...state,
    loading: false,
    products: [...state.products, product],
  })),
  on(ProductActions.addProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
