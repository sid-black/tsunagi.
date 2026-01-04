
export const storage = {
  get: async (key: string) => {
    // Attempt to use environment-specific window.storage if available
    if ((window as any).storage && (window as any).storage.get) {
      return (window as any).storage.get(key);
    }
    const val = localStorage.getItem(key);
    return val ? { value: val } : null;
  },
  set: async (key: string, value: string) => {
    if ((window as any).storage && (window as any).storage.set) {
      return (window as any).storage.set(key, value);
    }
    localStorage.setItem(key, value);
  }
};
