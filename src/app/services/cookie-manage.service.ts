import { Injectable } from "@angular/core";
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class CookieManageService {
    constructor(private cookieService: CookieService) { }

    getAuth(): string {
        return this.cookieService.get('sign_in_auth_token');
    }

    setAuth(value: string): void {
       this.cookieService.set('sign_in_auth_token', value );
       // this.cookieService.set('sign_in_auth_token', value, 1, '/', '.pasha-insurance.az', true, 'None');
    }

    deleteAuth(): void {
        this.cookieService.delete('sign_in_auth_token');
    }

    getUserId(): string {
        return this.cookieService.get('user_id');
    }

    setUserId(value: string): void {
       this.cookieService.set('user_id', value );
    }

    deleteUserId(): void {
        this.cookieService.delete('user_id');
    }

    getRole(): string {
        return this.cookieService.get('is_admin');
    }

    setRole(value: string): void {
       this.cookieService.set('is_admin', value );
    }

    deleteRole(): void {
        this.cookieService.delete('is_admin');
    }

}