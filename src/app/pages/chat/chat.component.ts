import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import { Message } from '../../models/message.model';
import { ChatRoom } from '../../models/chat-room.model';
import { AuthService } from '../../services/auth.service';
import { ChatService } from '../../services/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  standalone: false,
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  messages: Message[] = [];
  chatRooms: ChatRoom[] = [];
  users: User[] = [];
  currentUser: User | null = null;
  activeRoomId: string = 'general';
  activeRoomName: string = 'General';
  isMobileSidebarOpen: boolean = false;
  isUserListOpen: boolean = true;

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Get current user
    this.currentUser = this.authService.getCurrentUser();

    // Subscribe to chat rooms
    this.chatService.chatRooms$.subscribe(rooms => {
      this.chatRooms = rooms;
      // Find active room name
      const activeRoom = rooms.find(room => room.id === this.activeRoomId);
      if (activeRoom) {
        this.activeRoomName = activeRoom.name;
      }
    });

    // Subscribe to users
    this.chatService.users$.subscribe(users => {
      this.users = users;
    });

    // Subscribe to active room changes
    this.chatService.activeRoom$.subscribe(roomId => {
      this.activeRoomId = roomId;
      this.loadMessages(roomId);
    });

    // Initial load of messages
    this.loadMessages(this.activeRoomId);
  }

  ngAfterViewChecked(): void {
    // Implementation if needed for scrolling to bottom of messages
  }

  get onlineUsers(): User[] {
    return this.users.filter(user => user.status === 'online');
  }

  loadMessages(roomId: string): void {
    this.chatService.getMessages(roomId).subscribe(messages => {
      this.messages = messages;
    });
  }

  selectRoom(roomId: string): void {
    this.chatService.setActiveRoom(roomId);

    // If on mobile, close sidebar after selection
    if (window.innerWidth < 768) {
      this.isMobileSidebarOpen = false;
    }
  }

  sendMessage(content: string): void {
    if (content.trim() === '') return;

    this.chatService.sendMessage(content, this.activeRoomId).subscribe({
      next: (message) => {
        // Message successfully sent and added to the messages array via the subscription
      },
      error: (error) => {
        console.error('Failed to send message:', error);
      }
    });
  }

  toggleMobileSidebar(): void {
    this.isMobileSidebarOpen = !this.isMobileSidebarOpen;
  }

  toggleUserList(): void {
    this.isUserListOpen = !this.isUserListOpen;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
