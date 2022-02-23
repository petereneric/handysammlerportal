import {Router} from '@angular/router';

export class MyPage {

    constructor(public router: Router) {
    }

    onLogOut() {
        localStorage.setItem('token', null);
        this.router.navigate(['login'])
    }
}
