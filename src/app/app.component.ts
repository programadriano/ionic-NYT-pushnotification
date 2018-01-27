import { options } from "sw-toolbox";
import { Component } from "@angular/core";
import { Platform, AlertController } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Push, PushObject, PushOptions } from "@ionic-native/push";

import { HomePage } from "../pages/home/home";
@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public push: Push,
    public alertCtrl: AlertController
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.pushsetup();
    });
  }

  pushsetup() {
    const options: PushOptions = {};

    const pushObject: PushObject = this.push.init(options);

    pushObject.on("registration").subscribe((data: any) => {
      console.log("device token -> " + data.registrationId);
    });

    pushObject.on("notification").subscribe((notification: any) => {
      //if (notification.additionalData.foreground) {
      let message = this.alertCtrl.create({
        title: "teste",
        message: notification.message
      });
      message.present();
      //    }
    });
  }
}
