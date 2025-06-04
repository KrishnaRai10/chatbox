import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const chatUser = localStorage.getItem('ChatUser');
  let token = chatUser ? JSON.parse(chatUser).auth : null;

  if (token) {
    return true;
  } else {
    // Optional: Clear any existing data
    localStorage.removeItem('ChatUser')
    router.navigate(['/auth/login']);
    return false;
  }
};
