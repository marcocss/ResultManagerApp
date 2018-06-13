import { Component, OnInit, ViewChild } from '@angular/core';
import { GeneralService } from '../Services/service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IRol } from '../Models/roles';
import { DBOperation } from '../Shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../Shared/global';

@Component({

    templateUrl: 'app/Components/rol.component.html'

})

export class RolComponent implements OnInit {
    @ViewChild('modal') modal: ModalComponent;
    roles: IRol[];
    rol: IRol;
    msg: string;
    indLoading: boolean = false;
    rolFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;

    constructor(private fb: FormBuilder, private _rolService: GeneralService) { }

    ngOnInit(): void {
        this.rolFrm = this.fb.group({
            idRol: [''],
            nombre: ['', Validators.required],
            personas: {}
        });

        this.LoadRoles();
    }

    LoadRoles(): void {
        this.indLoading = true;
        this._rolService.get(Global.BASE_ROL_ENDPOINT)
            .subscribe(roles => { this.roles = roles; this.indLoading = false; },
                error => this.msg = <any>error);
    }

    addRoles() {
        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Agregar Rol";
        this.modalBtnTitle = "Agregar";
        this.rolFrm.reset();
        this.modal.open();
    }

    editRoles(id: number) {
        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Actualizar Rol";
        this.modalBtnTitle = "Actualizar";
        this.rol = this.roles.filter(x => x.idRol == id)[0];
        this.rol.personas = {};
        this.rolFrm.setValue(this.rol);      
        this.modal.open();
    }

    deleteRoles(id: number) {
        this.dbops = DBOperation.delete;
        this.SetControlsState(false);
        this.modalTitle = "Esta seguro que desea eliminar?";
        this.modalBtnTitle = "Eliminar";
        this.rol = this.roles.filter(x => x.idRol == id)[0];
        this.rol.personas = {};
        this.rolFrm.setValue(this.rol);      
        this.modal.open();
    }

    SetControlsState(isEnable: boolean) {
        isEnable ? this.rolFrm.enable() : this.rolFrm.disable();
    }

    onSubmit(formData: any) {
        this.msg = "";

        switch (this.dbops) {
            case DBOperation.create:
                this._rolService.post(Global.BASE_ROL_ENDPOINT, formData._value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Rol creado exitosamente!";
                            this.LoadRoles();
                        }
                        else {
                            this.msg = "There is some issue in saving records, please contact to system administrator!"
                        }

                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
            case DBOperation.update:
                this._rolService.put(Global.BASE_ROL_ENDPOINT, formData._value.idRol, formData._value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Rol actualizado exitosamente!";
                            this.LoadRoles();
                        }
                        else {
                            this.msg = "There is some issue in saving records, please contact to system administrator!"
                        }

                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
            case DBOperation.delete:
                this._rolService.delete(Global.BASE_EQUIPO_ENDPOINT, formData._value.idRol).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Rol eliminado exitosamente!";
                            this.LoadRoles();
                        }
                        else {
                            this.msg = "There is some issue in saving records, please contact to system administrator!"
                        }

                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
        }
    }
}