import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-channel-dialog',
  standalone: false,
  templateUrl: './channel-dialog.component.html',
  styleUrl: './channel-dialog.component.scss'
})
export class ChannelDialogComponent {
  channelName: string = '';
  event: string = 'add'

  constructor(public dialogRef: MatDialogRef<ChannelDialogComponent>) { }

  addChannel() {
    if (this.channelName.trim()) {
      this.dialogRef.close({ channelName: this.channelName.trim(), event: this.event });
    }
  }
  closeDialog() {
    this.dialogRef.close(); // <--- This closes the dialog
  }
}
