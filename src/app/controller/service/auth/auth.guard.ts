import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {AuthenticationService} from './authentication.service';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private auth: AuthenticationService) {
    }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        // const expectedRole = route.data.expectedRole;
        //
        // let allowed : boolean ;
        // for (let r of this.auth.authenticatedUser.roles){
        //   if (expectedRole == 'ALL'){
        //     allowed = true;break;
        //   }
        //   if (r == expectedRole){
        //     allowed = true;break;
        //   }
        //   allowed = false;
        // }
        // console.log('++++++++++++++++++++++++++++++++++++++++++++++++++??')
        if (this.auth.authenticated == false || this.auth.authenticatedUser.username == '') {
            console.log('no access to this page');
            //   this.router.navigate(['login']);
            return false;
        }
        return true;
    }

}
