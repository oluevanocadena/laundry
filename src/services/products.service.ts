import { Injectable } from '@angular/core';
import { HttpService } from './common/http.service';
import { Observable } from 'rxjs';

/**
 * @description
 * @class
 */
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(public http: HttpService) {}

  getProduct(id: string) {
    return this.http.get<Product>(`products/${id}`);
  }

  getProducts(
    page: number,
    take: number,
    search?: string,
    categoryId?: number
  ): Observable<Product[]> {
    return this.http.post<Product[]>('products/search', { search, categoryId });
  }

  //Fakes get products
  getProductsFake(
    page: number,
    take: number,
    search?: string,
    categoryId?: number
  ): Observable<Product[]> {
    return new Observable<Product[]>((observer) => {
      // use search filter contains and categoryId
      let filteredProducts = productsFake.filter(
        (product) =>
          (search && search.trim() !== ''
            ? product.name?.includes(search) ||
              product.description?.includes(search) ||
              product.id?.toString().includes(search)
            : true) && (categoryId ? product.categoryId === categoryId : true)
      );
      filteredProducts = filteredProducts.slice(
        (page - 1) * take,
        (page - 1) * take + take
      );
      observer.next(filteredProducts);
      observer.complete();
    });
  }
}

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  categoryId: number;
  stock: number;
  rating: number;
}

const productsFake = [
  {
    id: 1,
    name: 'Product 1',
    price: 100,
    description: 'Description 1',
    image: 'https://via.placeholder.com/150',
    categoryId: 1,
    stock: 10,
    rating: 4,
  },
  {
    id: 2,
    name: 'Product 2',
    price: 200,
    description: 'Description 2',
    image: 'https://via.placeholder.com/150',
    categoryId: 1,
    stock: 10,
    rating: 4,
  },
  {
    id: 3,
    name: 'Product 3',
    price: 300,
    description: 'Description 3',
    image: 'https://via.placeholder.com/150',
    categoryId: 1,
    stock: 10,
    rating: 4,
  },
  {
    id: 4,
    name: 'Shirt',
    price: 400,
    description: 'Shirt service description',
    image: 'https://via.placeholder.com/150',
    categoryId: 2,
    stock: 10,
    rating: 4,
  },
  {
    id: 4,
    name: 'Shirt',
    price: 400,
    description: 'Shirt service description',
    image: 'https://via.placeholder.com/150',
    categoryId: 2,
    stock: 10,
    rating: 4,
  },
  {
    id: 4,
    name: 'Shirt g',
    price: 400,
    description: 'Shirt service description',
    image: 'https://via.placeholder.com/150',
    categoryId: 2,
    stock: 10,
    rating: 4,
  },
  {
    id: 4,
    name: 'Shirt a',
    price: 400,
    description: 'Shirt service description',
    image: 'https://via.placeholder.com/150',
    categoryId: 2,
    stock: 10,
    rating: 4,
  },
  {
    id: 41,
    name: 'Shirt b',
    price: 150,
    description: 'Shirt service description',
    image: 'https://via.placeholder.com/150',
    categoryId: 2,
    stock: 10,
    rating: 4,
  },
  {
    id: 40,
    name: 'Shirt',
    price: 250,
    description: 'Shirt service description',
    image: 'https://via.placeholder.com/150',
    categoryId: 2,
    stock: 10,
    rating: 4,
  },
  {
    id: 5,
    name: 'Product 5',
    price: 500,
    description: 'Description 5',
    image: 'https://via.placeholder.com/150',
    categoryId: 1,
    stock: 10,
    rating: 4,
  },
  {
    id: 6,
    name: 'Product 6',
    price: 600,
    description: 'Description 6',
    image: 'https://via.placeholder.com/150',
    categoryId: 1,
    stock: 10,
    rating: 4,
  },
  {
    id: 7,
    name: 'Product 7',
    price: 700,
    description: 'Description 7',
    image: 'https://via.placeholder.com/150',
    categoryId: 1,
    stock: 10,
    rating: 4,
  },
  {
    id: 8,
    name: 'Product 8',
    price: 800,
    description: 'Description 8',
    image: 'https://via.placeholder.com/150',
    categoryId: 4,
    stock: 10,
    rating: 4,
  },
  {
    id: 9,
    name: 'Product 9',
    price: 900,
    description: 'Description 9',
    image: 'https://via.placeholder.com/150',
    categoryId: 4,
    stock: 10,
    rating: 4,
  },
  {
    id: 10,
    name: 'Product 10',
    price: 1000,
    description: 'Description 10',
    image: 'https://via.placeholder.com/150',
    categoryId: 4,
    stock: 10,
    rating: 4,
  },
];
