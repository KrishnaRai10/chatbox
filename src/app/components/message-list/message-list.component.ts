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
  @ViewChild('messageContainer') private messageContainer!: ElementRef;
  private shouldScrollToBottom = true;

  ngAfterViewChecked(): void {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
    }
  }

  scrollToBottom(): void {
    try {
      this.messageContainer.nativeElement.scrollTop =
        this.messageContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }

  trackByMessageId(index: number, message: Message): string {
    return message.id;
  }
}
