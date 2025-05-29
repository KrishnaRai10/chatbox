import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChatRoom } from '../../models/chat-room.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() rooms: ChatRoom[] = [];
  @Input() activeRoomId: string = '';
  @Input() currentUser: User | null = null;
  @Input() isMobileOpen: boolean = false;

  @Output() roomSelected = new EventEmitter<string>();
  @Output() logout = new EventEmitter<void>();
  @Output() toggleMobile = new EventEmitter<void>();
}
