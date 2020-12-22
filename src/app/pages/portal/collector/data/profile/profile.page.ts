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
    private urlProfile = 'collector/profile';
    private urlSave = 'collector/profile';
    private urlUpload = 'collector/profile/logo';
    private urlDownload = 'collector/profile/logo';

    // FormBuilder
    fgCollector = this.formBuilder.group({
        cAbout: ['', [Validators.required, Validators.maxLength(500)]],
        cMotivation: ['', [Validators.maxLength(500)]],
    });

    // Image
    public imagePath;
    public imgURL: any;
    public message: string;

    constructor(private sanitizer: DomSanitizer, private connApi: ConnApiService, private formBuilder: FormBuilder, public toastController: ToastController, public alertController: AlertController) {
    }

    ngOnInit() {
        // data
        this.connApi.safeGet(this.urlProfile).subscribe((response: HttpResponse<any>) => {
            let profile = response.body;

            // controls
            this.fgCollector.controls['cAbout'].setValue(profile.cAbout);
            this.fgCollector.controls['cMotivation'].setValue(profile.cMotivation);
        });

        // image
        this.connApi.safeDownload(this.urlDownload).subscribe(response => {

            let objectURL = URL.createObjectURL(response);
            this.imgURL = this.sanitizer.bypassSecurityTrustUrl(objectURL);


            console.log(response.body);
        }), error => {
            if (error.status == 404) {
                console.log('no logo found');
            }
        }
    }

    preview(files) {
        if (files.length === 0) {
            return;
        }

        var mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            this.message = 'Only images are supported.';
            return;
        }

        var reader = new FileReader();
        this.imagePath = files;
        reader.readAsDataURL(files[0]);
        reader.onload = (_event) => {
            this.imgURL = reader.result;
            console.log(this.imgURL.constructor.name)
        };
    }

    onSave() {

    }

    onUpload() {
        console.log("lkasj");
        console.log(this.imgURL);
        const uploadData = new FormData();
        var blob = new Blob([this.imgURL], { type: "image/png" });
        uploadData.append('logo', blob, 'logo');
        console.log(uploadData);
        this.connApi.safeUpload(this.urlUpload, this.imgURL)
            .subscribe((response: HttpResponse<any>) => {
                console.log(response);
            });
    }
}
