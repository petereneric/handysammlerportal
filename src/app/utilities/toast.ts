import {Component, Injectable} from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable()

export class Toast {

    constructor(public toastController: ToastController) {}

    async fileNotFound() {
        const toast = await this.toastController.create({
            message: 'Dokument konnte nicht gefunden werden.',
            duration: 2500,
            cssClass: 'my-toast',
            position: 'bottom'
        });
        await toast.present();
    }

    async successfulRegistration() {
        const toast = await this.toastController.create({
            message: 'Wir haben deine Daten erhalten und erfolgreich gespeichert - Willkommen!',
            duration: 2500,
            cssClass: 'my-toast',
            position: 'bottom'
        });
        await toast.present();
    }
}


