import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject = new BehaviorSubject<User | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    // For demo purposes, we're using localStorage
    constructor() {
        if (typeof window !== 'undefined' && localStorage.getItem('currentUser')) {
            const savedUser = localStorage.getItem('currentUser');
            if (savedUser) {
                this.currentUserSubject.next(JSON.parse(savedUser));
            }
        }
    }


    login(email: string, password: string): Observable<User> {
        // For demo purposes, simulating a login response
        const mockUser: User = {
            id: '1',
            name: 'Demo User',
            email: email,
            avatar: 'https://i.pravatar.cc/150?u=' + email,
            status: 'online'
        };

        // Simulate network delay
        return of(mockUser).pipe(
            delay(800),
            tap(user => {
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
            })
        );
    }

    register(name: string, email: string, password: string): Observable<User> {
        // For demo purposes, simulating a registration response
        const mockUser: User = {
            id: Math.random().toString(36).substring(2, 9),
            name: name,
            email: email,
            avatar: 'https://i.pravatar.cc/150?u=' + email,
            status: 'online'
        };

        // Simulate network delay
        return of(mockUser).pipe(
            delay(1000),
            tap(user => {
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
            })
        );
    }

    logout(): void {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    isAuthenticated(): boolean {
        return !!this.currentUserSubject.value;
    }

    getCurrentUser(): User | null {
        return this.currentUserSubject.value;
    }
}