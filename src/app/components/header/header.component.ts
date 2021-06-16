import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartModalPage } from '../../pages/cart-modal/cart-modal.page';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() title: string;
  dropdown = false;

  @ViewChild('productbtn', { read: ElementRef }) productbtn: ElementRef;
  @ViewChild('dropdownbox', { read: ElementRef }) dropdownbox: ElementRef;

  constructor(private modalController: ModalController) { }

  ngOnInit() { }

  hideDropdown(event) {
    const xTouch = (event.clientX).toFixed(2);
    const yTouch = (event.clientY).toFixed(2);

    const rect = this.productbtn.nativeElement.getBoundingClientRect();
    const topBoundary = (rect.top + 2).toFixed(2);
    const leftBoundary = (rect.left + 2).toFixed(2);
    const rightBoundary = (rect.right - 2).toFixed(2);

    if (xTouch < leftBoundary || xTouch > rightBoundary || yTouch < topBoundary) {
      this.dropdown = false;
    }
  }

  async openCart() {
    const modal = await this.modalController.create({
      component: CartModalPage
    });

    await modal.present();
  }
}
