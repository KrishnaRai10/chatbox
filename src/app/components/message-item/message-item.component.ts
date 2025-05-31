import { Component, Input } from '@angular/core';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-message-item',
  standalone: false,
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.scss'
})
export class MessageItemComponent {
  @Input() message!: Message;
  @Input() isOwnMessage: boolean = false;

  formatMessageTime(timestamp: string): string {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}
