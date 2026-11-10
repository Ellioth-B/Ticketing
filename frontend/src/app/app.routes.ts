import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OrderMissionComponent } from './order-mission/order-mission.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guard/auth.guard';
import { TodoComponent } from '../../CodingGame/Tableau/todo.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [authGuard] },
    { path: 'order', component: OrderMissionComponent, canActivate: [authGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'todo', component: TodoComponent }
];
