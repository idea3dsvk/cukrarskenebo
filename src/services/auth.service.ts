import { Injectable, signal } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAdmin = signal(false);
  private loginAttempts = signal(0);
  private lockoutTime = signal<number | null>(null);

  login(password: string): boolean {
    // Check if account is locked
    if (this.isAccountLocked()) {
      return false;
    }

    // In a real app, this would be a call to a backend service with proper hashing
    if (password === environment.adminPassword) {
      this.isAdmin.set(true);
      this.resetLoginAttempts();
      return true;
    } else {
      this.incrementLoginAttempts();
      return false;
    }
  }

  logout(): void {
    this.isAdmin.set(false);
  }

  private incrementLoginAttempts(): void {
    const attempts = this.loginAttempts() + 1;
    this.loginAttempts.set(attempts);
    
    // Lock account after 3 failed attempts for 5 minutes
    if (attempts >= 3) {
      this.lockoutTime.set(Date.now() + 5 * 60 * 1000);
    }
  }

  private resetLoginAttempts(): void {
    this.loginAttempts.set(0);
    this.lockoutTime.set(null);
  }

  private isAccountLocked(): boolean {
    const lockTime = this.lockoutTime();
    if (lockTime && Date.now() < lockTime) {
      return true;
    }
    if (lockTime && Date.now() >= lockTime) {
      this.resetLoginAttempts();
    }
    return false;
  }

  getRemainingLockoutTime(): number {
    const lockTime = this.lockoutTime();
    if (!lockTime) return 0;
    return Math.max(0, lockTime - Date.now());
  }

  getLoginAttempts(): number {
    return this.loginAttempts();
  }
}
