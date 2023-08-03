import { Injectable, Injector } from '@angular/core'
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
    usertoken: any;
    constructor(private injector: Injector) {
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.usertoken = sessionStorage.getItem("token");
        let tokenizeReq = request.clone({
            setHeaders: {
                Authorization: 'Bearer ' + this.usertoken
            }
        })
        return next.handle(tokenizeReq);
    }
}