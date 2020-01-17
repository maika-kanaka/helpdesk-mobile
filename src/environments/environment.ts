import { HttpHeaders } from '@angular/common/http';

export var environment = {   //THIS IS FOR DEFAULT VALUES
  web_url: "http://192.168.42.142/utavi/web/public",
  api_url: "http://192.168.42.142/utavi/web/public/api"
}

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': localStorage.getItem('jwt')
  })
};
