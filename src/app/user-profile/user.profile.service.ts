import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient } from '@angular/common/http';
import {UserProfileModel} from './user.profile.model';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';


const BACKEND_URL = environment.apiUrl + "/userprofile/";

@Injectable({ providedIn: 'root' })
export class UserProfileService {
  private userProfile = [];
  private userUpdate = new Subject<UserProfileModel>();

  constructor(private http: HttpClient, private router: Router) {}

  createProfileData(firstName: string, lastName: string, age: number, country: string,countryName: string) {
    const userData: UserProfileModel = {
      firstName,
      lastName,
      age,
      country,
      countryName
    };
    this.http.post(BACKEND_URL + "createdata", userData).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  getInfo(userId: string) {
    this.http.get(BACKEND_URL + "userinfo/:id " + userId).toPromise().then(data => {
      for(let key in data){
        if(data.hasOwnProperty(key)){
          this.userProfile.push(data[key]);
        }
      }
      localStorage.setItem('userName', this.userProfile[1]);
    });
  }

  public getData(){
    return this.userProfile;
  }

  public clearGetData(){
    this.userProfile = [];
  }

  getUserUpdate(){
    return this.userUpdate.asObservable();
  }

}
