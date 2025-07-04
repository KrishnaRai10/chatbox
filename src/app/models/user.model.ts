export interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
    username: string;
    status: 'online' | 'away' | 'offline';
}