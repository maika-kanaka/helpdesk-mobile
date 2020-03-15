import { HttpHeaders } from '@angular/common/http';

export var environment = {   //THIS IS FOR DEFAULT VALUES
  web_url: "https://demos.migunesia.com/helpdesk-api/public",
  api_url: "https://demos.migunesia.com/helpdesk-api/public/api"
}

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': localStorage.getItem('jwt')
  })
};
