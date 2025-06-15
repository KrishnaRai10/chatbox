export interface Message {
    id?: string;
    roomId?: string;
    senderId?: string;
    user_id?: string; // Optional for compatibility with older messages
    senderName?: string;
    display_name?: string;
    type: string;
    emotion: string;
    senderAvatar?: string;
    content: string;
    user_profile: UserProfile;
    timestamp?: string;
    created_at: string;
}
interface UserProfile {
    id: string;
    username: string;
    email: string;
    avatar: string;
}