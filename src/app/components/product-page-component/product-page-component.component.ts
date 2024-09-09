import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-product-page-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-page-component.component.html',
  styleUrls: ['./product-page-component.component.scss']
})
export class ProductPageComponentComponent implements OnInit {

  products: Product[] = [];
  paginatedProduct: Product[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  searchForm: FormGroup;
  cart: Product[] = [];
  totalAmount: number = 0;
  categories: any;
  username: string = '';
  showCart: boolean = false; // Controls the visibility of the cart
  showPayment: boolean = false; // Controls the visibility of the payment section
  paymentForm: FormGroup;

  constructor(
    private productService: ProductService,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      searchTerm: ['']
    });

    this.paymentForm = this.fb.group({
      cardName: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]]
    });
  }

  ngOnInit(): void {
    const userId = localStorage.getItem('userId'); // Get the user ID from localStorage
    if (userId) {
      this.loadUserInfo(Number(userId)); // Convert to number and load user info
    } else {
      console.error('No user ID found in localStorage');
    }
    this.loadProducts();
  
    this.searchForm.get('searchTerm')?.valueChanges.subscribe((value: string) => {
      this.searchProducts(value);
    });
  }
  
  loadUserInfo(id: number): void {
    this.userService.getUserById(id).subscribe({
      next: (user: User) => {
        this.username = user.username; // Ensure username is assigned
      },
      error: err => {
        console.error('Error fetching user:', err);
      }
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
    const filtered = this.products.filter(product =>
      product.productName.toLowerCase().includes(term.toLowerCase())
    );
    this.paginatedProduct = filtered.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
    this.totalPages = Math.ceil(filtered.length / this.itemsPerPage);
  }

  addToCart(product: Product): void {
    this.cart.push(product);
    this.totalAmount += product.price;
    this.showCart = true; // Show the cart when an item is added
  }

  proceedToPayment(): void {
    this.showPayment = true; // Show the payment section when proceeding to payment
  }

  completePayment(): void {
    if (this.paymentForm.valid) {
      // Clear cart and reset total amount
      this.cart = [];
      this.totalAmount = 0;
      this.showCart = false; // Hide the cart
      this.showPayment = false; // Hide the payment section
      alert('Your order is complete!');
    } else {
      // Handle invalid form
      alert('Please fill out the payment form correctly.');
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.paginatedProducts();
  }
}
