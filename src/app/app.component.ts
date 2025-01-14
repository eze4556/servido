import { Platform } from '@ionic/angular';
import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { ActionPerformed, PushNotificationSchema, PushNotifications, Token } from '@capacitor/push-notifications';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet,],
})
export class AppComponent {
  constructor( private platform: Platform  ) { if(this.platform.is('capacitor')) this.initPush }




 initPush() {
    console.log('Initializing HomePage');


    PushNotifications.requestPermissions().then((result) => {
      if (result.receive === 'granted') {

        PushNotifications.register();
      } else {

      }
    });


    PushNotifications.addListener('registration', (token: Token) => {
      // alert('Push registration success, token: ' + token.value);
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      // alert('Error on registration: ' + JSON.stringify(error));
    });

    PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
      // alert('Push received: ' + JSON.stringify(notification));
    });


    PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
      // alert('Push action performed: ' + JSON.stringify(notification));
    });
  }
}



