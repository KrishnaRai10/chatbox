import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChatRoom } from '../../models/chat-room.model';
import { User } from '../../models/user.model';
import { channel } from 'diagnostics_channel';
import { ChannelDialogComponent } from '../channel-dialog/channel-dialog.component';
import {
  MatDialog, MatDialogRef
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  constructor(private dialog: MatDialog, private toastr: ToastrService, private chatService: ChatService) { }
  @Input() rooms: ChatRoom[] = [];
  @Input() activeRoomId: string = '';
  @Input() currentUser: User | null = null;
  @Input() isMobileOpen: boolean = false;

  @Output() roomSelected = new EventEmitter<string>();
  @Output() logout = new EventEmitter<void>();
  @Output() toggleMobile = new EventEmitter<void>();
  ngOnInit(): void {
    this.getRooms()
  }
  openAddChannelDialog() {
    const dialogRef = this.dialog.open(ChannelDialogComponent, {
      disableClose: false,
      // You can also pass data or other config options here
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      // Expect result to be an object like 
      if (result && result.event === "add") {
        const channelName = result.channelName;
        if (channelName) {
          this.addRoom(channelName);
        }
      }
    });
  }
  addRoom(name: string) {
    let payload = {
      name: name
    }

    this.chatService.addRooms(payload).subscribe((res) => {
      this.rooms.push(res.room);
      this.getRooms()
      this.toastr.success(res.message)
    })
  }
  getRooms() {
    this.chatService.getRooms().subscribe((res) => {
      this.rooms = res;
      if (this.rooms && this.rooms.length > 0) {
        this.selectRoom(this.rooms[0].id, this.rooms[0].name)
        this.setFirstActiveRoom(this.rooms)

      }
    })
  }
  selectRoom(roomId: string, name: string) {
    this.activeRoomId = roomId;
    this.roomSelected.emit(roomId); // if needed by parent component
    this.chatService.activeRoomSubject.next(name);
    this.chatService.activeRoomIdSubject.next(this.activeRoomId);

  }
  setFirstActiveRoom(room: any) {
    if (room && room.length > 0) {
      this.activeRoomId = room[0].id;
      console.log(this.activeRoomId)
      this.chatService.activeRoomSubject.next(room[0].name);
      this.chatService.activeRoomIdSubject.next(this.activeRoomId);
    }
  }

}
