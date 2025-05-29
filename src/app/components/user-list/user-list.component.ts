import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  @Input() users: User[] = [];
  @Input() isOpen: boolean = true;
  @Output() close = new EventEmitter<void>();

  get onlineUsers(): User[] {
    return this.users.filter(user => user.status === 'online');
  }

  get awayUsers(): User[] {
    return this.users.filter(user => user.status === 'away');
  }

  get offlineUsers(): User[] {
    return this.users.filter(user => user.status === 'offline');
  }
}
