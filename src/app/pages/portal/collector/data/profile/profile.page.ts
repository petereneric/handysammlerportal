import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ConnApiService} from '../../../../../services/conn-api/conn-api.service';
import {AlertController, ToastController} from '@ionic/angular';
import {HttpResponse} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

    // Urls
    private urlProfile = 'collector/profile/data';
    private urlSave = 'collector/profile/data';
    private urlUpload = 'collector/profile/logo';
    private urlDownload = 'collector/profile/logo';
    private deleteUrl = 'collector/profile/logo';

    // FormBuilder
    fgProfile = this.formBuilder.group({
        cAbout: [''],
        cMotivation: [''],
    });

    // Image
    public imagePath;
    public imgURL: any = null;
    public bLogo;

    // Size
    public sizeAbout;
    public sizeMotivation;

    // Change
    public bProfileDataChanged: boolean;


    constructor(private sanitizer: DomSanitizer, private connApi: ConnApiService, private formBuilder: FormBuilder, public toastController: ToastController, public alertController: AlertController) {
    }

    ngOnInit() {
        // data
        this.connApi.safeGet(this.urlProfile).subscribe((response: HttpResponse<any>) => {
            let profile = response.body;

            // controls
            this.fgProfile.controls['cAbout'].setValue(profile.cAbout);
            this.fgProfile.controls['cMotivation'].setValue(profile.cMotivation);

            // size
            this.onChangeAbout()
            this.onChangeMotivation()

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
        }
    }

    preview(files) {
        if (files.length === 0) {
            return;
        }



        var mimeType = files[0].type;

        if (files[0].size > 1000000) {
            this.alertTooBig()
        } else {
            if (mimeType.match(/image\/*/) == null) {
                return;
            }

            var reader = new FileReader();
            this.imagePath = files;
            reader.readAsDataURL(files[0]);
            reader.onload = (_event) => {

                this.imgURL = reader.result;
                console.log(this.imgURL.constructor.name)
                this.onUpload();
            };
        }

    }

    onSaveData() {
        let collector =
            {
                cAbout: this.fgProfile.get('cAbout').value,
                cMotivation: this.fgProfile.get('cMotivation').value,
            };

        // send data
        this.connApi.safePost(this.urlSave, collector).subscribe((data: HttpResponse<any>) => {
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
            .subscribe((response: HttpResponse<any>) => {
                this.bLogo = true;
                console.log(response);
            });
    }

    onLogoRemove() {
        this.connApi.safeDelete(this.deleteUrl).subscribe((resopnse: HttpResponse<any>) => {
            this.bLogo = false;
            this.imgURL = '';
        });
    }

    onChangeAbout() {
        this.bProfileDataChanged = true;
        if (this.fgProfile.controls['cAbout'].value == null) {
            this.sizeAbout = 0;
        } else {
            this.sizeAbout = this.fgProfile.controls['cAbout'].value.length;
        }
    }

    onChangeMotivation() {
        this.bProfileDataChanged = true;
        if (this.fgProfile.controls['cMotivation'].value == null) {
            this.sizeMotivation = 0;
        } else {
            this.sizeMotivation = this.fgProfile.controls['cMotivation'].value.length;
        }

    }

    // Toasts
    async toastSaved() {
        const toast = await this.toastController.create({
            message: 'Deine Daten wurden erfolgreich gespeichert.',
            duration: 2500,
            cssClass: 'my-toast',
            position: 'middle'
        });
        await toast.present();
    }

    async alertTooBig() {
        const alert = await this.alertController.create({
            header: 'Datei ist zu groß',
            message: 'Bitte wähle eine kleinere Datei, mit einer Maximalgröße von einem Megabyte, aus.',
            cssClass: 'my-alert',
            buttons: ['Ok']
        });

        await alert.present();
    }
}
