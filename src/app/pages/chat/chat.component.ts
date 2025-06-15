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
  activeRoomId!: string;
  activeRoomName!: string;
  isMobileSidebarOpen: boolean = false;
  isUserListOpen: boolean = true;

  typingUser!: User | null;
  typingTimeout: any;
  user = this.authService.getCurrentUser();
  @ViewChild('messageContainer') private messageContainer!: ElementRef;
  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private router: Router,
    private toast: ToastrService,
    private echoService: EchoService
  ) { }

  async ngOnInit(): Promise<void> {
    if (this.user && this.user.id) {
      this.currentUser = { ...this.user };
    } else {
      this.currentUser = null;
    }
    await this.echoService.echoReady;

    // 👇 Real-time message listening
    // 👇 Subscribe to room changes AFTER echo is ready
    this.chatService.activeRoomId$.subscribe((roomId) => {
      this.activeRoomId = roomId;

      if (!this.activeRoomId || !this.echoService.echo) return;

      // 👇 Load messages
      this.loadMessages(this.activeRoomId);

      // 👇 Listen to chat messages
      this.echoService.listenToChatChannel(this.activeRoomId, (message: Message) => {
        this.messages.push({
          user_id: message.user_id,
          content: message.content,
          type: message.type,
          emotion: message.emotion,
          created_at: message.created_at,
          user_profile: message.user_profile
        });

        this.scrollToBottom();
      });

      // 👇 Listen to typing
      this.echoService.listenToTyping(this.activeRoomId, (data) => {
        if (data.userId !== this.user?.id) {
          this.typingUser = data;
          console.log(this.typingUser)

          clearTimeout(this.typingTimeout);
          this.typingTimeout = setTimeout(() => {
            this.typingUser = null;
          }, 3000);
        }
      });
    });
  }
  handleTyping() {
    let payoad = {
      user_id: this.user?.id,
      room_id: this.activeRoomId
    }
    this.chatService.typing(payoad).subscribe({
      next: () => {
        // this.userTyping()
      },
      error: (error) => {
        console.error('Failed to send typing event:', error);
      }
    })
  }

  ngAfterViewChecked(): void {
    // Implementation if needed for scrolling to bottom of messages
    this.chatService.activeRoom$.subscribe((res) => {
      // You can handle the emitted value here if needed
      // For example, update activeRoomId or perform other actions
      this.activeRoomName = res;

    })
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
    this.chatService.getMessages(roomId).subscribe(newMessages => {
      const message = newMessages.slice().reverse();
      this.messages.push(...message);
      setTimeout(() => this.scrollToBottom(), 0);
    });

  }

  selectRoom(roomId: string): void {
    this.chatService.setActiveRoom(roomId);
    this.activeRoomId = roomId
    // If on mobile, close sidebar after selection
    if (window.innerWidth < 768) {
      this.isMobileSidebarOpen = false;
    }
  }

  sendMessage(content: string): void {
    if (content.trim() === '') return;
    const currentUser = this.authService.getCurrentUser();
    if (currentUser?.id && this.activeRoomId) {
      let payload = {
        user_id: currentUser.id,
        room_id: this.activeRoomId,
        type: 'text',              // You can adjust if it's image, file, etc.
        message: content,
        emotion: 0                 // Default emotion, adjust if needed
      }

      this.chatService.sendMessage(payload).subscribe({
        next: (message) => {
          this.loadMessages(payload.room_id);
          payload = null as any;
        },
        error: (error) => {
          console.error('Failed to send message:', error);
        },
      });
    }

  }
  userTyping() {
    this.echoService.listenToTyping(this.activeRoomId, (data) => {
      if (data.userId !== this.user?.id) {
        this.typingUser = data;

        // Reset after a delay (e.g., 3s)
        clearTimeout(this.typingTimeout);
        this.typingTimeout = setTimeout(() => {
          this.typingUser = null;
        }, 3000);
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
