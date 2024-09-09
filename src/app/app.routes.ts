import { Routes } from '@angular/router';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductPageComponentComponent } from './components/product-page-component/product-page-component.component';
import { LoginComponent } from './components/login/login.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { LayoutComponent } from './components/layout/layout.component';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component:UserFormComponent},
  { path: 'productlist', component: ProductPageComponentComponent },

  {
    path: 'app',
    component: LayoutComponent, // Layout with sidebar and header
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'category/add', component: CategoryFormComponent },
      { path: 'category/edit/:categoryId', component: CategoryFormComponent },
      { path: 'category', component: CategoryListComponent },
      { path: 'product/add', component: ProductFormComponent },
      { path: 'product/edit/:productId', component: ProductFormComponent },
      { path: 'product', component: ProductListComponent },
      { path: 'customer', component: UserListComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];