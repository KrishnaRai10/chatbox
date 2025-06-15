import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-typing',
  templateUrl: './typing.component.html',
  styleUrl: './typing.component.scss'
})
export class TypingComponent {
  @Input() senderAvatar!: string

}
