import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, Observable, switchMap, tap } from 'rxjs';

@Injectable()
export class ApiService {
  public readonly baseUrl = environment.baseUrl;
  public readonly endPoint = `${this.baseUrl}/api/`;//${this.apiVersion}/

  constructor(private http: HttpClient) {}

  public get<T>(url: string): Observable<T> {
    return this.http.get<T>(this.endPoint + url);
  }
  public post<T>(url: string, data: any, options?: any): Observable<T> {
    return this.http.post<T>(
      this.endPoint + url,
      data,
      options
    ) as unknown as Observable<T>;
  }
  public put<T>(url: string, data: any, options?: any) {
    return this.http.put<T>(this.endPoint + url, data, options);
  }
  public delete<T>(url: string, options?: any) {
    return this.http.delete<T>(this.endPoint + url, options);
  }
  public getwithparams<T>(url: string, params: any): Observable<T> {
    return this.http.get<T>(this.endPoint + url, {params});
  }

}
