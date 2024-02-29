import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  public socket: any;
  readonly url: any = 'http://localhost:8589';

  constructor() {
    this.socket = io(this.url, { transports: ['websocket'] });
  }

  Listen(eventName: any): Observable<any> {
    return new Observable((observer) => {
      this.socket.on(eventName, (data) => {
        observer.next(data);
      });
    });
  }

  emit(eventName: any, data: any) {
    this.socket.emit(eventName, data);
  }
}
