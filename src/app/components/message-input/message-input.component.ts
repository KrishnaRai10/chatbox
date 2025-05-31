import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-message-input',
  standalone: false,
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.scss'
})
export class MessageInputComponent {
  @Output() messageSent = new EventEmitter<string>();
  messageText: string = '';

  sendMessage(): void {
    if (this.messageText.trim() === '') return;

    this.messageSent.emit(this.messageText);
    this.messageText = '';
  }
}
