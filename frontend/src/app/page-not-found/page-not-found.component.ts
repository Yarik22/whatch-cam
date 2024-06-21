import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss',
})
export class PageNotFoundComponent {
  header: HTMLElement | null;
  footer: HTMLElement | null;
  constructor(private router: Router) {
    this.header = document.querySelector('header');
    this.footer = document.querySelector('footer');
    if (this.header) {
      this.header.style.display = 'none';
    }
    if (this.footer) {
      this.footer.style.display = 'none';
    }
  }

  goHome() {
    if (this.header) {
      this.header.style.display = 'block';
    }
    if (this.footer) {
      this.footer.style.display = 'block';
    }
    this.router.navigate(['/home']);
  }
}
