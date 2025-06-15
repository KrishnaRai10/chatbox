import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Message } from '../models/message.model';
import { ChatRoom } from '../models/chat-room.model';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { apiUrl, endPoints } from './constant';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    private messagesSubject = new BehaviorSubject<Message[]>([]);
    public messages$ = this.messagesSubject.asObservable();

    private chatRoomsSubject = new BehaviorSubject<ChatRoom[]>([]);
    public chatRooms$ = this.chatRoomsSubject.asObservable();

    public activeRoomSubject = new BehaviorSubject<string>('');
    public activeRoom$ = this.activeRoomSubject.asObservable();

    public activeRoomIdSubject = new BehaviorSubject<string>('');
    public activeRoomId$ = this.activeRoomIdSubject.asObservable();

    private usersSubject = new BehaviorSubject<User[]>([]);
    public users$ = this.usersSubject.asObservable();

    getHeader() {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            //   Add Authorization token if required:
            'Authorization': `Bearer ${this.authService.getToken()}`
        });
    }
    constructor(private authService: AuthService, private http: HttpClient) {
        // Initialize with mock data
        this.initializeMockData();
    }

    private initializeMockData(): void {
        // Mock chat rooms
        const mockRooms: ChatRoom[] = [
            { id: 'general', name: 'General', unreadCount: 0 },
            { id: 'random', name: 'Random', unreadCount: 2 },
            { id: 'tech', name: 'Tech Talk', unreadCount: 0 },
            { id: 'news', name: 'News & Updates', unreadCount: 5 }
        ];
        this.chatRoomsSubject.next(mockRooms);

        // Mock users
        const mockUsers: User[] = [
            { id: '1', name: 'Alex Johnson', username: 'asjdbhf', email: 'alex@example.com', status: 'online', avatar: 'https://i.pravatar.cc/150?u=alex' },
            { id: '2', name: 'Maya Rodriguez', username: 'aouiwehru', email: 'maya@example.com', status: 'away', avatar: 'https://i.pravatar.cc/150?u=maya' },
            { id: '3', name: 'Sam Taylor', email: 'sam@example.com', username: 'aksjboiwe', status: 'offline', avatar: 'https://i.pravatar.cc/150?u=sam' },
            { id: '4', name: 'Jordan Lee', email: 'jordan@example.com', username: 'ajshdfbzxcv', status: 'online', avatar: 'https://i.pravatar.cc/150?u=jordan' }
        ];
        this.usersSubject.next(mockUsers);

        // Mock messages for the general room
        // const mockMessages: Message[] = [
        //     {
        //         id: '1',
        //         roomId: 'general',
        //         senderId: '2',
        //         senderName: 'Maya Rodriguez',
        //         senderAvatar: 'https://i.pravatar.cc/150?u=maya',
        //         content: 'Hey everyone! How are you doing today?',
        //         timestamp: new Date(Date.now() - 3600000).toISOString(),
        //     },
        //     {
        //         id: '2',
        //         roomId: 'general',
        //         senderId: '3',
        //         senderName: 'Sam Taylor',
        //         senderAvatar: 'https://i.pravatar.cc/150?u=sam',
        //         content: 'I\'m working on a new project. It\'s quite exciting!',
        //         timestamp: new Date(Date.now() - 2700000).toISOString(),
        //     },
        //     {
        //         id: '3',
        //         roomId: 'general',
        //         senderId: '4',
        //         senderName: 'Jordan Lee',
        //         senderAvatar: 'https://i.pravatar.cc/150?u=jordan',
        //         content: 'That sounds interesting, Sam! What kind of project is it?',
        //         timestamp: new Date(Date.now() - 2400000).toISOString(),
        //     },
        //     {
        //         id: '4',
        //         roomId: 'general',
        //         senderId: '3',
        //         senderName: 'Sam Taylor',
        //         senderAvatar: 'https://i.pravatar.cc/150?u=sam',
        //         content: 'It\'s a new chat application using Angular and real-time technologies!',
        //         timestamp: new Date(Date.now() - 1800000).toISOString(),
        //     },
        //     {
        //         id: '5',
        //         roomId: 'general',
        //         senderId: '2',
        //         senderName: 'Maya Rodriguez',
        //         senderAvatar: 'https://i.pravatar.cc/150?u=maya',
        //         content: 'Wow, that sounds like what we\'re using right now! 😄',
        //         timestamp: new Date(Date.now() - 900000).toISOString(),
        //     },
        //     {
        //         id: '6',
        //         roomId: 'random',
        //         senderId: '2',
        //         senderName: 'Maya Rodriguez',
        //         senderAvatar: 'https://i.pravatar.cc/150?u=maya',
        //         content: 'Wow, that sounds like what we\'re using right now! 😄',
        //         timestamp: new Date(Date.now() - 900000).toISOString(),
        //     },
        //     {
        //         id: '7',
        //         roomId: 'random',
        //         senderId: '2',
        //         senderName: 'Maya Rodriguez',
        //         senderAvatar: 'https://i.pravatar.cc/150?u=maya',
        //         content: 'Wow, that sounds like what we\'re using right now! 😄',
        //         timestamp: new Date(Date.now() - 900000).toISOString(),
        //     },
        //     {
        //         id: '8',
        //         roomId: 'general',
        //         senderId: '2',
        //         senderName: 'Maya Rodriguez',
        //         senderAvatar: 'https://i.pravatar.cc/150?u=maya',
        //         content: 'Wow, that sounds like what we\'re using right now! 😄',
        //         timestamp: new Date(Date.now() - 900000).toISOString(),
        //     },
        //     {
        //         id: '9',
        //         roomId: 'general',
        //         senderId: '2',
        //         senderName: 'Maya Rodriguez',
        //         senderAvatar: 'https://i.pravatar.cc/150?u=maya',
        //         content: 'Wow, that sounds like what we\'re using right now! 😄',
        //         timestamp: new Date(Date.now() - 900000).toISOString(),
        //     },
        //     {
        //         id: '9',
        //         roomId: 'general',
        //         senderId: '2',
        //         senderName: 'Maya Rodriguez',
        //         senderAvatar: 'https://i.pravatar.cc/150?u=maya',
        //         content: 'Wow, that sounds like what we\'re using right now! 😄',
        //         timestamp: new Date(Date.now() - 900000).toISOString(),
        //     },
        // ];
        // this.messagesSubject.next(mockMessages);
    }

    getMessages(roomId: string): Observable<any> {
        // For demo purposes, filter the existing messages by room
        return this.http.get<Message[]>(`${apiUrl}${endPoints.getMessages}?room_id=${roomId}`).pipe(
            delay(500), // Simulate network delay 
        );
    }
    getRooms(): Observable<any> {
        return this.http.get<ChatRoom[]>(`${apiUrl}${endPoints.room}`, { headers: this.getHeader() });
    }
    addRooms(name: any): Observable<any> {
        return this.http.post<ChatRoom>(`${apiUrl}${endPoints.room}`, name, { headers: this.getHeader() });
    }

    sendMessage(payload: any): Observable<any> {
        const currentUser = this.authService.getCurrentUser();
        if (!currentUser) {
            throw new Error('User not authenticated');
        }

        return this.http.post(`${apiUrl}${endPoints.sendMessages}`, payload, { headers: this.getHeader() });

    }

    setActiveRoom(roomId: string): void {
        this.activeRoomSubject.next(roomId);

        // Reset unread count for the selected room
        const updatedRooms = this.chatRoomsSubject.value.map(room =>
            room.id === roomId ? { ...room, unreadCount: 0 } : room
        );
        this.chatRoomsSubject.next(updatedRooms);
    }

    getActiveRoom(): string {
        return this.activeRoomSubject.value;
    }
    typing(payload: any): Observable<any> {
        return this.http.post(`${apiUrl}${endPoints.typing}`, payload, { headers: this.getHeader() });
    }
}