import { Component, DEFAULT_CURRENCY_CODE, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { Product } from '../state/products/product.model';
import * as ProductSelectors from '../state/products/products.selectors';
import { ProductActions } from '../state/products/products.actions';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [{ provide: DEFAULT_CURRENCY_CODE, useValue: 'UAH ' }],
})
export class HomeComponent implements OnInit {
  email: string = 'whatchcam@gmail.com';
  products$: Observable<Product[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  isLoaded: boolean = false;

  constructor(private store: Store, private translate: TranslateService) {
    this.products$ = this.store.select(ProductSelectors.selectAllProducts);
    this.loading$ = this.store.select(ProductSelectors.selectLoading);
    this.error$ = this.store.select(ProductSelectors.selectError);
  }

  ngOnInit(): void {
    this.loading$.subscribe((isLoading) => {
      if (!isLoading) {
        this.isLoaded = true;
      }
    });

    this.store.dispatch(ProductActions.loadProducts());
  }

  isMobileDevice(): boolean {
    const userAgent = navigator.userAgent.toLowerCase();
    return (
      /iphone|ipod|ipad|android/.test(userAgent) ||
      (navigator.maxTouchPoints && navigator.maxTouchPoints > 2) || // Tablets
      (window.innerWidth < 600 && window.innerHeight < 600) // Small screens
    );
  }

  selectProduct(productId: string) {
    this.products$
      .pipe(
        map((products) => products.find((product) => product.id === productId))
      )
      .subscribe((selectedProduct) => {
        if (selectedProduct) {
          const translatedName = this.translate.instant(selectedProduct.name);
          const translatedDescription = this.translate.instant(
            selectedProduct.description
          );
          if (this.isMobileDevice()) {
            const emailLink = `mailto:${
              this.email
            }?subject=${encodeURIComponent(
              translatedName
            )}&body=${encodeURIComponent(translatedDescription)}`;
            window.location.href = emailLink;
          } else {
            const emailLink = `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${
              this.email
            }&su=${encodeURIComponent(
              translatedName
            )}&body=${encodeURIComponent(translatedDescription)}`;
            window.open(emailLink, '_blank');
          }
        } else {
          console.warn(`Product with id ${productId} not found.`);
        }
      });
  }
}
