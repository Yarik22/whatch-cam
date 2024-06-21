import {
  AfterContentInit,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule, CommonModule, FormsModule],
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, AfterContentInit {
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled = scrollTop > 100;
  }

  @HostListener('window:scroll', [])
  onWindowScrolled() {
    this.isScrolled = window.pageYOffset > 200;
  }
  isDarkTheme?: boolean;
  isScrolled: boolean = false;
  pageIsNotFound: boolean = false;
  languages = ['ukr', 'en', 'deu', 'ru'];
  email: string = 'whatchcam@gmail.com';
  phone: string = '+380 664 367 109';
  message: string = '';
  showNotification: boolean = false;
  notificationMessage: string = 'Copied';
  subject: string = '';

  constructor(
    private themeService: ThemeService,
    private translator: TranslateService
  ) {}
  ngAfterContentInit(): void {
    this.isDarkTheme = this.themeService.theme === 'dark';
    this.toggleTheme();
  }

  toggleTheme() {
    let theme: string = this.isDarkTheme ? 'dark' : 'default';
    this.isDarkTheme = !this.isDarkTheme;
    this.themeService.setTheme(theme);
  }

  ngOnInit(): void {
    this.onWindowScroll();
    const defaultLang = localStorage.getItem('lang') || 'en';
    this.translator.setDefaultLang(defaultLang);
    this.translator.use(defaultLang);
  }

  changeLanguage(lang: string) {
    this.translator.use(lang);
    localStorage.setItem('lang', lang);
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(
      () => {
        this.showNotificationMessage(`${text} copied to clipboard`);
      },
      (err) => {
        console.error('Could not copy text: ', err);
      }
    );
  }

  showNotificationMessage(message: string) {
    this.notificationMessage = message;
    this.showNotification = true;
    setTimeout(() => {
      this.showNotification = false;
    }, 3000);
  }

  isMobileDevice(): boolean {
    const userAgent = navigator.userAgent.toLowerCase();
    return (
      /iphone|ipod|ipad|android/.test(userAgent) ||
      (navigator.maxTouchPoints && navigator.maxTouchPoints > 2) ||
      (window.innerWidth < 600 && window.innerHeight < 600)
    );
  }

  sendEmail(event: Event) {
    if (this.isMobileDevice()) {
      const emailLink = `mailto:${this.email}?subject=${encodeURIComponent(
        this.subject
      )}&body=${encodeURIComponent(this.message)}`;
      window.location.href = emailLink;
    } else {
      event.preventDefault();
      const emailLink = `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${
        this.email
      }&su=${encodeURIComponent(this.subject)}&body=${encodeURIComponent(
        this.message
      )}`;
      window.open(emailLink, '_blank');
    }
  }
}
