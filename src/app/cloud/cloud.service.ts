import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CloudService {
  private API = 'https://api/v1'

  constructor(private https: HttpClient) { }

  /* getProducts (): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.API)
  } */
}


interface Activity {
  id?: string
  title?: string
  start?: string
  duration?: string
}