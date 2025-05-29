import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessageInputComponent } from './components/message-input/message-input.component';
import { ChatComponent } from './pages/chat/chat.component';

const routes: Routes = [
  { path: 'chat', component: ChatComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
