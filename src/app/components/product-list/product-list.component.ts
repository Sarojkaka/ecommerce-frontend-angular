import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  paginatedProduct: Product[] = [];
  first: number = 0;
  itemsPerPage: number = 10;
  isLoading = false;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  paginateProducts(): void {
    const start = this.first;
    const end = start + this.itemsPerPage;
    this.paginatedProduct = this.products.slice(start, end);
  }

  loadProductsLazy(event: any): void {
    this.first = event.first;
    this.itemsPerPage = event.rows;
    this.paginateProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.getAllProducts().subscribe({
      next: (products: Product[]) => {
        this.products = products;
        this.isLoading = false;
        this.paginateProducts();
      },
      error: (err: any) => {
        console.error('Error loading products', err);
        this.isLoading = false;
      }
    });
  }

  deleteProduct(id?: number): void {
    if (id === undefined) {
      console.error('Product ID is undefined');
      return;
    }

    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          console.log("Product deleted successfully");
          alert('Product deleted successfully');
          this.loadProducts(); // Refresh the list after deletion
        },
        error: (err) => {
          if (err.status === 409) { // Conflict error
            alert('Failed to delete Product. Please contact the admin.');
          } else {
            alert('An unexpected error occurred. Please try again later.');
          }
          this.router.navigate(['/product']);
        }
      });
    } else {
      alert('Product deletion canceled.');
    }
  }

  editProduct(product: Product): void {
    if (product.productId !== undefined) {
      this.router.navigate(['/product/edit', product.productId]);
    } else {
      console.error('Product ID is undefined');
    }
  }

  navigateToAddProduct(): void {
    this.router.navigate(['/product/add']);
  }

  prevPage(): void {
    if (this.first > 0) {
      this.first -= this.itemsPerPage;
      this.paginateProducts();
    }
  }

  nextPage(): void {
    if (this.first + this.itemsPerPage < this.products.length) {
      this.first += this.itemsPerPage;
      this.paginateProducts();
    }
  }
}
