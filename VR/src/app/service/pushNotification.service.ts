import { Injectable } from '@angular/core';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
import { Platform } from '@angular/cdk/platform';
import { Apiservice } from '../api/api.service';

@Injectable({
    providedIn: "root",
})
export class PushNotificationService {
    constructor(private firebaseX: FirebaseX, private push: Push,
        private platfrom: Platform, public api: Apiservice) { }

    async getToken() {
        console.log('getToken');
        if (this.platfrom.IOS) {
            const options: PushOptions = {
                ios: {
                    alert: 'true',
                    badge: true,
                    sound: 'false'
                }
            }
            this.push.hasPermission()
                .then((res: any) => {
                    if (res.isEnabled) {
                        const pushObject: PushObject = this.push.init(options);
                        pushObject.on('registration').subscribe((registration: any) => (
                            console.log(registration)
                        ));
                    } else {

                    }
                });
        }
        if (this.platfrom.ANDROID) {
            console.log("token")
            let token = await this.firebaseX.getToken();
            // await this.firebaseX.grantPermission();
            console.log(token)
            this.postArn(token);
        }
    }

    postArn(token) {
        let post = {
            "userId": localStorage.getItem('elude-useId'),
            "token": token,
            "orgId": localStorage.getItem('elude-orgId'),
            "roll": localStorage.getItem('elude-role')
        }

        // this.api.userToken(post).subscribe({
        //     next: (res) => {
        //     },
        //     error: (err) => {
        //         console.log(err)
        //     },
        // });
    }

}