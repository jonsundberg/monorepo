// Simulerar en API-anrop för inloggning
export async function loginUser(
  username: string,
  password: string
): Promise<boolean> {
  // I en riktig app skulle detta vara ett API-anrop till en backend
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(username === 'test' && password === 'password');
    }, 500); // Simulerar nätverksfördröjning
  });
}

// Hämta användarinformation från local storage
export function getUserFromStorage(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('user');
  }
  return null;
}

// Spara användarinformation i local storage
export function setUserInStorage(user: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', user);
    document.cookie = `user=${user}; path=/; max-age=86400; samesite=strict; secure`;
  }
}

// Ta bort användarinformation från local storage
export function removeUserFromStorage(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
    document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
}

// Kontrollera om användaren är inloggad
export function isUserLoggedIn(): boolean {
  return getUserFromStorage() !== null;
}
