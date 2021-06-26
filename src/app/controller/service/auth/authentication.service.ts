import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {User} from '../../model/User.model';
import {UserAuth} from '../../model/user-auth.model';
import {MessageService} from 'primeng/api';


@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private loginUrl = 'http://localhost:8036/login';
    public userCandidat = new UserAuth();
    private _authenticatedUser = new User();
    public authenticated = false;

    constructor(private http: HttpClient, private router: Router, private messageService: MessageService) {
    }



    public login() {
        console.log(this.userCandidat);
        this.http.post<any>(this.loginUrl, this.userCandidat, {observe: 'response'}).subscribe(
            resp => {
                const jwt = resp.headers.get('Authorization');
                this.saveToken(jwt);
                this.loadInfos();
                this.router.navigate(['/view/commande']);
            }, error => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Connexion Error',
                    life: 3000
                });
            }
        );
    }


    public saveToken(token: string) {
        localStorage.setItem('token', token);
    }

    public loadInfos() {
        const helper = new JwtHelperService();
        const tokenDecoded = helper.decodeToken(localStorage.getItem('token'));
        const username = tokenDecoded.sub;
        const roles = tokenDecoded.roles;
        console.log('haa roles ' + roles);
        const passwordChanged = tokenDecoded.passwordChanged;

        this._authenticatedUser.passwordChanged = passwordChanged;
        this._authenticatedUser.username = username;
        this._authenticatedUser.authorities = roles;
        this.authenticated = true;

    }

    public logout() {
        localStorage.removeItem('token');
        this.authenticated = false;
        this._authenticatedUser = new User();
        this.router.navigate(['login']);
    }


    public hasRole(role): boolean {
        for (const r of this._authenticatedUser.authorities) {
            if (r == role) {
                return true;
            }
        }
        return false;
    }


    get authenticatedUser(): User {
        return this._authenticatedUser;
    }

    set authenticatedUser(value: User) {
        this._authenticatedUser = value;
    }
}
