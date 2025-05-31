import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Message } from '../models/message.model';
import { ChatRoom } from '../models/chat-room.model';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    private messagesSubject = new BehaviorSubject<Message[]>([]);
    public messages$ = this.messagesSubject.asObservable();

    private chatRoomsSubject = new BehaviorSubject<ChatRoom[]>([]);
    public chatRooms$ = this.chatRoomsSubject.asObservable();

    private activeRoomSubject = new BehaviorSubject<string>('general');
    public activeRoom$ = this.activeRoomSubject.asObservable();

    private usersSubject = new BehaviorSubject<User[]>([]);
    public users$ = this.usersSubject.asObservable();

    constructor(private authService: AuthService) {
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
            { id: '1', name: 'Alex Johnson', email: 'alex@example.com', status: 'online', avatar: 'https://i.pravatar.cc/150?u=alex' },
            { id: '2', name: 'Maya Rodriguez', email: 'maya@example.com', status: 'away', avatar: 'https://i.pravatar.cc/150?u=maya' },
            { id: '3', name: 'Sam Taylor', email: 'sam@example.com', status: 'offline', avatar: 'https://i.pravatar.cc/150?u=sam' },
            { id: '4', name: 'Jordan Lee', email: 'jordan@example.com', status: 'online', avatar: 'https://i.pravatar.cc/150?u=jordan' }
        ];
        this.usersSubject.next(mockUsers);

        // Mock messages for the general room
        const mockMessages: Message[] = [
            {
                id: '1',
                roomId: 'general',
                senderId: '2',
                senderName: 'Maya Rodriguez',
                senderAvatar: 'https://i.pravatar.cc/150?u=maya',
                content: 'Hey everyone! How are you doing today?',
                timestamp: new Date(Date.now() - 3600000).toISOString(),
            },
            {
                id: '2',
                roomId: 'general',
                senderId: '3',
                senderName: 'Sam Taylor',
                senderAvatar: 'https://i.pravatar.cc/150?u=sam',
                content: 'I\'m working on a new project. It\'s quite exciting!',
                timestamp: new Date(Date.now() - 2700000).toISOString(),
            },
            {
                id: '3',
                roomId: 'general',
                senderId: '4',
                senderName: 'Jordan Lee',
                senderAvatar: 'https://i.pravatar.cc/150?u=jordan',
                content: 'That sounds interesting, Sam! What kind of project is it?',
                timestamp: new Date(Date.now() - 2400000).toISOString(),
            },
            {
                id: '4',
                roomId: 'general',
                senderId: '3',
                senderName: 'Sam Taylor',
                senderAvatar: 'https://i.pravatar.cc/150?u=sam',
                content: 'It\'s a new chat application using Angular and real-time technologies!',
                timestamp: new Date(Date.now() - 1800000).toISOString(),
            },
            {
                id: '5',
                roomId: 'general',
                senderId: '2',
                senderName: 'Maya Rodriguez',
                senderAvatar: 'https://i.pravatar.cc/150?u=maya',
                content: 'Wow, that sounds like what we\'re using right now! 😄',
                timestamp: new Date(Date.now() - 900000).toISOString(),
            },
            {
                id: '6',
                roomId: 'random',
                senderId: '2',
                senderName: 'Maya Rodriguez',
                senderAvatar: 'https://i.pravatar.cc/150?u=maya',
                content: 'Wow, that sounds like what we\'re using right now! 😄',
                timestamp: new Date(Date.now() - 900000).toISOString(),
            },
            {
                id: '7',
                roomId: 'random',
                senderId: '2',
                senderName: 'Maya Rodriguez',
                senderAvatar: 'https://i.pravatar.cc/150?u=maya',
                content: 'Wow, that sounds like what we\'re using right now! 😄',
                timestamp: new Date(Date.now() - 900000).toISOString(),
            },
            {
                id: '8',
                roomId: 'general',
                senderId: '2',
                senderName: 'Maya Rodriguez',
                senderAvatar: 'https://i.pravatar.cc/150?u=maya',
                content: 'Wow, that sounds like what we\'re using right now! 😄',
                timestamp: new Date(Date.now() - 900000).toISOString(),
            },
            {
                id: '9',
                roomId: 'general',
                senderId: '2',
                senderName: 'Maya Rodriguez',
                senderAvatar: 'https://i.pravatar.cc/150?u=maya',
                content: 'Wow, that sounds like what we\'re using right now! 😄',
                timestamp: new Date(Date.now() - 900000).toISOString(),
            },
            {
                id: '9',
                roomId: 'general',
                senderId: '2',
                senderName: 'Maya Rodriguez',
                senderAvatar: 'https://i.pravatar.cc/150?u=maya',
                content: 'Wow, that sounds like what we\'re using right now! 😄',
                timestamp: new Date(Date.now() - 900000).toISOString(),
            },
        ];
        this.messagesSubject.next(mockMessages);
    }

    getMessages(roomId: string): Observable<Message[]> {
        // For demo purposes, filter the existing messages by room
        const filteredMessages = this.messagesSubject.value
            .filter(message => message.roomId === roomId);

        return of(filteredMessages).pipe(delay(300));
    }

    sendMessage(content: string, roomId: string): Observable<Message> {
        const currentUser = this.authService.getCurrentUser();

        if (!currentUser) {
            throw new Error('User not authenticated');
        }

        const newMessage: Message = {
            id: Date.now().toString(),
            roomId: roomId,
            senderId: currentUser.id,
            senderName: currentUser.name,
            senderAvatar: currentUser.avatar,
            content: content,
            timestamp: new Date().toISOString(),
        };

        // Add to existing messages
        const updatedMessages = [...this.messagesSubject.value, newMessage];
        this.messagesSubject.next(updatedMessages);

        return of(newMessage).pipe(delay(200));
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
}