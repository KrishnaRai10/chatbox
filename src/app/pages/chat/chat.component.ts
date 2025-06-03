import { Component, ElementRef, ViewChild } from '@angular/core';
import { User } from '../../models/user.model';
import { Message } from '../../models/message.model';
import { ChatRoom } from '../../models/chat-room.model';
import { AuthService } from '../../services/auth.service';
import { ChatService } from '../../services/chat.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EchoService } from '../../services/echo.service';

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

  typingUser: string | null = null;
  roomId: string = '417dce77-31af-4057-96dc-22c8c186f1c7';
  @ViewChild('messageContainer') private messageContainer!: ElementRef;
  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private router: Router,
    private toast: ToastrService,
    private echoService: EchoService
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

    // this.echoService.echo.channel(`chat.room.${this.roomId}`)
    //   .listen('.user.typing', (e: any) => {
    //     this.typingUser = e.username || 'Someone';
    //     setTimeout(() => this.typingUser = null, 2000); // Reset after 2 sec
    //   });
  }
  handleTyping() {
    this.chatService.typing(this.activeRoomId).subscribe({
      next: () => {
        // Optionally handle successful typing event
      },
      error: (error) => {
        console.error('Failed to send typing event:', error);
      }
    })
  }


  ngAfterViewChecked(): void {
    this.scrollToBottom()// Implementation if needed for scrolling to bottom of messages
  }
  scrollToBottom(): void {
    try {
      this.messageContainer.nativeElement.scrollTop =
        this.messageContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
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
        this.messages.push(message);
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
