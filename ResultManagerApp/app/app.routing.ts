import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { EquipoComponent } from './components/equipo.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'equipo', component: EquipoComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);