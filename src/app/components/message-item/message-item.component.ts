import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-message-item',
  standalone: false,
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.scss'
})
export class MessageItemComponent implements OnInit {
  @Input() message!: Message;
  @Input() isOwnMessage: boolean = true;

  formatMessageTime(timestamp: string): string {
    // const timestamp = new Date(Date.now() - 3600000).toISOString()
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  }
  ngOnInit(): void {
  }
  getEmotionClass(message: string): string {
    if (!message) return 'default-message';
    const lowerMsg = message.toLowerCase();
    if (lowerMsg.includes('angry') || lowerMsg.includes('mad') || lowerMsg.includes('frustrated')) {
      return 'angry';
    } else if (lowerMsg.includes('happy') || lowerMsg.includes('glad') || lowerMsg.includes('joy')) {
      return 'happy';
    } else if (lowerMsg.includes('sad') || lowerMsg.includes('unhappy') || lowerMsg.includes('depressed')) {
      return 'sad';
    } else if (lowerMsg.includes('surprised') || lowerMsg.includes('wow') || lowerMsg.includes('shocked')) {
      return 'surprised';
    }
    return 'neutral';
  }

}
