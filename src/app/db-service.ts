import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  SERVER_URL = "http://peschetalorenzo.altervista.org/Reparto/index.php"

  async richiamaServer(parameter:{})
  {

      const response = await fetch(
        this.SERVER_URL,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(parameter)
        }
      );


      const data = await response.json();

      console.log('RISPOSTA:', data);
      return data
  }


}
