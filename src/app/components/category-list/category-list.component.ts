import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  paginatedCategory: Category[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  isLoading = false;

  constructor(private categoryService: CategoryService, private router: Router) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  paginateCategories(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedCategory = this.categories.slice(start, end);
  }

  loadCategories(): void {
    this.isLoading = true;
    this.categoryService.getAllCategories().subscribe({
      next: (data: Category[]) => {
        this.categories = data;
        this.totalPages = Math.ceil(this.categories.length / this.itemsPerPage);
        this.paginateCategories();
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error loading categories', err);
        alert('Failed to load categories. Please try again later.');
        this.isLoading = false;
      }
    });
  }

  deleteCategory(id: number): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(id).subscribe({
        next: () => {
          alert('Category deleted successfully');
          this.loadCategories(); // Refresh the list after deletion
        },
        error: (err) => {
          if (err.status === 409) { // Conflict error
            alert('Failed to delete Category. Please contact the admin.');
          } else {
            alert('An unexpected error occurred. Please try again later.');
          }
        }
      });
    } else {
      alert('Category deletion canceled.');
    }
  }

  editCategory(category: Category): void {
    this.router.navigate(['/category/edit', category.categoryId]);
  }

  // Pagination methods
  goToPage(page: number): void {
    this.currentPage = page;
    this.paginateCategories();
  }
}
