import { Routes } from '@angular/router';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductPageComponentComponent } from './components/product-page-component/product-page-component.component';


export const routes: Routes = [

    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Redirect to dashboard by default
    { path: 'category', component: CategoryListComponent },
    { path: 'category/add', component: CategoryFormComponent },
    { path: 'category/edit/:id', component: CategoryFormComponent },
    { path: 'product', component: ProductListComponent },
    { path: 'product/add', component: ProductFormComponent },
    { path: 'product/edit/:id', component: ProductFormComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'productpage', component: ProductPageComponentComponent },
    { path: '**', redirectTo: '/dashboard' } // Catch-all route
   
];
