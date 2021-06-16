import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  products: Observable<any>;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {      
      const category = params.category || null;
      if (category) {
        this.products = this.http.get(`https://fakestoreapi.com/products/category/${category}`);
      } else {
        this.products = this.http.get('https://fakestoreapi.com/products');
      }
    });
  }
}
