import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-page-component',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './product-page-component.component.html',
  styleUrl: './product-page-component.component.scss'
})
export class ProductPageComponentComponent  implements OnInit {

  products: Product[] = [];
  paginatedProduct: Product[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  searchForm: FormGroup; // Define FormGroup for search

  cart: Product[] = [];
  totalAmount: number = 0;

  constructor(
    private productService: ProductService,
    private router: Router,
    private fb: FormBuilder // Inject FormBuilder
  ) {
    // Initialize form
    this.searchForm = this.fb.group({
      searchTerm: [''] // Form control for search term
    });
  }

  ngOnInit(): void {
    this.loadProducts();

    // Subscribe to search term changes
    this.searchForm.get('searchTerm')?.valueChanges.subscribe((value: string) => {
      this.searchProducts(value);
    });
  }

  paginatedProducts(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedProduct = this.products.slice(start, end);
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: data => {
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

  searchProducts(term: string): void {
    // Filter products based on the search term
    const filtered = this.products.filter(product => 
      product.productName.toLowerCase().includes(term.toLowerCase())
    );
    this.paginatedProduct = filtered.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
    this.totalPages = Math.ceil(filtered.length / this.itemsPerPage);
  }

  addToCart(product: Product): void {
    this.cart.push(product);
    this.totalAmount += product.price;
  }

  proceedToPayment(): void {
    // Handle payment process
    alert('Proceeding to payment');
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.paginatedProducts();
  }
}