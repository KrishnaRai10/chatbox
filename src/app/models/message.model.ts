export interface Message {
    id: string;
    roomId: string;
    senderId: string;
    senderName: string;
    senderAvatar: string;
    content: string;
    timestamp: string;
}