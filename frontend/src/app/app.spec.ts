import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let translateService: TranslateService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, TranslateModule.forRoot(), StoreModule.forRoot()],
      providers: [TranslateService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle theme correctly', () => {
    const initialTheme = component.isDarkTheme;
    component.toggleTheme();
    expect(component.isDarkTheme).toBe(!initialTheme);
  });

  it('should copy text to clipboard', async () => {
    const textToCopy = 'example@example.com';
    spyOn(navigator.clipboard, 'writeText').and.returnValue(Promise.resolve());
    await component.copyToClipboard(textToCopy);
    expect(component.showNotification).toBe(true);
    expect(component.notificationMessage).toContain('copied to clipboard');
  });

  it('should handle clipboard copy failure', async () => {
    const textToCopy = 'example@example.com';
    spyOn(navigator.clipboard, 'writeText').and.returnValue(Promise.reject());
    await component.copyToClipboard(textToCopy);
    expect(component.showNotification).toBe(false);
  });

  it('should scroll to top smoothly', () => {
    spyOn(window, 'scrollTo');
    component.scrollToTop();
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });
});
