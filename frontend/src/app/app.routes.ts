import { Routes } from '@angular/router';
import { LeafletMapComponent } from './leaflet-map/leaflet-map';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';

export const routes: Routes = [
    {
        path: '',
        component: LeafletMapComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    }
];
