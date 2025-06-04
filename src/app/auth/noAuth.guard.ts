import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const noAuthGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const chatUser = localStorage.getItem('ChatUser');
    const token = chatUser ? JSON.parse(chatUser).auth : null;

    if (token) {
        // Redirect to dashboard or default route
        router.navigate(['/chat']);
        return false;
    }
    return true;
};
