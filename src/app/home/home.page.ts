import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { GPSData, Input, LoginOutputModel } from '../model/model';
import { AuthServiceService } from '../Services/auth-service.service';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  input: Input={};
  user: LoginOutputModel;
  service;
  Interval:120000;
  constructor(private _router: Router,private geolocation :Geolocation,
    public loadingController: LoadingController, private _auth: AuthServiceService, private localstorage: Storage) {
   
  }
 async ngOnInit() {

    var res = await this.localstorage.get("UserModel");
    this.user = JSON.parse(res);
    this.input.CustomerID = this.user.CustomerId;
    this.input.DeviceID = this.user.DeviceId;
    this.input.VehicleID = this.user.VehicleNo;
    this.PushCurrentLocation();
    this.getBackgroundLocation();
  }

  logout() {
    clearInterval(this.service);
    this._router.navigate(['/login']);
  }

  PushCurrentLocation(){
   this.geolocation.getCurrentPosition().then(location=>{
    this.input.Provider="From Ionic";
    this.input.DateTime= formatDate(location.timestamp, "dd MMM yyyy hh:mm aaa", "en_us");
    let gps: GPSData;
    if(location.coords){
      let gps: GPSData={
      
      Altitude : location.coords.altitude?.toString(),
      Speed : location.coords.speed?.toString(),
      GPSDateTime : formatDate(location.timestamp, "dd MMM yyyy hh:mm aaa", "en_us"),
      GPSStatus : "A",
      Latitude : location.coords.latitude.toString(),
      Longitude : location.coords.longitude.toString(),
      Location : "",
      NetworkInfo : "",
      Satellites : "",
      };
      this.input.GPSData=gps;
      this.pushData(this.input);
      }
   });
  } 
  getBackgroundLocation() {
   
    // let watch = this.geolocation.watchPosition({timeout:6000,maximumAge:5000});
    // watch.subscribe((location:Geoposition) => {
     // data can be a set of coordinates, or an error (if an error occurred).
     this.service=setInterval(() => {
     
      let watch = this.geolocation.getCurrentPosition();
      watch.then((location:Geoposition) => {
          this.input.Provider="From Ionic";
          this.input.DateTime= formatDate(location.timestamp, "dd MMM yyyy hh:mm aaa", "en_us");
          if(location.coords){
          let gps: GPSData={
          
          Altitude : location.coords.altitude?.toString(),
          Speed : location.coords.speed?.toString(),
          GPSDateTime : formatDate(location.timestamp, "dd MMM yyyy hh:mm aaa", "en_us"),
          GPSStatus : "A",
          Latitude : location.coords.latitude.toString(),
          Longitude : location.coords.longitude.toString(),
          Location : "",
          NetworkInfo : "",
          Satellites : "",
          };
          this.input.GPSData=gps;
          this.pushData(this.input);
          }
       
    });
  }, this.Interval);
  
    // const config: BackgroundGeolocationConfig = {
    //   desiredAccuracy: 10,    
    //   stationaryRadius: 20,   
    //   distanceFilter: 30,     
    //   debug: false,            //  enable this hear sounds for background-geolocation life-cycle.
    //   stopOnTerminate: false, // enable this to clear background location settings when the app terminates
    // };

    // this.backgroundGeolocation.configure(config)
    //   .then(() => {

    //     this.backgroundGeolocation.on(BackgroundGeolocationEvents.location).subscribe((location: BackgroundGeolocationResponse) => {
    //       console.log(location);

    //       // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
    //       // and the background-task may be completed.  You must do this regardless if your operations are successful or not.
    //       // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
          
    //       this.input.Provider=location.provider.toString();
    //       this.input.DateTime= formatDate(location.time, "dd MMM yyyy hh:mm aaa", "en_us");
    //       let gps: GPSData;
    //       gps.Altitude = location.altitude.toString();
    //       gps.Speed = location.speed.toString();
    //       gps.GPSDateTime = formatDate(location.time, "dd MMM yyyy hh:mm aaa", "en_us");
    //       gps.GPSStatus = "A";
    //       gps.Latitude =location.latitude.toString();
    //       gps.Longitude =location.longitude.toString();
    //       gps.Location = "";
    //       gps.NetworkInfo = "";
    //       gps.Satellites = "";
    //       this.input.GPSData=gps;
    //       this.pushData(location);
    //       this.backgroundGeolocation.finish(); // FOR IOS ONLY
    //     });

    //   });

    // // start recording location
    // this.backgroundGeolocation.start();

    // If you wish to turn OFF background-tracking, call the #stop method.
    // this.backgroundGeolocation.stop();

  }

  pushData(input) {
    // console.log("Input",input);

    this._auth.GetTrackingMethods(this._auth.PUSH_GPS_URL, input)
      .subscribe(
        (res) => {
          // console.log(res);
          // if (res) {
          //     this._router.navigate(['/home']);
          // }
          // else {
          //   // this.pref.showAlert("Invalid Critential");
          // }
        },
        err => {
          // this.pref.showAlert("Something went wrong please contact support team.");
        }
      )
  }
}


