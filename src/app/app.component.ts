import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import * as QRCode from 'qrcode'


interface Size {
  label: string;
  value: number;
}

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

  sizeOptions: Size[] = [
    {
      label: '100x100',
      value: 100
    },
    {
      label: '200x200',
      value: 200
    },
    {
      label: '300x300',
      value: 300
    },
    {
      label: '400x400',
      value: 400
    },
    {
      label: '500x500',
      value: 500
    },
    {
      label: '600x600',
      value: 600
    },
    {
      label: '700x700',
      value: 700
    }
  ]


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

    }
  }

  isURL(str: string) {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    var pattern = new RegExp(regex);
    return pattern.test(str);
  }
}
