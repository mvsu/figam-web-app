import { Injectable, signal } from '@angular/core';
import { ThemeColor, ThemeMode } from './api';

const KEY = 'theme';
const COLOR_KEY = 'theme-color';

function stored(): ThemeMode {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'light' || v === 'dark' ? v : 'system';
  } catch {
    return 'system';
  }
}

function storedColor(): ThemeColor {
  try {
    const value = localStorage.getItem(COLOR_KEY);
    return value === 'blue' || value === 'violet' || value === 'amber' ? value : 'green';
  } catch {
    return 'green';
  }
}

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly mode = signal<ThemeMode>(stored());
  readonly color = signal<ThemeColor>(storedColor());
  private readonly darkQuery = window.matchMedia?.('(prefers-color-scheme: dark)');

  constructor() {
    this.apply();
    this.darkQuery?.addEventListener('change', () => this.apply());
    window.api?.setTheme(this.mode());
  }

  set(mode: ThemeMode) {
    this.mode.set(mode);
    try {
      localStorage.setItem(KEY, mode);
    } catch {
      // storage blocked: the choice just isn't remembered
    }
    this.apply();
    window.api?.setTheme(mode); // also themes the window frame
  }

  setColor(color: ThemeColor) {
    this.color.set(color);
    try {
      localStorage.setItem(COLOR_KEY, color);
    } catch {
      // storage blocked: the choice just isn't remembered
    }
    this.apply();
  }

  private apply() {
    const m = this.mode();
    const dark = m === 'dark' || (m === 'system' && !!this.darkQuery?.matches);
    document.documentElement.dataset['bsTheme'] = dark ? 'dark' : 'light';
    document.documentElement.dataset['themeColor'] = this.color();
  }
}
