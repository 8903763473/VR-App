import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root'
})

export class Apiservice {
    constructor(public http: HttpClient) { }

    public baseUrl = 'http://localhost:8589/api'

    Register(data: any) {
        return this.http.post(this.baseUrl + '/auth/Register', data)
    }

    Login(data: any) {
        return this.http.post(this.baseUrl + '/auth/login', data)
    }

    getOTP(data: any) {
        return this.http.put(this.baseUrl + '/auth/getOtp', data)
    }

    verifyOTP(data: any) {
        return this.http.post(this.baseUrl + '/auth/verifyOtp', data)
    }

}