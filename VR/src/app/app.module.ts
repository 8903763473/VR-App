import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home/home.page';
import { NgOtpInputModule } from 'ng-otp-input';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { SearchPipe } from './api/search.pipe';
import { SocketComponent } from './socket/socket.component';
import { HelpComponent } from './help/help.component';


const routes: Routes = [
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  // },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: AuthenticateComponent
  },
  {
    path: 'home',
    component: HomePage
  },
  {
    path: 'chat',
    component: ChatComponent
  },
  {
    path: 'socket',
    component: SocketComponent
  },
  {
    path: 'help',
    component: HelpComponent
  },
];

@NgModule({
  declarations: [AppComponent, AuthenticateComponent, HomePage, ChatComponent, HelpComponent, SearchPipe, SocketComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, FormsModule, NgOtpInputModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})

export class AppModule { }
