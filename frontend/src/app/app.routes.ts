import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { SaleRegisterComponent } from './pages/sale-register/sale-register.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './pages/products/products.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {
        path: 'home',
        title: 'Painel',
        component: MainComponent,
        canActivate: [authGuard]
    },
    {
        path: 'sales',
        title: 'Vendas',
        component: SaleRegisterComponent,
        canActivate: [authGuard]
    },
    {
        path: '',
        title: 'Login',
        component: LoginComponent
    },
    {
        path: 'products',
        title: 'Produtos',
        component: ProductsComponent,
        canActivate: [authGuard]
    }
];
