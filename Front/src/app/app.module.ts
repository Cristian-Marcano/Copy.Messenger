import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SocketIoModule } from 'ngx-socket-io';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { BarComponent } from './components/bar/bar.component';
import { ChatComponent } from './components/chat/chat.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignComponent } from './components/sign/sign.component';
import { TokenInterceptor } from './interceptors/token.interceptor';

import { AuthService } from './services/auth.service';
import { ChatsService } from './services/chats.service';

const config = {url:'http://localhost:4004',options:{}};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    BarComponent,
    ChatComponent,
    ProfileComponent,
    SignComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SocketIoModule.forRoot(config)
  ],
  providers: [
    AuthService, ChatsService,
    {provide:HTTP_INTERCEPTORS, useClass:TokenInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
