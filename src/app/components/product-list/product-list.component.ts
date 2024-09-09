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
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  paginatedProducts(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedProduct = this.products.slice(start, end);
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: data => {
        console.log(data); // Check if category is included
        this.products = data;
        this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
        this.paginatedProducts();
      },
      error: err => {
        console.error('Error loading products:', err);
        alert('Failed to load products');
      }
    });
  }
  

  deleteProduct(productId: number | undefined): void {
    if (productId === undefined) {
      console.error('Product ID is undefined');
      return;
    }
    
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe({
        next: () => {
          alert('Product deleted successfully');
          this.loadProducts(); // Refresh the list after deletion
        },
        error: (err) => {
          console.error('Failed to delete product', err);
          alert('Failed to delete product');
        }
      });
    }
  }

  editProduct(product: Product): void { // Renamed to editBatch
    this.router.navigate(['/app/product/edit', product.productId]); // Updated route to /batches/edit
  }
// Pagination methods
goToPage(page: number): void {
  this.currentPage = page;
  this.paginatedProducts();
}
}