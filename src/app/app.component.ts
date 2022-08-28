import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import * as QRCode from 'qrcode'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  form = this.fb.group({
    url: ["", Validators.required],
  })

  urlGenerated: string = '';

  constructor(private fb: FormBuilder) { }

  generateQRCode() {
    const { url } = this.form.value;

    //validate the URL
    if (url) {
      if (!this.isURL(url)) {
        alert('Please enter a valid URL');
        return;
      }

      QRCode.toDataURL(url, {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        width: 500
      })
        .then(url => {
          this.urlGenerated = url;
        })
        .catch(err => {
          console.error(err)
        })

    } else {
      alert('Please enter a valid URL');
      return;
    }
  }

  isURL(str: string) {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    var pattern = new RegExp(regex);
    return pattern.test(str);
  }
}
