import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    })
      .compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.brand')?.textContent).toContain('System Monitor');
    expect(compiled.querySelectorAll('nav a').length).toBe(13);
  });

  it('should offer color themes under Appearance', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const choices = Array.from(compiled.querySelectorAll<HTMLButtonElement>('.palette-option'));
    expect(choices.map((choice) => choice.textContent?.trim())).toEqual(['Green', 'Blue', 'Violet', 'Amber']);
    choices[1].click();
    fixture.detectChanges();
    expect(document.documentElement.dataset['themeColor']).toBe('blue');
    expect(choices[1].getAttribute('aria-pressed')).toBe('true');
  });
});
