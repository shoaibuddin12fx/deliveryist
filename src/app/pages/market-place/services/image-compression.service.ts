import { Injectable } from '@angular/core';
import { NgxImageCompressService, DOC_ORIENTATION } from 'ngx-image-compress';


@Injectable({
  providedIn: 'root'
})
export class ImageCompressionService {
  imgResultAfterCompress: any;
  imgResultBeforeCompress: any;
  orientation: DOC_ORIENTATION;

  constructor(
    public imageCompression: NgxImageCompressService,
  ) { }

  compressImage(file) {

    return new Promise(resolve => {
      console.warn('Size in bytes was:', this.imageCompression.byteCount(file));
      
      this.imageCompression.compressFile(file, 50, 50).then(
        result => {
          this.imgResultAfterCompress = result;
          console.warn('Size in bytes is now:', this.imageCompression.byteCount(result));

          resolve (result);
        }
      );
    })

  }

}
