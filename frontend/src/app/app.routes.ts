import { Routes } from '@angular/router';
import { LeafletMapComponent } from './component/leaflet-map/leaflet-map';
import { LoginComponent } from './component/login/login';
import { RegisterComponent } from './component/register/register';

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
