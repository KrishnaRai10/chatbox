import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessageInputComponent } from './components/message-input/message-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageItemComponent } from './components/message-item/message-item.component';
import { MessageListComponent } from './components/message-list/message-list.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ChatComponent } from './pages/chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    MessageInputComponent,
    MessageItemComponent,
    MessageListComponent,
    SidebarComponent,
    UserListComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
