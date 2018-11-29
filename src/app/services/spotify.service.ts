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
         'Authorization': 'Bearer BQAU2QpW5oSPn-3CTUdBtsmUOAXSyfeyF7QY0I7hOzvc8G1-IOD0ZMyjE-SYd82RrVXpc0-3GwfuxbNAnOk'
      });

      return this.http.get(url, { headers });

   }

   getNewReleases() {

      return this.getQuery('browse/new-releases?limit=20')
               .pipe( map( data  =>  data['albums'].items ));
   }

   getArtistas( terimino: string ) {

      return this.getQuery(`search?q=${ terimino }&type=artist&limit=15`)
                   .pipe( map( data => data['artists'].items ));

   }

   getArtista( id: string ) {

      return this.getQuery(`artists/${ id }`);
              //     .pipe( map( data => data['artists'].items ));

   }
   getTopTracks( id: string ) {

      return this.getQuery(`artists/${ id }/top-tracks?country=us`)
                 .pipe( map( data => data['tracks'] ));

   }
}

