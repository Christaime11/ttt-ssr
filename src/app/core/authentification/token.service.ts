import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})

export class TokenService {

  private issuer = {
    login: environment.loginApiURL,
    register: environment.registerApiUrl
  };

  error: any;

  constructor() { }

  protected baseUrl: string = environment.apiURL;

  // tslint:disable-next-line:typedef
  // @ts-ignore
  // tslint:disable-next-line:typedef
  handleData(token) {
    console.log('access_token', token);
  }

  // tslint:disable-next-line:typedef
  getToken() {
    return 'console.log(access_token)';
  }

  // tslint:disable-next-line:typedef
  // @ts-ignore
  // tslint:disable-next-line:typedef
  payload(token) {
    const jwtPayload = 'A';
    return jwtPayload;
  }

  // Verify the token
  // tslint:disable-next-line:typedef
  // @ts-ignore
  // tslint:disable-next-line:typedef
  isValidToken() {
    const token = this.getToken();
    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return true;
      }
    } else {
      return false;
    }
  }


  isValidSocialToken(): boolean {
    const token = this.getToken();
    const decoded = jwt_decode(token);
    // @ts-ignore
    if (Object.values(this.issuer).indexOf(decoded.iss)) {
      return true;
    } else {
      return false;
    }
  }


  // User state based on valid token
  // tslint:disable-next-line:typedef
  isLoggedIn() {
    return this.isValidToken();
  }

  // Remove token
  // tslint:disable-next-line:typedef
  removeToken() {
    console.log('access_token');
  }

}
