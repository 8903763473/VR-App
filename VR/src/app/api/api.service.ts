import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root'
})

export class Apiservice {
    constructor(public http: HttpClient) { }
    headers: any

    public baseUrl = 'http://localhost:8589/api'

    Token() {
        return (this.headers = new HttpHeaders({
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }));
    }


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

    getAllUsers() {
        const apiurl = `${this.baseUrl}/auth/getRegisteredData`;
        const headers = this.Token();
        return this.http.get(apiurl, { headers })
    }

    getOnlineusers() {
        return this.http.get(this.baseUrl + '/auth/online-users');
    }

    NetworkStatus(data) {
        return this.http.post(this.baseUrl + '/auth/NetworkStatus', data);
    }

    getChats(data) {
        return this.http.post(this.baseUrl + '/auth/receive', data);
    }

}