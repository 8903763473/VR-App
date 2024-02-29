import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';

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
        return this.http.get(this.baseUrl + '/chat/online-users');
    }

    NetworkStatus(data) {
        return this.http.post(this.baseUrl + '/chat/NetworkStatus', data);
    }

    getChats(data) {
        return this.http.post(this.baseUrl + '/chat/receive', data);
    }

    sentMessage(data) {
        return this.http.post(this.baseUrl + '/chat/sent', data);
    }


    Helpchat(prompt: string): Observable<any> {
        const apiKey = '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';
        const engineId = 'text-davinci-003';  // Replace with the correct engine ID
        const apiUrl = `https://api.openai.com/v1/engines/${engineId}/completions`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        };

        const body = {
            prompt: prompt,
            max_tokens: 150,
        };

        return this.http.post<any>(apiUrl, body, { headers });
    }

}