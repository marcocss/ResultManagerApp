import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

import { routing } from './app.routing';
import { HomeComponent } from './components/home.component';
import { GeneralService } from './Services/service';
import { EquipoComponent } from './components/equipo.component';
import { RolComponent } from './components/rol.component';

@NgModule({
    imports: [BrowserModule, ReactiveFormsModule, HttpModule, routing, Ng2Bs3ModalModule],
    declarations: [AppComponent, HomeComponent, EquipoComponent, RolComponent],
    providers: [{ provide: APP_BASE_HREF, useValue: '/' }, GeneralService],
    bootstrap: [AppComponent]
})

export class AppModule { }