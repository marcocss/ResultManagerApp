"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var equipo_service_1 = require("../Services/equipo.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../Shared/enum");
var global_1 = require("../Shared/global");
var EquipoComponent = /** @class */ (function () {
    function EquipoComponent(fb, _equipoService) {
        this.fb = fb;
        this._equipoService = _equipoService;
        this.indLoading = false;
    }
    EquipoComponent.prototype.ngOnInit = function () {
        this.equipoFrm = this.fb.group({
            idEquipo: [''],
            nombre: ['', forms_1.Validators.required],
            encargado: ['', forms_1.Validators.required],
            telefono: ['', forms_1.Validators.required]
        });
        this.LoadEquipos();
    };
    EquipoComponent.prototype.LoadEquipos = function () {
        var _this = this;
        this.indLoading = true;
        this._equipoService.get(global_1.Global.BASE_EQUIPO_ENDPOINT)
            .subscribe(function (equipos) { _this.equipos = equipos; _this.indLoading = false; }, function (error) { return _this.msg = error; });
    };
    EquipoComponent.prototype.addEquipo = function () {
        this.dbops = enum_1.DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Agregar Equipo";
        this.modalBtnTitle = "Agregar";
        this.equipoFrm.reset();
        this.modal.open();
    };
    EquipoComponent.prototype.editEquipo = function (id) {
        this.dbops = enum_1.DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Actualizar Equipo";
        this.modalBtnTitle = "Actualizar";
        this.equipo = this.equipos.filter(function (x) { return x.idEquipo == id; })[0];
        this.equipoFrm.setValue(this.equipo);
        this.modal.open();
    };
    EquipoComponent.prototype.deleteEquipo = function (id) {
        this.dbops = enum_1.DBOperation.delete;
        this.SetControlsState(false);
        this.modalTitle = "Esta seguro que desea eliminar?";
        this.modalBtnTitle = "Eliminar";
        this.equipo = this.equipos.filter(function (x) { return x.idEquipo == id; })[0];
        this.equipoFrm.setValue(this.equipo);
        this.modal.open();
    };
    EquipoComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.equipoFrm.enable() : this.equipoFrm.disable();
    };
    EquipoComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._equipoService.post(global_1.Global.BASE_EQUIPO_ENDPOINT, formData._value).subscribe(function (data) {
                    if (data == 1) //Success
                     {
                        _this.msg = "Equipo creado exitosamente!";
                        _this.LoadEquipos();
                    }
                    else {
                        _this.msg = "There is some issue in saving records, please contact to system administrator!";
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
            case enum_1.DBOperation.update:
                this._equipoService.put(global_1.Global.BASE_EQUIPO_ENDPOINT, formData._value.idEquipo, formData._value).subscribe(function (data) {
                    if (data == 1) //Success
                     {
                        _this.msg = "Equipo actualizado exitosamente!";
                        _this.LoadEquipos();
                    }
                    else {
                        _this.msg = "There is some issue in saving records, please contact to system administrator!";
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
            case enum_1.DBOperation.delete:
                this._equipoService.delete(global_1.Global.BASE_EQUIPO_ENDPOINT, formData._value.idEquipo).subscribe(function (data) {
                    if (data == 1) //Success
                     {
                        _this.msg = "Equipo eliminado exitosamente!";
                        _this.LoadEquipos();
                    }
                    else {
                        _this.msg = "There is some issue in saving records, please contact to system administrator!";
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
        }
    };
    __decorate([
        core_1.ViewChild('modal'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], EquipoComponent.prototype, "modal", void 0);
    EquipoComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/Components/equipo.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, equipo_service_1.EquipoService])
    ], EquipoComponent);
    return EquipoComponent;
}());
exports.EquipoComponent = EquipoComponent;
//# sourceMappingURL=equipo.component.js.map