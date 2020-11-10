import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { LoginOutputModel } from '../model/model';
import { AuthServiceService } from '../Services/auth-service.service';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  IsCompanyExist = false;
  CompanyDetails;
  CompanyCode: string;
  CompanyLogo;
  public LoginForm: FormGroup;
  isSubmitted = false;
  isSubmittedtanant = false;
  RememberMe = false;
  VehicalNo: string;
  MobileNo: string;

  constructor(public formBuilder: FormBuilder, private _auth: AuthServiceService,
    public loadingController: LoadingController,
    public localstorage: Storage,

    private _router: Router) {
    this.LoginForm = formBuilder.group({
      Vehical_No: ['', [Validators.required, Validators.minLength(4)]],
      Mobile_No: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  ngOnInit() {

  }

  async Login() {
    this.VehicalNo = "Gj05hn8468";
    this.MobileNo = "1234567890";
    // this._router.navigate(['/home']);

    setTimeout(async () => {
      const loading = await this.loadingController.create({
        message: '<br> Loading',
        mode: 'ios',
        spinner: null,
        cssClass: 'custom-loader'

      });
      await loading.present();

      let criteria = {
        VehicleNo: this.VehicalNo,
        MobileNo: this.MobileNo,
        DeviceId: this.MobileNo
      }

      this._auth.GetTrackingMethods(this._auth.AUTHENTICATION, criteria)
        .subscribe(res => {
          if (res) {
            // res.VehicleNo = criteria.VehicleNo;
            this.localstorage.set("UserModel", JSON.stringify(res));

            loading.dismiss();
            this._router.navigate(['/home']);
          }
        })
     err => {
          console.error(err);
          // this.pref.showAlert("Something went wrong please contact support team.");
          loading.dismiss();
        }
    });
  }

  get loginerrorControl() {
    return this.LoginForm.controls;
  }
}
