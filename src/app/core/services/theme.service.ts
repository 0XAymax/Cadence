import { Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'theme-preference';
  
  // Initialize signal with the stored preference or default to dark
  public theme = signal<Theme>(this.getInitialTheme());

  constructor() {
    // Apply the initial theme class immediately on service creation
    this.applyTheme(this.theme());
  }

  public setTheme(newTheme: Theme): void {
    this.theme.set(newTheme);
    localStorage.setItem(this.THEME_KEY, newTheme);
    this.applyTheme(newTheme);
  }

  public toggleTheme(): void {
    const current = this.theme();
    this.setTheme(current === 'light' ? 'dark' : 'light');
  }

  private getInitialTheme(): Theme {
    const storedTheme = localStorage.getItem(this.THEME_KEY) as Theme;
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }
    // Defaulting to dark mode, or you could use window.matchMedia
    return 'dark';
  }

  private applyTheme(theme: Theme): void {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
