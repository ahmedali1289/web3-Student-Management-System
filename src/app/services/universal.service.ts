import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UniversalService {
  public static sidebar: Subject<any> = new Subject<any>();
  constructor() { }
}
