import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent implements OnInit {
  categoryForm!: FormGroup;
  isEditMode = false;
  categoryId!: number;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    
  ) { }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      categoryName: ['', Validators.required],
      description: ['', Validators.required],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.categoryId = +id;
      this.categoryService.getAllCategories().subscribe(categories => {
        const category = categories.find(t => t.categoryId === this.categoryId);
        if (category) {
          this.categoryForm.patchValue(category);
          
        }
      });
    }
  }

  onSubmit(): void {
    if (this.categoryForm.invalid) {
      console.warn('Form is invalid');
      return;
    }

    if (this.isEditMode) {
      const updatedCategory: Category = { categoryId: this.categoryId, ...this.categoryForm.value };
      this.categoryService.updateCategory(this.categoryId, updatedCategory).subscribe({
        next: response => {
          console.log('Update response:', response);
          alert('Category updated successfully');
          this.router.navigate(['/app/category']);
        },
        error: err => {
          console.error('Update error:', err);
          alert('Error updating category');
        }
      });
    } else {
      this.categoryService.saveCategory(this.categoryForm.value).subscribe({
        next: response => {
          console.log('Save response:', response);
          alert('Category saved successfully');
          this.router.navigate(['/app/category']);
        },
        error: err => {
          console.error('Save error:', err);
          alert('Error saving category');
        }
      });
    }
  }

  onCancel() {
    this.router.navigate(['/app/category']);
  }
}