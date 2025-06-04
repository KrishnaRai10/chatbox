import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { apiUrl, endPoints } from './constant';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject = new BehaviorSubject<User | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    ChatUser = localStorage.getItem('ChatUser');
    user = this.ChatUser ? JSON.parse(this.ChatUser).user : null;

    // For demo purposes, we're using localStorage
    constructor(private http: HttpClient) {
        if (typeof window !== 'undefined' && localStorage.getItem('currentUser')) {
            const savedUser = localStorage.getItem('currentUser');
            if (savedUser) {
                this.currentUserSubject.next(JSON.parse(savedUser));
            }
        }
    }


    register(credential: any): Observable<any> {
        // For demo purposes, simulating a login response
        return this.http.post(`${apiUrl}${endPoints.register}`, credential).pipe(
            tap((response: any) => {
                this.setAuthData(response);
            })
        );;
    }

    login(credential: any): Observable<any> {
        // For demo purposes, simulating a registration response
        return this.http.post(`${apiUrl}${endPoints.login}`, credential).pipe(
            tap((response: any) => {
                this.setAuthData(response);
            })
        );
    }
    private setAuthData(response: any): void {
        if (response.token && response.user) {
            let chatUser = {
                auth: response.token,
                user: response.user
            }
            localStorage.setItem('ChatUser', JSON.stringify(chatUser));
        }
    }

    getToken(): string | null {
        return localStorage.getItem('ChatUser') ? JSON.parse(localStorage.getItem('ChatUser') || '{}').auth : null;
    }

    logout(): void {
        localStorage.removeItem('ChatUser');
    }

    isAuthenticated(): boolean {
        return !!this.currentUserSubject.value;
    }

    getCurrentUser(): User | null {
        return this.user || JSON.parse(localStorage.getItem('ChatUser') || 'null').user || null;

    }
}