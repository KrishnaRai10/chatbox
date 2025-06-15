import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmojiDialogComponent } from '../emoji-dialog/emoji-dialog.component';


@Component({
  selector: 'app-message-input',
  standalone: false,
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.scss',
})
export class MessageInputComponent {
  @Output() messageSent = new EventEmitter<string>();
  @ViewChild('emojiPicker') emojiPicker!: ElementRef;
  @ViewChild('emojiInput') emojiInput!: ElementRef<HTMLInputElement>;
  @Output() userTyping = new EventEmitter<boolean>(); // Emit when typing
  constructor(private dialogRef: MatDialog) { }
  messageText: string = '';

  sendMessage(): void {
    if (this.messageText.trim() === '') return;
    this.messageSent.emit(this.messageText);
    this.messageText = '';
  }
  onInputChange() {
    this.userTyping.emit(true); // Notify parent user is typing
  }
  openEmojiDialog() {
    const dialogRef = this.dialogRef.open(EmojiDialogComponent, {
      width: '400px',
      panelClass: 'emoji-dialog',
      data: {
        onEmojiSelect: (emoji: string) => {
          this.messageText += emoji;
        }
      }
    })
    dialogRef.afterClosed().subscribe((result: string) => {
      if (result) {
        // Use the emoji in your input or message field
        this.messageText += result;
      }
    });
  }


}
