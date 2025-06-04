import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
// emoji.component.ts (or wherever you use it)
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-emoji-dialog',
  templateUrl: './emoji-dialog.component.html',
  styleUrl: './emoji-dialog.component.scss',
  // encapsulation: ViewEncapsulation.None
})
export class EmojiDialogComponent {
  messageText: string = '';
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private dialogRef: MatDialogRef<EmojiDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { onEmojiSelect: (emoji: string) => void }
  ) { }
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      import('emoji-picker-element')
    }
    // Send data when clicking outside the dialog
    this.dialogRef.backdropClick().subscribe(() => {
      this.dialogRef.close(this.messageText);
    });
  }
  onEmojiClick(event: any) {
    const emoji = event.detail.unicode;
    // Emit to parent in real-time
    this.data?.onEmojiSelect?.(emoji);
  }
}
