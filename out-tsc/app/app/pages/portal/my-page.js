export class MyPage {
    constructor(router) {
        this.router = router;
    }
    onLogOut() {
        localStorage.setItem('token', null);
        this.router.navigate(['login']);
    }
}
//# sourceMappingURL=my-page.js.map