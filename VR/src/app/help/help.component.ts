import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Apiservice } from '../api/api.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
})
export class HelpComponent {

  userMessage: string = '';
  chatHistory: string[] = [];

  constructor(private http: HttpClient, public api: Apiservice) { }


  ionViewWillEnter() {

  }

  sendMessage(userMessage) {

    this.api.Helpchat(userMessage).subscribe(
      (response) => {
        this.chatHistory = response.choices[0]?.text.trim();
      },
      (error) => {
        console.error('Error:', error);
      }
    );



    // this.chatHistory.push(`User: ${userMessage}`);
    // const apiKey = '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';
    // const engineId = 'text-davinci-003';  // Replace with the correct engine ID
    // const apiUrl = `https://api.openai.com/v1/engines/${engineId}/completions`;

    // this.http.post(apiUrl, {
    //   prompt: userMessage,
    //   max_tokens: 150,
    // }, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${apiKey}`,
    //   },
    // }).subscribe(
    //   (response: any) => {
    //     const botReply = response.choices[0]?.text;
    //     this.chatHistory.push(`Bot: ${botReply}`);
    //   },
    //   (error: any) => {
    //     console.error('Error:', error.error.error);
    //   }
    // );
  }



}
