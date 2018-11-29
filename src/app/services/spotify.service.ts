import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable()
export class SpotifyService {

  constructor( private http: HttpClient) {
    console.log('spotify service listo');
   }

   getQuery( query: string) {
      const url = `https://api.spotify.com/v1/${query}`;

      const headers = new HttpHeaders({
         'Authorization': 'Bearer BQDa5-Fm9__BzO6IbEgSQRn3GDlYsw8et8uBDoNeOGEIGSo6AwOYkF0q06JmD8QoYCeUwYXqwJJp2jyjzuY'
      });

      return this.http.get(url, { headers });

   }

   getNewReleases() {

      return this.getQuery('browse/new-releases?limit=20')
               .pipe( map( data  =>  data['albums'].items ));
   }

   getArtista( terimino: string ) {

      return this.getQuery(`search?q=${ terimino }&type=artist&limit=15`)
                   .pipe( map( data => data['artists'].items ));

   }
}
