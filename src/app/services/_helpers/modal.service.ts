import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(public modal: ModalController) { }

  present(component, data = {}, cssClass = ''): Promise<any> {
    return new Promise(async (resolve) => {
      const modal = await this.modal.create({
        component,
        cssClass,
        componentProps: data,
      });
      modal.onDidDismiss().then((data) => {
        resolve(data);
      });
      await modal.present();
    });
  }

  async dismiss(data: any = {}): Promise<any> {
    var top = await this.modal.getTop();
    if (!top || top.hidden) return;
    if (this.modal.getTop())
      return new Promise<void>((resolve) => {
        data['dismiss'] = true;
        this.modal.dismiss(data).then((v) => resolve());
      });
  }
}
