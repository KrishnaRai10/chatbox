import { AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Message } from '../../models/message.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-message-list',
  standalone: false,
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.scss'
})
export class MessageListComponent implements AfterViewChecked {
  @Input() messages: Message[] = [];
  @Input() currentUserId: string = '';
  @Input() typingUser!: any | null;
  constructor() {

  }
  ngAfterViewChecked(): void {
    if (this.typingUser) {
    }
  }
  trackByMessageId(index: number, message: Message): string {
    return message.id ?? '';
  }
}
