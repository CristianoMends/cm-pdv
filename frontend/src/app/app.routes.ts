import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { SaleRegisterComponent } from './pages/sale-register/sale-register.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './pages/products/products.component';

export const routes: Routes = [
    {
        path: 'home',
        component: MainComponent
    },
    {
        path: 'sales',
        component: SaleRegisterComponent
    },
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'products',
        component: ProductsComponent
    }
];
