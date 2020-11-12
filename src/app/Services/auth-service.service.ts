import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  public BASE_URL = "https://webxpress.azure-api.net/api/GPS/";

  public PUSH_GPS_URL = "PushGPSData";
  public AUTHENTICATION = "GetDeviceAccessKey";

  constructor(private http: HttpClient) { }

   GetTrackingMethods(Mathod, input) {
    let httpOptions = {
      
      "Ocp-Apim-Subscription-Key": "553271ec6b124c8bb08e8548ab6372d5",
      "Content-Type": "application/json"
    };
    return this.http.post(this.BASE_URL + Mathod, input, { headers: httpOptions });
  }

  // GetTrackingMethods(Mathod, input) {
    
  //   return this.http.post<any>(this.BASE_URL + Mathod, input);
  // }

}
