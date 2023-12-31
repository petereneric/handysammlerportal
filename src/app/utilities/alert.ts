import {Injectable} from '@angular/core';
import {AlertController} from '@ionic/angular';

@Injectable()

export class Alert {

    constructor(public AlertController: AlertController) {
    }

    async invalidInput(input: string): Promise<any> {
        return new Promise(async (resolve) => {
                const alert = await this.AlertController.create({
                    cssClass: 'my-alert',
                    header: 'Ungültige Eingabe',
                    subHeader: input,
                    buttons: [{text: 'Ok'}]
                });
                await alert.present();
            }
        );
    }

    async popUp(document: string): Promise<any> {
        return new Promise(async (resolve) => {
                let bPopUp = localStorage.getItem('bPopUp');
                console.log('jo' + bPopUp);
                if (bPopUp == null || bPopUp === 'false') {
                    let message: string;
                    if (bPopUp == null) {
                        message = 'Du hast versucht ein Dokument in deinem Browser zu öffnen (Pop-Up). Wenn sich dieses Pop-Up nicht geöffnet hat, sind Pop-Ups in deinem Browser nicht ' +
                            'zugelassen. In diesem Fall bitten wir dich Pop-Ups für das Handysammlerportal zu aktivieren. Du kannst dies in den Einstellungen deines ' +
                            'Browsers bzw. Smartphones tun. Falls du dabei Hilfe benötigst empfehlen wir dir eine Google-Suche - Auf diesem Weg erhältst du eine Auswahl an Anleitungen.';
                    }
                    if (bPopUp === 'false') {
                        message = 'Wenn du versucht hast deine Pop-Up Einstellungen zu ändern, sich das Dokument aber dennoch nicht öffnet, bitten wir dich es erneut zu versuchen. Pop-Ups kannst du ' +
                            'in den Einstellungen deines Browsers bzw. Smartphones aktivieren. Falls du dazu eine Anleitung benötigst, findest du diese bei einer entsprechenden Google-Suche. Wenn auch dieser Versuch' +
                            ' fehlschlägt, kannst du uns gerne eine E-Mail an sammlung@mobile-box.eu senden. Wir helfen dir gerne weiter.';
                    }
                    const alert = await this.AlertController.create({
                        cssClass: 'my-alert',
                        header: 'Pop-Up',
                        subHeader: document,
                        message: message,
                        buttons: [{
                            text: 'Hat geklappt', handler: () => {
                                //alert.dismiss(true);
                                localStorage.setItem('bPopUp', 'true');
                                resolve(true);
                            }
                        }, {
                            text: 'Noch einmal versuchen', handler: () => {
                                //alert.dismiss(false);
                                localStorage.setItem('bPopUp', 'false');
                                resolve(false);
                            }
                        }]
                    });
                    await alert.present();
                } else {
                    resolve(true);
                }
            }
        );
    }
}
