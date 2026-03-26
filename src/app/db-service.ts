import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  SERVER_URL = "https://peschetalorenzo.altervista.org/Reparto/index.php"

  async richiamaServer(parameter:{})
  {

    console.log(parameter)
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

      console.log(response)

      const data = await response.json();

      console.log('RISPOSTA:', data);
      return data
  }


}
