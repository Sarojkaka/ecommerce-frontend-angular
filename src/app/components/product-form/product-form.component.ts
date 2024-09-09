import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  productForm!: FormGroup;
  categories: Category[] = [];
  isEditMode = false;
  productId!: number;
  selectedImageFile!: File;
  isLoading = false; // Add loading state
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

    ngOnInit(): void {
      this.productForm = this.fb.group({
        productName: ['', Validators.required],
        description: ['', Validators.required],
        price: [0, [Validators.required, Validators.min(0)]],
        quantity: [0, [Validators.required, Validators.min(0)]],
        date: ['', Validators.required],
        imagePath: [''],
        category: [null, Validators.required] // To store category ID
      });



    this.loadcategories();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.productId = +id;
      this.loadProduct();
    }
  }

  loadcategories(): void {
    this.isLoading = true;
    this.categoryService.getAllCategories().subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;
        console.log('Loaded categories:', this.categories); // Check if categories are loaded
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading categories:', err);
        this.isLoading = false;
        alert('Failed to load categories');
      }
    });
  }
  
  loadProduct(): void {
    console.log('Loading product with ID:', this.productId);
    this.isLoading = true;
    this.productService.getProductById(this.productId).subscribe({
      next: product => {
        console.log('Loaded product:', product);
  
        // Set the form values
        this.productForm.patchValue({
          productName: product.productName,
          description: product.description,
          price: product.price,
          quantity: product.quantity,
          date: product.date,
          imagePath: product.imagePath || '',
          category: product.categoryId || null // Ensure categoryId is set
        });
  
        // Set image preview if the imagePath is available
        if (product.imagePath) {
          this.imagePreview = `http://localhost:8080/images/${product.imagePath}`;
        }
  
        this.isLoading = false;
      },
      error: err => {
        console.error('Error loading product:', err);
        this.isLoading = false;
        alert('Failed to load product details');
      }
    });
  }
  
  
  

  onImageUpload(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedImageFile = file;
      this.productForm.patchValue({ imagePath: file.name });
  
      // Optional: Preview the image
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const base64Image = e.target.result;
        this.imagePreview = base64Image; // Make sure to define imagePreview in your component
      };
      reader.readAsDataURL(file);
    }
  }
  

  onSubmit(): void {
    console.log('Form value before submit:', this.productForm.value);
    if (this.isLoading) return;
  
    const formValue = this.productForm.value;
  
    const formData = new FormData();
    formData.append('productName', formValue.productName);
    formData.append('description', formValue.description);
    formData.append('price', formValue.price.toString());
    formData.append('quantity', formValue.quantity.toString());
    formData.append('date', formValue.date);
    formData.append('categoryId', formValue.category);
  
    if (this.selectedImageFile) {
      formData.append('image', this.selectedImageFile);
    }
  
    const submitOperation = this.isEditMode
      ? this.productService.updateProduct(formData, this.productId)
      : this.productService.saveProduct(formData);
  
    submitOperation.subscribe({
      next: response => {
        console.log('Response:', response);
        alert(this.isEditMode ? 'Product Updated Successfully' : 'Product Saved Successfully');
        this.router.navigate(['/app/product']);
      },
      error: err => {
        console.error('Error:', err);
        alert(this.isEditMode ? 'Failed to update product' : 'Failed to save product');
      }
    });
  }
  

  onCancel(): void {
    this.router.navigate(['/app/product']);
  }
}

