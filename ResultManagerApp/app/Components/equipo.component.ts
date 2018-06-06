import { Component, OnInit, ViewChild } from '@angular/core';
import { EquipoService } from '../Services/equipo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IEquipo } from '../Models/equipos';
import { DBOperation } from '../Shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../Shared/global';

@Component({

    templateUrl: 'app/Components/equipo.component.html'

})

export class EquipoComponent implements OnInit {
    @ViewChild('modal') modal: ModalComponent;
    equipos: IEquipo[];
    equipo: IEquipo;
    msg: string;
    indLoading: boolean = false;
    equipoFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;

    constructor(private fb: FormBuilder, private _equipoService: EquipoService) { }

    ngOnInit(): void {
        this.equipoFrm = this.fb.group({
            idEquipo: [''],
            nombre: ['', Validators.required],
            encargado: ['', Validators.required],
            telefono: ['', Validators.required]
        });

        this.LoadEquipos();
    }

    LoadEquipos(): void {
        this.indLoading = true;
        this._equipoService.get(Global.BASE_EQUIPO_ENDPOINT)
            .subscribe(equipos => { this.equipos = equipos; this.indLoading = false; },
                error => this.msg = <any>error);
    }

    addEquipo() {
        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Agregar Equipo";
        this.modalBtnTitle = "Agregar";
        this.equipoFrm.reset();
        this.modal.open();
    }

    editEquipo(id: number) {
        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Actualizar Equipo";
        this.modalBtnTitle = "Actualizar";
        this.equipo = this.equipos.filter(x => x.idEquipo == id)[0];
        this.equipoFrm.setValue(this.equipo);
        this.modal.open();
    }

    deleteEquipo(id: number) {
        this.dbops = DBOperation.delete;
        this.SetControlsState(false);
        this.modalTitle = "Esta seguro que desea eliminar?";
        this.modalBtnTitle = "Eliminar";
        this.equipo = this.equipos.filter(x => x.idEquipo == id)[0];
        this.equipoFrm.setValue(this.equipo);
        this.modal.open();
    }

    SetControlsState(isEnable: boolean) {
        isEnable ? this.equipoFrm.enable() : this.equipoFrm.disable();
    }

    onSubmit(formData: any) {
        this.msg = "";

        switch (this.dbops) {
            case DBOperation.create:
                this._equipoService.post(Global.BASE_EQUIPO_ENDPOINT, formData._value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Equipo creado exitosamente!";
                            this.LoadEquipos();
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
                this._equipoService.put(Global.BASE_EQUIPO_ENDPOINT, formData._value.idEquipo, formData._value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Equipo actualizado exitosamente!";
                            this.LoadEquipos();
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
                this._equipoService.delete(Global.BASE_EQUIPO_ENDPOINT, formData._value.idEquipo).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Equipo eliminado exitosamente!";
                            this.LoadEquipos();
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