import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-message-list',
  standalone: false,
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.scss'
})
export class MessageListComponent {
  @Input() messages: Message[] = [];
  @Input() currentUserId: string = '';

  trackByMessageId(index: number, message: Message): string {
    return message.id;
  }
}
