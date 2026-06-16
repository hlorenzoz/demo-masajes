export type ThemeName = 'light' | 'dark';

const STORAGE_KEY = 'theme';

function readInitial(): ThemeName {
  // Default oscuro (lujo premium); el claro es opt-in explícito del usuario.
  if (typeof localStorage === 'undefined') return 'dark';
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved === 'light' ? 'light' : 'dark';
}

class ThemeState {
  current = $state<ThemeName>(readInitial());

  get isDark(): boolean {
    return this.current === 'dark';
  }

  toggle(): void {
    this.current = this.current === 'light' ? 'dark' : 'light';
  }

  set(value: ThemeName): void {
    this.current = value;
  }
}

export const theme = new ThemeState();
