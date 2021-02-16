import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
let ProfilePage = class ProfilePage {
    constructor(sanitizer, connApi, formBuilder, toastController, alertController) {
        this.sanitizer = sanitizer;
        this.connApi = connApi;
        this.formBuilder = formBuilder;
        this.toastController = toastController;
        this.alertController = alertController;
        // Urls
        this.urlProfile = 'collector/profile/data';
        this.urlSave = 'collector/profile/data';
        this.urlUpload = 'collector/profile/logo';
        this.urlDownload = 'collector/profile/logo';
        this.deleteUrl = 'collector/profile/logo';
        // FormBuilder
        this.fgProfile = this.formBuilder.group({
            cAbout: [''],
            cMotivation: [''],
        });
        this.imgURL = null;
    }
    ngOnInit() {
        // data
        this.connApi.safeGet(this.urlProfile).subscribe((response) => {
            let profile = response.body;
            // controls
            this.fgProfile.controls['cAbout'].setValue(profile.cAbout);
            this.fgProfile.controls['cMotivation'].setValue(profile.cMotivation);
            // size
            this.onChangeAbout();
            this.onChangeMotivation();
            // change
            this.bProfileDataChanged = false;
        });
        // image
        this.connApi.safeDownload(this.urlDownload).subscribe(response => {
            this.bLogo = true;
            let objectURL = URL.createObjectURL(response);
            this.imgURL = this.sanitizer.bypassSecurityTrustUrl(objectURL);
            console.log(response.body);
        }), error => {
            if (error.status == 404) {
                this.bLogo = false;
                console.log('no logo found');
            }
        };
    }
    preview(files) {
        if (files.length === 0) {
            return;
        }
        var mimeType = files[0].type;
        if (files[0].size > 1000000) {
            this.alertTooBig();
        }
        else {
            if (mimeType.match(/image\/*/) == null) {
                return;
            }
            var reader = new FileReader();
            this.imagePath = files;
            reader.readAsDataURL(files[0]);
            reader.onload = (_event) => {
                this.imgURL = reader.result;
                console.log(this.imgURL.constructor.name);
                this.onUpload();
            };
        }
    }
    onSaveData() {
        let collector = {
            cAbout: this.fgProfile.get('cAbout').value,
            cMotivation: this.fgProfile.get('cMotivation').value,
        };
        // send data
        this.connApi.safePost(this.urlSave, collector).subscribe((data) => {
            if (data.status == 200) {
                this.bProfileDataChanged = false;
                this.toastSaved();
            }
        }, error => {
        });
    }
    onUpload() {
        console.log("lkasjdfklsdf!)!");
        const uploadData = new FormData();
        var blob = new Blob([this.imgURL], { type: "image/png" });
        uploadData.append('logo', blob, 'logo');
        this.connApi.safeUpload(this.urlUpload, this.imgURL)
            .subscribe((response) => {
            this.bLogo = true;
            console.log(response);
        });
    }
    onLogoRemove() {
        this.connApi.safeDelete(this.deleteUrl).subscribe((resopnse) => {
            this.bLogo = false;
            this.imgURL = '';
        });
    }
    onChangeAbout() {
        this.bProfileDataChanged = true;
        if (this.fgProfile.controls['cAbout'].value == null) {
            this.sizeAbout = 0;
        }
        else {
            this.sizeAbout = this.fgProfile.controls['cAbout'].value.length;
        }
    }
    onChangeMotivation() {
        this.bProfileDataChanged = true;
        if (this.fgProfile.controls['cMotivation'].value == null) {
            this.sizeMotivation = 0;
        }
        else {
            this.sizeMotivation = this.fgProfile.controls['cMotivation'].value.length;
        }
    }
    // Toasts
    toastSaved() {
        return __awaiter(this, void 0, void 0, function* () {
            const toast = yield this.toastController.create({
                message: 'Deine Daten wurden erfolgreich gespeichert.',
                duration: 2500,
                cssClass: 'my-toast',
                position: 'middle'
            });
            yield toast.present();
        });
    }
    alertTooBig() {
        return __awaiter(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                header: 'Datei ist zu groß',
                message: 'Bitte wähle eine kleinere Datei, mit einer Maximalgröße von einem Megabyte, aus.',
                cssClass: 'my-alert',
                buttons: ['Ok']
            });
            yield alert.present();
        });
    }
};
ProfilePage = __decorate([
    Component({
        selector: 'app-profile',
        templateUrl: './profile.page.html',
        styleUrls: ['./profile.page.scss'],
    })
], ProfilePage);
export { ProfilePage };
//# sourceMappingURL=profile.page.js.map