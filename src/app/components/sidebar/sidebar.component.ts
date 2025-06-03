import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChatRoom } from '../../models/chat-room.model';
import { User } from '../../models/user.model';
import { channel } from 'diagnostics_channel';
import { ChannelDialogComponent } from '../channel-dialog/channel-dialog.component';
import {
  MatDialog, MatDialogRef
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  constructor(private dialog: MatDialog, private toastr: ToastrService) { }
  @Input() rooms: ChatRoom[] = [];
  @Input() activeRoomId: string = '';
  @Input() currentUser: User | null = null;
  @Input() isMobileOpen: boolean = false;

  @Output() roomSelected = new EventEmitter<string>();
  @Output() logout = new EventEmitter<void>();
  @Output() toggleMobile = new EventEmitter<void>();
  ngOnInit(): void {
  }
  openAddChannelDialog() {
    const dialogRef = this.dialog.open(ChannelDialogComponent, {
      disableClose: false,
      // You can also pass data or other config options here
    });
    dialogRef.afterClosed().subscribe((channelName: string) => {
      if (channelName) {
        const newRoom = {
          id: Math.floor(Math.random() * 1000000).toString(), // or use UUID
          name: channelName,
          unreadCount: 0,
        };
        this.rooms.push(newRoom);
        this.toastr.success("Channel created successfully");
      }
    });
  }
}
