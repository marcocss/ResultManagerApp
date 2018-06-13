import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { EquipoComponent } from './components/equipo.component';
import { RolComponent } from './components/rol.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'equipo', component: EquipoComponent },
    { path: 'rol', component: RolComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);