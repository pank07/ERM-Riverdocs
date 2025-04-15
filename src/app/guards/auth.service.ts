import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'user_token';

  constructor() { }

  isLoggedIn(): boolean {
    const token = this.getToken();
    // Add additional validation here, such as token expiration checks if needed
    return !!token;
  }

  /**
   * Store the authentication token in localStorage
   * @param token - JWT or authentication token
   */
  login(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  /**
   * Clear the authentication token to log out the user
   */
  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  /**
   * Retrieve the authentication token from localStorage
   * @returns Token or null if not available
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
