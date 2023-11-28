import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root'
})

export class Apiservice {
    constructor(public http: HttpClient) { }

    public baseUrl = 'http://localhost:8585/api'

    Register(data: any) {
        return this.http.post(this.baseUrl + '/auth/register', data)
    }


}