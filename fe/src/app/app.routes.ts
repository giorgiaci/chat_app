import { Routes } from '@angular/router';
import { HomeComponent } from './compontents/home/home.component';
import { LoginComponent } from './compontents/login/login.component';
import { ChatComponent } from './compontents/chat/chat.component';
import { AuthGuard } from './shared/guards/auth.guard';

export const routes: Routes = [

    { 
        path: '', 
        component: HomeComponent
    },
    {
        path: 'login', 
        component: LoginComponent,
        data:{
            route: '/login'
        }
    },
    {
        path: 'chat', 
        component: ChatComponent,
        data:{
            route: '/chat'
        },
        canActivate: [AuthGuard]
    },

];
