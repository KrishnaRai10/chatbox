import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmojiDialogComponent } from '../emoji-dialog/emoji-dialog.component';
import { BehaviorSubject, debounceTime, distinctUntilChanged } from 'rxjs';


@Component({
  selector: 'app-message-input',
  standalone: false,
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.scss',
})
export class MessageInputComponent implements AfterViewInit {
  @Output() messageSent = new EventEmitter<string>();
  @ViewChild('emojiPicker') emojiPicker!: ElementRef;
  @ViewChild('emojiInput') emojiInput!: ElementRef<HTMLInputElement>;
  @Output() userTyping = new EventEmitter<boolean>(); // Emit when typing
  private typingSubject = new BehaviorSubject<boolean>(false);
  constructor(private dialogRef: MatDialog) { }
  messageText: string = '';
  ngAfterViewInit(): void {
    this.triggerDebounce()
  }
  sendMessage(): void {
    if (this.messageText.trim() === '') return;
    this.messageSent.emit(this.messageText);
    this.messageText = '';
  }
  onInputChange() {
    this.typingSubject.next(true); // Notify typing subject to trigger 
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

  triggerDebounce() {
    this.typingSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((typing) => {
      if (typing) {
        this.userTyping.emit(true); // Emit true once user starts typing
        // Optional: emit false after a delay if no further typing
        setTimeout(() => this.typingSubject.next(false), 1000);
      }
    });
  }

}
