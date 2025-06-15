import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { AuthModule } from './auth/auth.module';
import { ChannelDialogComponent } from './components/channel-dialog/channel-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoaderComponent } from './components/loader/loader.component';
import { ToastrModule } from 'ngx-toastr';
import { EmojiDialogComponent } from './components/emoji-dialog/emoji-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { CapitalizePipe } from './capitalize.pipe';
import { TypingComponent } from './components/typing/typing.component';


@NgModule({

  declarations: [
    AppComponent,
    MessageInputComponent,
    MessageItemComponent,
    MessageListComponent,
    SidebarComponent,
    UserListComponent,
    ChatComponent,
    ChannelDialogComponent,
    LoaderComponent,
    EmojiDialogComponent,
    CapitalizePipe,
    TypingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
