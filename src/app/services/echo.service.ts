// src/app/services/echo.service.ts
import Echo from 'laravel-echo';
import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

@Injectable({
    providedIn: 'root'
})
export class EchoService {
    public echo: Echo<any>;

    constructor() {
        this.echo = new Echo({
            broadcaster: 'socket.io',
            host: 'http://localhost:8080', // Adjust port if different
            client: io,
            // auth: {
            //     headers: {
            //         Authorization: `Bearer ${localStorage.getItem('token')}`
            //     }
            // }
        });
    }
}
