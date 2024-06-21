import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, OnChanges, SimpleChanges } from '@angular/core';
import { THEMES } from '../theme.config';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public theme: string;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.theme = localStorage.getItem('theme') || 'default';
    this.applyStyles();
  }

  setTheme(name: string) {
    localStorage.setItem('theme', name);
    this.theme = name;
    this.applyStyles();
  }

  private applyStyles() {
    const styles = THEMES[this.theme];
    Object.keys(styles).forEach((key) => {
      this.document.documentElement.style.setProperty(`--${key}`, styles[key]);
    });
  }
}
