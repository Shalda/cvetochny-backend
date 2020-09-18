(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-admin-module"],{

/***/ "./src/app/admin/admin.component.css":
/*!*******************************************!*\
  !*** ./src/app/admin/admin.component.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".admin__section {\r\n    max-width: 98vw;\r\n}\r\n\r\n.admin__title {\r\n    text-align: center;\r\n    font-size: 25px;\r\n    font-weight: bold;\r\n    padding: 25px;\r\n}\r\n\r\n.admin__wrapper {\r\n    padding: 20px;\r\n    display: flex;\r\n    justify-content: flex-start;\r\n}\r\n\r\n.admin__nav {\r\n    display: flex;\r\n    flex-direction: column;\r\n    margin-right: 40px;\r\n}\r\n\r\n.admin__nav button {\r\n    margin-bottom: 16px;\r\n}\r\n\r\n.navbar-brand {\r\n    font-family: Roboto, sans-serif, Arial;\r\n    font-weight: normal;\r\n}\r\n\r\nbutton[mat-raised-button]{\r\n\r\n}\r\n\r\n"

/***/ }),

/***/ "./src/app/admin/admin.component.html":
/*!********************************************!*\
  !*** ./src/app/admin/admin.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section class=\"admin__section\"><p>\r\n    <div class=\"admin__title\">\r\n        <a class=\"navbar-brand\">админ панель: {{title}}</a>\r\n    </div>\r\n    <div class=\"admin__wrapper\">\r\n        <div class=\"admin__nav\">\r\n            <button mat-raised-button\r\n                    class=\"admin__nav_shopLink\"\r\n                    routerLink=\"/admin/main/products\"\r\n                    routerLinkActive=\"mat-accent\" (click)=\"titleChange('Магазин')\">\r\n                Магазин\r\n            </button>\r\n            <button mat-raised-button\r\n                    class=\"admin__nav_visualLink\"\r\n                    routerLink=\"/admin/main/visuals\"\r\n                    routerLinkActive=\"mat-accent\" (click)=\"titleChange('оформление')\">\r\n                Оформление\r\n            </button>\r\n            <button mat-raised-button\r\n                    class=\"admin__nav_visualLink\"\r\n                    routerLink=\"/admin/main/orders\"\r\n                    routerLinkActive=\"mat-accent\" (click)=\"titleChange('Заказы')\">\r\n                Заказы\r\n            </button>\r\n            <button mat-raised-button color=\"warn\"\r\n                    class=\"admin__nav_exitLink\" (click)=\"logout()\">\r\n                Выход\r\n            </button>\r\n        </div>\r\n        <div class=\"admin__content\">\r\n            <router-outlet></router-outlet>\r\n        </div>\r\n    </div>\r\n</section>"

/***/ }),

/***/ "./src/app/admin/admin.component.ts":
/*!******************************************!*\
  !*** ./src/app/admin/admin.component.ts ***!
  \******************************************/
/*! exports provided: AdminComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminComponent", function() { return AdminComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _model_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../model/auth.service */ "./src/app/model/auth.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AdminComponent = /** @class */ (function () {
    function AdminComponent(auth, router) {
        this.auth = auth;
        this.router = router;
        this.title = 'Магазин';
    }
    AdminComponent.prototype.titleChange = function (text) {
        this.title = text;
    };
    AdminComponent.prototype.logout = function () {
        this.auth.clear();
        this.router.navigateByUrl('/');
    };
    AdminComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-admin',
            template: __webpack_require__(/*! ./admin.component.html */ "./src/app/admin/admin.component.html"),
            styles: [__webpack_require__(/*! ./admin.component.css */ "./src/app/admin/admin.component.css")]
        }),
        __metadata("design:paramtypes", [_model_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], AdminComponent);
    return AdminComponent;
}());



/***/ }),

/***/ "./src/app/admin/admin.module.ts":
/*!***************************************!*\
  !*** ./src/app/admin/admin.module.ts ***!
  \***************************************/
/*! exports provided: AdminModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminModule", function() { return AdminModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _auth_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth.component */ "./src/app/admin/auth.component.ts");
/* harmony import */ var _admin_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./admin.component */ "./src/app/admin/admin.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _auth_guard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./auth.guard */ "./src/app/admin/auth.guard.ts");
/* harmony import */ var _productEditor_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./productEditor.component */ "./src/app/admin/productEditor.component.ts");
/* harmony import */ var _productTable_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./productTable.component */ "./src/app/admin/productTable.component.ts");
/* harmony import */ var _common_common_app_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../common/common-app.module */ "./src/app/common/common-app.module.ts");
/* harmony import */ var _visualEditor_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./visualEditor.component */ "./src/app/admin/visualEditor.component.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _login_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./login.component */ "./src/app/admin/login.component.ts");
/* harmony import */ var _orderTable_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./orderTable.component */ "./src/app/admin/orderTable.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














var routing = _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild([
    { path: 'auth', component: _auth_component__WEBPACK_IMPORTED_MODULE_3__["AuthComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_6__["AuthGuard"]] },
    /*need to delete*/ { path: 'reg', component: _login_component__WEBPACK_IMPORTED_MODULE_12__["SignComponent"] },
    {
        path: 'main', component: _admin_component__WEBPACK_IMPORTED_MODULE_4__["AdminComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_6__["AuthGuard"]],
        children: [
            { path: 'products/:mode/:id', component: _productEditor_component__WEBPACK_IMPORTED_MODULE_7__["ProductEditorComponent"] },
            { path: 'products/:mode', component: _productEditor_component__WEBPACK_IMPORTED_MODULE_7__["ProductEditorComponent"] },
            { path: 'products', component: _productTable_component__WEBPACK_IMPORTED_MODULE_8__["ProductTableComponent"] },
            { path: 'orders', component: _orderTable_component__WEBPACK_IMPORTED_MODULE_13__["OrderTableComponent"] },
            { path: 'visuals/:mode/:id', component: _visualEditor_component__WEBPACK_IMPORTED_MODULE_10__["VisualEditorComponent"] },
            { path: 'visuals/:mode', component: _visualEditor_component__WEBPACK_IMPORTED_MODULE_10__["VisualEditorComponent"] },
            { path: 'visuals', component: _productTable_component__WEBPACK_IMPORTED_MODULE_8__["ProductTableComponent"] },
            { path: '**', redirectTo: 'products' }
        ]
    },
    { path: '**', redirectTo: 'auth' }
]);
var AdminModule = /** @class */ (function () {
    function AdminModule() {
    }
    AdminModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
                routing,
                _common_common_app_module__WEBPACK_IMPORTED_MODULE_9__["CommonAppModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatCheckboxModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatRadioModule"]
            ],
            providers: [_auth_guard__WEBPACK_IMPORTED_MODULE_6__["AuthGuard"]],
            declarations: [
                _auth_component__WEBPACK_IMPORTED_MODULE_3__["AuthComponent"],
                _admin_component__WEBPACK_IMPORTED_MODULE_4__["AdminComponent"],
                _productTable_component__WEBPACK_IMPORTED_MODULE_8__["ProductTableComponent"],
                _productEditor_component__WEBPACK_IMPORTED_MODULE_7__["ProductEditorComponent"],
                _visualEditor_component__WEBPACK_IMPORTED_MODULE_10__["VisualEditorComponent"],
                _login_component__WEBPACK_IMPORTED_MODULE_12__["SignComponent"],
                _orderTable_component__WEBPACK_IMPORTED_MODULE_13__["OrderTableComponent"]
            ]
        })
    ], AdminModule);
    return AdminModule;
}());



/***/ }),

/***/ "./src/app/admin/auth.component.css":
/*!******************************************!*\
  !*** ./src/app/admin/auth.component.css ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".auth__section {\r\n    margin: 0 auto;\r\n    width: 40vw;\r\n    text-align: center;\r\n\r\n}\r\n\r\n.auth__section h3 {\r\n    margin-top: 30px;\r\n    font-size: 20px;\r\n}\r\n\r\n.auth__form {\r\n    padding: 32px 32px;\r\n    /*border-radius: 2px;*/\r\n    /*box-shadow: 0 2px 2px rgba(0, 0, 0, .24), 0 0 2px rgba(0, 0, 0, .12);*/\r\n    /*background-color: #f0f0f0;*/\r\n    color: #4d4d4d;\r\n    margin-top: 40px;\r\n}\r\n\r\n.auth__error {\r\n    font-family: Roboto, sans-serif, Arial;\r\n    margin-top: 20px;\r\n    color: rgb(244, 67, 54);;\r\n    padding: 10px;\r\n    border: 1px solid rgb(244, 67, 54);\r\n    border-radius: 2px;\r\n    background-color: #dddddd;\r\n    font-size: 20px;\r\n}\r\n\r\nmat-form-field {\r\n    display: block;\r\n}\r\n\r\nmat-form-field input {\r\n    width: 100%;\r\n    padding: 6px;\r\n}\r\n"

/***/ }),

/***/ "./src/app/admin/auth.component.html":
/*!*******************************************!*\
  !*** ./src/app/admin/auth.component.html ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section class=\"auth__section\">\n    <div class=\"auth__title\">\n        <h3>Вход в панель администратора</h3>\n    </div>\n    <div class=\"auth__error\"\n    *ngIf=\"errorMessage != null\">\n    {{errorMessage}}\n    </div>\n    <div class=\"auth__form\">\n        <form novalidate #form=\"ngForm\" (ngSubmit)=\"authenticate(form)\">\n            <mat-form-field class=\"auth_box\">\n                <input  autofocus\n                        matInput\n                        placeholder=\"Введите имя\"\n                        name=\"username\"\n                        [(ngModel)]=\"username\"\n                        required>\n            </mat-form-field>\n            <mat-form-field class=\"auth_box\">\n                <input\n                        matInput\n                        name=\"password\"\n                        placeholder=\"Введите пароль\"\n                        [type]=\"hide ? 'password' : 'text'\"\n                        [(ngModel)]=\"password\" required\n                >\n                <button type=\"button\" mat-icon-button matSuffix (click)=\"hide = !hide\" [attr.aria-label]=\"'Hide password'\"\n                        [attr.aria-pressed]=\"hide\"\n\n                >\n                    <mat-icon>{{hide ? 'visibility_off' : 'visibility'}}</mat-icon>\n                </button>\n            </mat-form-field>\n            <div>\n                <button #authSub mat-raised-button class=\"auth__button\" type=\"submit\">Войти</button>\n            </div>\n        </form>\n    </div>\n</section>"

/***/ }),

/***/ "./src/app/admin/auth.component.ts":
/*!*****************************************!*\
  !*** ./src/app/admin/auth.component.ts ***!
  \*****************************************/
/*! exports provided: AuthComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthComponent", function() { return AuthComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _model_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../model/auth.service */ "./src/app/model/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthComponent = /** @class */ (function () {
    function AuthComponent(_router, _auth) {
        this._router = _router;
        this._auth = _auth;
        this.hide = true;
        this.userIsAuthenticated = false;
    }
    AuthComponent.prototype.authenticate = function (form) {
        var _this = this;
        if (form.valid) {
            this._auth.authenticate(this.username, this.password).subscribe(function (response) {
                if (_this.userIsAuthenticated) {
                    _this._router.navigateByUrl('/admin/main');
                }
            }, function (error) {
                console.log(error);
                _this.errorMessage = 'Ошибка аутентификации, данные неверны!';
            });
        }
        else {
            this.errorMessage = 'Необходимо заполнить все поля';
        }
    };
    AuthComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authStatusSub = this._auth.getAuthStatusListener().subscribe(function (authStatus) {
            _this.userIsAuthenticated = authStatus;
        });
    };
    AuthComponent.prototype.ngOnDestroy = function () {
        this.authStatusSub.unsubscribe();
    };
    AuthComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-auth',
            template: __webpack_require__(/*! ./auth.component.html */ "./src/app/admin/auth.component.html"),
            styles: [__webpack_require__(/*! ./auth.component.css */ "./src/app/admin/auth.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _model_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"]])
    ], AuthComponent);
    return AuthComponent;
}());



/***/ }),

/***/ "./src/app/admin/auth.guard.ts":
/*!*************************************!*\
  !*** ./src/app/admin/auth.guard.ts ***!
  \*************************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return AuthGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _model_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../model/auth.service */ "./src/app/model/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuard = /** @class */ (function () {
    function AuthGuard(_router, _auth) {
        this._router = _router;
        this._auth = _auth;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        if (!this._auth.getIsAuth) {
            this._router.navigateByUrl('/admin/auth');
            return false;
        }
        return true;
    };
    AuthGuard = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _model_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"]])
    ], AuthGuard);
    return AuthGuard;
}());



/***/ }),

/***/ "./src/app/admin/login.component.ts":
/*!******************************************!*\
  !*** ./src/app/admin/login.component.ts ***!
  \******************************************/
/*! exports provided: SignComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignComponent", function() { return SignComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _model_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../model/auth.service */ "./src/app/model/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SignComponent = /** @class */ (function () {
    function SignComponent(_router, _auth) {
        this._router = _router;
        this._auth = _auth;
        this.hide = true;
    }
    SignComponent.prototype.signin = function (form) {
        if (form.valid) {
            if (form.invalid) {
                return;
            }
            this._auth.createUser(form.value.email, form.value.username, form.value.password);
        }
    };
    SignComponent.prototype.ngOnInit = function () {
    };
    SignComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sign',
            template: "<section class=\"auth__section\">\n        <div class=\"auth__title\">\n            <h3>\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F</h3>\n        </div>\n        <div class=\"auth__error\"\n             *ngIf=\"errorMessage != null\">\n            {{errorMessage}}\n        </div>\n        <div class=\"auth__form\">\n            <form novalidate #form=\"ngForm\" (ngSubmit)=\"signin(form)\">\n                <mat-form-field class=\"auth_box\">\n                    <input  autofocus\n                            matInput\n                            placeholder=\"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 email\"\n                            name=\"email\"\n                            type=\"email\"\n                            [(ngModel)]=\"email\"\n                            required\n                            email\n                    >\n                </mat-form-field>\n                <mat-form-field class=\"auth_box\">\n                    <input  matInput\n                            placeholder=\"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043C\u044F\"\n                            name=\"username\"\n                            [(ngModel)]=\"username\"\n                            required>\n                </mat-form-field>\n                <mat-form-field class=\"auth_box\">\n                    <input\n                            matInput\n                            name=\"password\"\n                            placeholder=\"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043F\u0430\u0440\u043E\u043B\u044C\"\n                            [type]=\"hide ? 'password' : 'text'\"\n                            [(ngModel)]=\"password\" required\n                    >\n                    <button type=\"button\" mat-icon-button matSuffix (click)=\"hide = !hide\" [attr.aria-label]=\"'Hide password'\"\n                            [attr.aria-pressed]=\"hide\"\n\n                    >\n                        <mat-icon>{{hide ? 'visibility_off' : 'visibility'}}</mat-icon>\n                    </button>\n                </mat-form-field>\n                <div>\n                    <button #authSub mat-raised-button class=\"auth__button\" type=\"submit\">Register</button>\n                </div>\n            </form>\n        </div>\n    </section>",
            styles: [__webpack_require__(/*! ./auth.component.css */ "./src/app/admin/auth.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _model_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"]])
    ], SignComponent);
    return SignComponent;
}());



/***/ }),

/***/ "./src/app/admin/mime-type.validator.ts":
/*!**********************************************!*\
  !*** ./src/app/admin/mime-type.validator.ts ***!
  \**********************************************/
/*! exports provided: mimeType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mimeType", function() { return mimeType; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");

var mimeType = function (control) {
    if (typeof (control.value) === 'string') {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(null);
    }
    var file = control.value;
    var fileReader = new FileReader();
    var frObs = rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"].create(function (observer) {
        fileReader.addEventListener('loadend', function () {
            var arr = new Uint8Array(fileReader.result).subarray(0, 4);
            var header = '';
            var isValid = false;
            for (var i = 0; i < arr.length; i++) {
                header += arr[i].toString(16);
            }
            switch (header) {
                case '89504e47':
                    isValid = true;
                    break;
                case 'ffd8ffe0':
                case 'ffd8ffe1':
                case 'ffd8ffe2':
                case 'ffd8ffe3':
                case 'ffd8ffe8':
                case '47494638':
                    isValid = true;
                    break;
                default:
                    isValid = false; // Or you can use the blob.type as fallback
                    break;
            }
            if (isValid) {
                observer.next(null);
            }
            else {
                observer.next({ invalidMimeType: true });
            }
            observer.complete();
        });
        fileReader.readAsArrayBuffer(file);
    });
    return frObs;
};


/***/ }),

/***/ "./src/app/admin/orderTable.component.css":
/*!************************************************!*\
  !*** ./src/app/admin/orderTable.component.css ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/admin/orderTable.component.html":
/*!*************************************************!*\
  !*** ./src/app/admin/orderTable.component.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <label class=\"form-check-label\">\r\n        <input type=\"checkbox\" class=\"form-check-input\" [(ngModel)]=\"includeShipped\"/>\r\n        Показывать выполенные\r\n    </label>\r\n</div>\r\n<div class=\"admin_order_wrapper\" *ngFor=\"let order of getOrders()\">\r\n    <div class=\"admin_order_common_info\">\r\n        <h3>Номер заказа: {{order._id}}</h3>\r\n        <h3 class=\"admin_order_common_info_status_process\" *ngIf=\"!order.shipped\">Заказ не выполнен</h3>\r\n        <h3 class=\"admin_order_common_info_status_done\" *ngIf=\"order.shipped\">Заказ выполнен</h3>\r\n        <p>Количество товара: <span>{{order.itemCount}} шт.</span></p>\r\n        <p>Сумма заказа: <span>{{order.cartPrice}} грн.</span></p>\r\n    </div>\r\n    <div class=\"admin_order_client\">\r\n        <h3>Информация о покупателе:</h3>\r\n        <p>Имя: <span>{{order.clientName}}</span></p>\r\n        <p>Телефон: <span>{{order.clientPhone}}</span></p>\r\n        <p>Способ доставки: <span>{{order.deliveryWay}}</span></p>\r\n        <p>Способ оплаты: <span>{{order.paymentWay}}</span></p>\r\n        <div *ngIf=\"order.deliveryWay == 'доставка курьером'\">\r\n            <p>адресс: <span>{{order.addressDelivery}}</span></p>\r\n            <p>дата доставки: <span>{{order.dateDelivery}}</span></p>\r\n            <p>время: <span>{{order.timeDelivery}}</span></p>\r\n            <p>получатель: <span>{{order.receiveSolo}}</span></p>\r\n        </div>\r\n        <div *ngIf=\"order.receiveSolo !== 'лично'\">\r\n            <p>Имя получателя: <span>{{order.friendName}}</span></p>\r\n            <p *ngIf=\"order.friendPhone\">Телефон получателя: <span>{{order.friendPhone}}</span></p>\r\n        </div>\r\n        <div class=\"admin_order_nav\">\r\n            <button *ngIf=\"!order.shipped\" class=\"cart-button\" (click)=\"markShipped(order)\">Заказ выполнен\r\n            </button>\r\n            <button *ngIf=\"order.shipped\" class=\"cart-button\" (click)=\"markShipped(order)\">Отменить статус выполнен\r\n            </button>\r\n            <button class=\"cart-button\" (click)=\"delete(order._id)\">Удалить</button>\r\n        </div>\r\n    </div>\r\n    <div class=\"admin_order_items\">\r\n        <h3>Информация о заказе:</h3>\r\n        <div class=\"admin_order_item\" *ngFor=\"let item of order.cart, let i=index \">\r\n            <div>№ {{i + 1}}</div>\r\n            <p>ID товара: <span>{{item.productId}}</span></p>\r\n            <p>Наименование: <span>{{item.productName}}</span></p>\r\n            <p>Цена за ед.: <span>{{item.productPrice}} грн.</span></p>\r\n            <p>Количество товара: <span>{{item.productQuantity}}</span></p>\r\n        </div>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/admin/orderTable.component.ts":
/*!***********************************************!*\
  !*** ./src/app/admin/orderTable.component.ts ***!
  \***********************************************/
/*! exports provided: OrderTableComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderTableComponent", function() { return OrderTableComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _model_order_repository__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../model/order.repository */ "./src/app/model/order.repository.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var OrderTableComponent = /** @class */ (function () {
    function OrderTableComponent(repository) {
        this.repository = repository;
        this.includeShipped = false;
    }
    OrderTableComponent.prototype.getOrders = function () {
        var _this = this;
        return this.repository.getOrders()
            .filter(function (o) { return _this.includeShipped || !o.shipped; });
    };
    OrderTableComponent.prototype.markShipped = function (order) {
        order.shipped = !order.shipped;
        this.repository.updateOrder(order);
    };
    OrderTableComponent.prototype.delete = function (id) {
        this.repository.deleteOrder(id);
    };
    OrderTableComponent.prototype.ngOnInit = function () {
    };
    OrderTableComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-order-table',
            template: __webpack_require__(/*! ./orderTable.component.html */ "./src/app/admin/orderTable.component.html"),
            styles: [__webpack_require__(/*! ./orderTable.component.css */ "./src/app/admin/orderTable.component.css")]
        }),
        __metadata("design:paramtypes", [_model_order_repository__WEBPACK_IMPORTED_MODULE_1__["OrderRepository"]])
    ], OrderTableComponent);
    return OrderTableComponent;
}());



/***/ }),

/***/ "./src/app/admin/productEditor.component.css":
/*!***************************************************!*\
  !*** ./src/app/admin/productEditor.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".product-ed_cr-container {\r\n    display: flex;\r\n    flex-direction: column;\r\n    max-width:720px;\r\n}\r\n\r\n.product-ed_cr-container > * {\r\n    width: 100%;\r\n}\r\n\r\nmat-form-field {\r\n    padding: 1rem 2rem;\r\n    margin: 16px 0;\r\n    border-radius: 2px;\r\n    color: #4d4d4d;\r\n    box-shadow: 4px 4px 6px 0 rgba(0, 0, 0, 0.75);\r\n    background-color: #dddddd;\r\n}\r\n\r\nmat-radio-button{\r\n    color: #ffffff;\r\n    margin-right: 16px;\r\n}\r\n\r\ninput:disabled, select:disabled, textarea:disabled {\r\n    background-color: #9c9c9c;\r\n}\r\n\r\ntextarea{\r\n    height: 120px;\r\n    font-size: 16px;\r\n}\r\n\r\n.admin_sub_ex{\r\n    background-color: #4d4d4d;\r\n}\r\n"

/***/ }),

/***/ "./src/app/admin/productEditor.component.html":
/*!****************************************************!*\
  !*** ./src/app/admin/productEditor.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"product-ed_cr-container admin_editor_container\">\r\n\r\n    <div [class.bg-warning]=\"editing\"\r\n         [class.text-dark]=\"editing\">\r\n        <h5>{{editing ? \"Редактировать: \" + product.name : \"Добавить Товар\"}}</h5>\r\n    </div>\r\n    <form [formGroup]=\"form\" novalidate (ngSubmit)=\"save()\" enctype=\"multipart/form-data\">\r\n        <div class=\"form-group\">\r\n            <label>Название: </label>\r\n            <input class=\"form-control\" formControlName=\"name\"\r\n                   [class.formSub_edit]=\"formSubmitted\"\r\n                   (input)=\"product.name = $event.target.value\"\r\n            />\r\n        </div>\r\n        <div class=\"form-group\" *ngIf=\"!editing\">\r\n            <label>Родительская категория: {{product.parentCategory}}</label>\r\n            <div>Выберите родительскую категорию:</div>\r\n            <select class=\"form-control\"\r\n                    [formControlName]=\"'parentCategory'\"\r\n                    [class.formSub_edit]=\"formSubmitted\"\r\n\r\n            >\r\n                <option value=\"shop\"> Магазин\r\n                </option>\r\n                <option value=\"wedding\"> Свадебное офромление\r\n                </option>\r\n            </select>\r\n        </div>\r\n\r\n        <div class=\"form-group\">\r\n            <label>Категория: {{newCat || product.category}}</label>\r\n            <div>Выберите существующую категорию или создайте новую:</div>\r\n            <select\r\n                    class=\"form-control\"\r\n                    [formControlName]=\"'category'\"\r\n                    [class.formSub_edit]=\"formSubmitted\">\r\n                (input)=\"product.category = $event.target.value\"\r\n                <option value=\"\"></option>\r\n                <option [value]=\"c\" *ngFor=\"let c of categories\">{{c}}</option>\r\n            </select>\r\n            <div class=\"checkbox_edit_new\">\r\n                <mat-checkbox (change)=\"newCatCheck()\">Новая категория</mat-checkbox>\r\n            </div>\r\n            <div>\r\n                <label>создайте категорию:</label>\r\n                <input\r\n                        (input)=\"changeProductCategory()\"\r\n                        formControlName=\"newCategory\"\r\n                        class=\"form-control\"\r\n                />\r\n            </div>\r\n        </div>\r\n        <div class=\"form-group\">\r\n            <label>Подкатегория:\r\n                {{newSubCat || product.subcategory}}</label>\r\n            <div>Если нужно выберите существующую подкатегорию или создайте новую:</div>\r\n            <select\r\n                    class=\"form-control\"\r\n                    [formControlName]=\"'subcategory'\">\r\n                <option value=\"\"></option>\r\n                <option [value]='s' *ngFor=\"let s of subCategories\">{{s}}</option>\r\n                <option value=''>--без подкатегории--</option>\r\n            </select>\r\n            <div class=\"checkbox_edit_new\">\r\n                <mat-checkbox (input)=\"newSubCatCheck()\">Новая подкатегория\r\n                </mat-checkbox>\r\n            </div>\r\n            <div>\r\n                <label>создайте подкатегорию:</label>\r\n                <input\r\n                        class=\"form-control\"\r\n                        formControlName=\"newSubcategory\"\r\n                        (input)=\"changeProductSubCategory()\"\r\n                />\r\n            </div>\r\n        </div>\r\n        <div class=\"form-group\">\r\n            <label>Описание:</label>\r\n            <textarea class=\"form-control\" formControlName=\"description\"\r\n                      [class.formSub_edit]=\"formSubmitted\"\r\n            >\r\n            </textarea>\r\n        </div>\r\n        <div class=\"checkbox_edit_new\">\r\n            <mat-checkbox (input)=\"newNoteCheck()\" [checked]=\"!!product.note\">Добавить примечание\r\n            </mat-checkbox>\r\n        </div>\r\n      <div class=\"form-group\">\r\n        <label>Примечание:</label>\r\n        <textarea class=\"form-control\" formControlName=\"note\"\r\n        ></textarea>\r\n      </div>\r\n        <div class=\"form-group\">\r\n            <label class=\"label_img_add\">{{editing ? \"Выберите новое изображение\" : \"Добавьте изображение\"}}:</label>\r\n            <button mat-stroked-button type=\"button\" (click)=\"filePicker.click()\">Выберите изображение</button>\r\n            <input type=\"file\" #filePicker (change)=\"onImagePicked($event)\">\r\n            <div class=\"image-preview\" *ngIf=\"imagePreview !== '' && imagePreview && form.get('img').valid\">\r\n                <img [src]=\"imagePreview\" [alt]=\"product.name\">\r\n                <i class=\"fa fa-remove visual_img__remove\"\r\n                   style=\"font-size:24px;color:red\"\r\n                   (click)=\"removeImg()\"></i>\r\n            </div>\r\n        </div>\r\n        <div class=\"form-group\">\r\n            <label>Диаметр:</label>\r\n            <input class=\"form-control\" formControlName=\"diameter\"/>\r\n        </div>\r\n        <div class=\"form-group\">\r\n            <label>Цена:</label>\r\n            <input class=\"form-control\" formControlName=\"price\"\r\n                   [class.formSub_edit]=\"formSubmitted\"\r\n            />\r\n        </div>\r\n        <button class=\"auth__button_edit  admin_sub_ex\" type=\"submit\"\r\n                [disabled]=\"formSubmitted && form.invalid\"\r\n                [class.blocked]=\"formSubmitted && form.invalid\"\r\n        >\r\n            {{editing ? \"Сохранить\" : \"Создать\"}}\r\n        </button>\r\n        <button class=\"auth__button_edit  admin_sub_ex\" type=\"reset\" routerLink=\"/admin/main/products\">\r\n            Отмена\r\n        </button>\r\n    </form>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/admin/productEditor.component.ts":
/*!**************************************************!*\
  !*** ./src/app/admin/productEditor.component.ts ***!
  \**************************************************/
/*! exports provided: ProductEditorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductEditorComponent", function() { return ProductEditorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _model_product_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../model/product.model */ "./src/app/model/product.model.ts");
/* harmony import */ var _model_product_repository__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../model/product.repository */ "./src/app/model/product.repository.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _mime_type_validator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mime-type.validator */ "./src/app/admin/mime-type.validator.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ProductEditorComponent = /** @class */ (function () {
    function ProductEditorComponent(repository, router, activeRoute) {
        this.repository = repository;
        this.router = router;
        this.activeRoute = activeRoute;
        this.editing = false;
        this.formSubmitted = false;
        this.catEnable = false;
        this.subCatEnable = false;
        this.noteEnable = false;
        this.noteText = 'уважаемый посетитель, учитывая сезонность растений, ' +
            'состав букетов может немного отличаться от фотографий на сайте. Но мы гарантируем, ' +
            'что цветовая гамма, размер и стилистика букета будут соблюдены.';
    }
    ProductEditorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.editing = this.activeRoute.snapshot.params['mode'] == 'edit';
        // this.pCategory = activeRoute.snapshot.params['parentCategory'];
        this.product = new _model_product_model__WEBPACK_IMPORTED_MODULE_1__["Product"]();
        if (this.editing) {
            Object.assign(this.product, this.repository.getProduct(this.activeRoute.snapshot.params['id']));
        }
        else {
            this.product.parentCategory = 'shop';
        }
        this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormGroup"]({
            'name': new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](this.product.name || null, { validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required] }),
            'parentCategory': new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](this.product.parentCategory || null, { validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required] }),
            'category': new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](this.product.category || null, { validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required] }),
            'newCategory': new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]({ value: '', disabled: true }, { validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required] }),
            'subcategory': new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](this.product.subcategory || ''),
            'newSubcategory': new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]({ value: '', disabled: true }),
            'description': new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](this.product.description || null, { validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required] }),
            'note': new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]({ value: this.product.note || null, disabled: true }),
            'img': new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](this.product.img || null, {
                validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required], asyncValidators: [_mime_type_validator__WEBPACK_IMPORTED_MODULE_5__["mimeType"]]
            }),
            'diameter': new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](this.product.diameter || '', { validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].pattern('[0-9\\.]+$')] }),
            'price': new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](this.product.price || null, { validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].pattern('[0-9\\.]+$'), _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required] }),
        });
        this.form.get('parentCategory').valueChanges
            .subscribe(function (changedPCat) {
            _this.product.parentCategory = changedPCat;
            _this.product.subcategory = '';
            _this.form.patchValue({ subcategory: null });
            _this.product.category = null;
        });
        this.form.get('category').valueChanges
            .subscribe(function (changedCat) {
            _this.product.category = changedCat;
        });
        this.form.get('subcategory').valueChanges
            .subscribe(function (changedSCat) {
            _this.product.subcategory = changedSCat;
        });
        if (this.product.note) {
            this.form.get('note').enable();
            this.noteEnable = true;
        }
    };
    ProductEditorComponent.prototype.newCatCheck = function () {
        this.catEnable = !this.catEnable;
        if (this.catEnable) {
            this.form.get('newCategory').enable();
        }
        else {
            this.form.get('newCategory').disable();
        }
    };
    ProductEditorComponent.prototype.newSubCatCheck = function () {
        this.subCatEnable = !this.subCatEnable;
        if (this.subCatEnable) {
            this.form.get('newSubcategory').enable();
        }
        else {
            this.form.get('newSubcategory').disable();
        }
    };
    ProductEditorComponent.prototype.newNoteCheck = function () {
        this.noteEnable = !this.noteEnable;
        if (this.noteEnable) {
            this.form.get('note').enable();
            this.form.patchValue({ note: this.noteText });
            this.product.note = this.form.value.note;
        }
        else {
            this.product.note = null;
            this.form.patchValue({ note: null });
            console.log('disable: ' + this.form.value.note);
            this.form.get('note').disable();
        }
    };
    ProductEditorComponent.prototype.changeProductCategory = function () {
        if (this.form.value.newCategory) {
            this.form.patchValue({ category: this.form.value.newCategory });
            this.product.category = this.form.value.newCategory;
        }
        else {
            return;
        }
    };
    ProductEditorComponent.prototype.changeProductSubCategory = function () {
        if (this.form.value.newSubcategory) {
            this.form.patchValue({ subcategory: this.form.value.newSubcategory });
            this.product.subcategory = this.form.value.newSubcategory;
        }
        else {
            return;
        }
    };
    Object.defineProperty(ProductEditorComponent.prototype, "categories", {
        get: function () {
            if (!this.product.parentCategory) {
                return;
            }
            return this.repository.getCategories(this.product.parentCategory);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProductEditorComponent.prototype, "parentCategory", {
        get: function () {
            return this.repository.getParentCategories();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProductEditorComponent.prototype, "subCategories", {
        get: function () {
            if (!this.product.category) {
                return;
            }
            return this.repository.getSubCategories(this.product.category);
        },
        enumerable: true,
        configurable: true
    });
    ProductEditorComponent.prototype.removeImg = function () {
        // this.imagePreviewCollection.splice(i, 1);
        this.form.patchValue({ 'img': null });
        this.form.get('img').updateValueAndValidity();
        this.imagePreview = '';
    };
    ProductEditorComponent.prototype.onImagePicked = function (event) {
        var _this = this;
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.onload = function () {
            // this.imagePreviewCollection.push(reader.result as string);
            _this.imagePreview = reader.result;
        };
        reader.readAsDataURL(file);
        this.product.img = reader.result;
        this.form.patchValue({ 'img': file });
        this.form.get('img').updateValueAndValidity();
    };
    ProductEditorComponent.prototype.save = function () {
        var _this = this;
        this.formSubmitted = true;
        if (this.form.invalid) {
            return;
        }
        else {
            if (!this.editing) {
                this.repository.addProduct(this.form.value.name, this.form.value.parentCategory, this.form.value.category, this.form.value.subcategory, this.form.value.description, this.form.value.note, this.form.value.diameter, this.form.value.price, this.form.value.img, new Date().toLocaleString());
            }
            else {
                this.repository.updateProduct(this.product._id, this.form.value.name, this.form.value.parentCategory, this.form.value.category, this.form.value.subcategory, this.form.value.description, this.form.value.note || null, this.form.value.diameter, this.form.value.price, this.form.value.img, new Date().toLocaleString());
            }
            this.formSubmitted = false;
            this.form.reset();
            this.subsUpdatedProduct = this.repository.productsUpdated.subscribe(function (update) {
                if (update) {
                    _this.router.navigateByUrl('/admin/main/products');
                }
            });
        }
    };
    ProductEditorComponent.prototype.ngOnDestroy = function () {
        if (this.subsUpdatedProduct) {
            this.subsUpdatedProduct.unsubscribe();
        }
    };
    ProductEditorComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./productEditor.component.html */ "./src/app/admin/productEditor.component.html"),
            styles: [__webpack_require__(/*! ./productEditor.component.css */ "./src/app/admin/productEditor.component.css")]
        }),
        __metadata("design:paramtypes", [_model_product_repository__WEBPACK_IMPORTED_MODULE_2__["ProductRepository"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], ProductEditorComponent);
    return ProductEditorComponent;
}());



/***/ }),

/***/ "./src/app/admin/productTable.component.css":
/*!**************************************************!*\
  !*** ./src/app/admin/productTable.component.css ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "button[mat-raised-button] {\r\n    margin-bottom: 16px;\r\n    width: 100%;\r\n    display: inline-block;\r\n\r\n}\r\n\r\nbutton.add_item_btn {\r\n    width: unset;\r\n}\r\n\r\ntable {\r\n    border-spacing: 0 10px;\r\n    font-family: Roboto, 'Open Sans', sans-serif;\r\n    border-radius: 3px;\r\n}\r\n\r\nth {\r\n    padding: 10px 20px;\r\n    /*border: 2px solid #cecccc;*/\r\n    border: 1px solid #9a9a9a;\r\n    font-size: 0.9em;\r\n}\r\n\r\nth:first-child {\r\n    text-align: left;\r\n}\r\n\r\ntd {\r\n    vertical-align: middle;\r\n    padding: 10px;\r\n    font-size: 14px;\r\n    text-align: center;\r\n    border: 1px solid #9a9a9a;\r\n}\r\n\r\ntd:nth-child(2) {\r\n    text-align: left;\r\n}\r\n\r\n.admin__img_visual {\r\n    display: block;\r\n}"

/***/ }),

/***/ "./src/app/admin/productTable.component.html":
/*!***************************************************!*\
  !*** ./src/app/admin/productTable.component.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<button class=\"add_item_btn\" mat-raised-button [routerLink]=\"categoryIsProduct ?  ['/admin/main/products/create'] : ['/admin/main/visuals/create']\">\r\n    Добавить новый товар\r\n</button>\r\n<table class=\"admin__product_table\">\r\n    <thead>\r\n    <tr>\r\n        <th>ID</th><th>Название</th><th>Род. Категория</th><th>Категория</th><th *ngIf=\"categoryIsProduct\">Подкатегория</th><th>Фото</th><th *ngIf=\"categoryIsProduct\"  >Диамтр</th><th>Описание</th><th>Цена</th>\r\n        <th></th>\r\n    </tr>\r\n    </thead>\r\n    <tbody>\r\n    <tr *ngFor=\"let p of getProducts()\">\r\n        <td>{{p._id}}</td>\r\n        <td>{{p.name}}</td>\r\n        <td>{{p.parentCategory}}</td>\r\n        <td>{{p.category}}</td>\r\n        <td *ngIf=\"categoryIsProduct\">{{p.subcategory || ' '}}</td>\r\n        <td *ngIf=\"categoryIsProduct\" ><span class=\"admin-img\"><img [src]=\"p.img\" alt=\"adminImg\"></span></td>\r\n        <td *ngIf=\"!categoryIsProduct\"><span class=\"admin__img_visual admin-img\" *ngFor=\"let i of p.img\">\r\n\r\n                        <img [src]=\"i\" alt=\"adminImg\">\r\n            </span></td>\r\n        <td *ngIf=\"categoryIsProduct\">{{p.diameter || ' '}}</td>\r\n        <td>{{p.description}}</td>\r\n        <td>{{p.price}}</td>\r\n        <td>\r\n            <button\r\n                    mat-raised-button color=\"primary\"\r\n                    [routerLink]=\"categoryIsProduct ? ['/admin/main/products/edit', p._id, {parentCategory: p.parentCategory}] : ['/admin/main/visuals/edit', p._id, {parentCategory: p.parentCategory}]\">\r\n                Редактировать\r\n            </button>\r\n            <button mat-raised-button color=\"warn\"\r\n                    (click)=\"deleteProduct(p._id)\">\r\n                Удалить\r\n            </button>\r\n        </td>\r\n    </tr>\r\n    </tbody>\r\n</table>\r\n"

/***/ }),

/***/ "./src/app/admin/productTable.component.ts":
/*!*************************************************!*\
  !*** ./src/app/admin/productTable.component.ts ***!
  \*************************************************/
/*! exports provided: ProductTableComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductTableComponent", function() { return ProductTableComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _model_product_repository__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../model/product.repository */ "./src/app/model/product.repository.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ProductTableComponent = /** @class */ (function () {
    function ProductTableComponent(router, repository, _activeRoute) {
        this.router = router;
        this.repository = repository;
        this._activeRoute = _activeRoute;
        this.parentCategory = undefined;
        this.parentCategory = _activeRoute.snapshot.url[0].path;
    }
    ProductTableComponent.prototype.getProducts = function () {
        if (!this.categoryIsProduct) {
            return this.repository.getVisuals();
        }
        else {
            return this.repository.getProducts();
        }
    };
    // get products(): Product[] {
    //     this.length = this.getAllproducts().length;
    //     const pageIndex = this.pageSelected * this.pageSize;
    //     return  this.getAllproducts().slice(pageIndex, pageIndex + this.pageSize);
    // }
    ProductTableComponent.prototype.deleteProduct = function (id) {
        if (!this.categoryIsProduct) {
            this.repository.deleteVisual(id);
        }
        else if (this.categoryIsProduct) {
            this.repository.deleteProduct(id);
        }
        else {
            this.router.navigateByUrl('/admin/');
        }
    };
    ProductTableComponent.prototype.ngOnInit = function () {
        this.categoryIsProduct = this.parentCategory == 'products';
    };
    ProductTableComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./productTable.component.html */ "./src/app/admin/productTable.component.html"),
            styles: [__webpack_require__(/*! ./productTable.component.css */ "./src/app/admin/productTable.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _model_product_repository__WEBPACK_IMPORTED_MODULE_1__["ProductRepository"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], ProductTableComponent);
    return ProductTableComponent;
}());



/***/ }),

/***/ "./src/app/admin/visualEditor.component.css":
/*!**************************************************!*\
  !*** ./src/app/admin/visualEditor.component.css ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/admin/visualEditor.component.html":
/*!***************************************************!*\
  !*** ./src/app/admin/visualEditor.component.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"admin_editor_container\">\r\n    <div [class.bg-warning]=\"editing\"\r\n         [class.text-dark]=\"editing\">\r\n        <h5>{{editing ? \"Редактировать: \" + product.name : \"Добавить Товар\"}}</h5>\r\n    </div>\r\n    <form [formGroup]=\"form\" novalidate (ngSubmit)=\"save()\" enctype=\"multipart/form-data\">\r\n        <div class=\"form-group\">\r\n            <label>Название: </label>\r\n            <input class=\"form-control\" formControlName=\"name\"\r\n                   [class.formSub_edit]=\"formSubmitted\"\r\n            />\r\n        </div>\r\n        <div class=\"form-group\" *ngIf=\"!editing\">\r\n            <label>создайте категорию:</label>\r\n            <input class=\"form-control\" formControlName=\"category\"\r\n                   [class.formSub_edit]=\"formSubmitted\"\r\n            />\r\n        </div>\r\n        <div class=\"form-group\">\r\n            <label>Описание:</label>\r\n            <textarea class=\"form-control\" formControlName=\"description\"\r\n                      [class.formSub_edit]=\"formSubmitted\"\r\n            >\r\n</textarea>\r\n        </div>\r\n        <div class=\"form-group\">\r\n            <label class=\"label_img_add\">{{editing ? \"Выберите новые изображения\" : \"Добавьте изображения\"}}:</label>\r\n            <button mat-stroked-button type=\"button\" (click)=\"filePicker.click()\">Выберите изображение</button>\r\n            <input type=\"file\" #filePicker (change)=\"onImagePicked($event)\" multiple>\r\n            <div *ngIf=\"imagePreviewCollection.length > 0;\">\r\n                <div class=\"image-preview\" *ngFor=\"let image of imagePreviewCollection, index as i\">\r\n                    <img [src]=\"image\" [alt]=\"form.value.name\">\r\n                    <i class=\"fa fa-remove visual_img__remove\"\r\n                       style=\"font-size:24px;color:red\"\r\n                       (click)=\"removeImg(i)\"></i>\r\n                </div>\r\n            </div>\r\n\r\n\r\n        </div>\r\n        <div class=\"form-group\">\r\n            <label>Цена:</label>\r\n            <input class=\"form-control\" formControlName=\"price\"\r\n                   [class.formSub_edit]=\"formSubmitted\"\r\n            />\r\n        </div>\r\n        <button\r\n                class=\"auth__button_edit\" type=\"submit\"\r\n                [disabled]=\"formSubmitted && form.invalid\"\r\n                [class.blocked]=\"formSubmitted && form.invalid\"\r\n        >\r\n            {{editing ? \"Сохранить\" : \"Создать\"}}\r\n        </button>\r\n        <button\r\n                class=\"auth__button_edit\"\r\n                type=\"reset\" routerLink=\"/admin/main/visuals\"\r\n        >\r\n            Отмена\r\n        </button>\r\n    </form>\r\n</div>"

/***/ }),

/***/ "./src/app/admin/visualEditor.component.ts":
/*!*************************************************!*\
  !*** ./src/app/admin/visualEditor.component.ts ***!
  \*************************************************/
/*! exports provided: VisualEditorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VisualEditorComponent", function() { return VisualEditorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _model_product_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../model/product.model */ "./src/app/model/product.model.ts");
/* harmony import */ var _model_product_repository__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../model/product.repository */ "./src/app/model/product.repository.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var VisualEditorComponent = /** @class */ (function () {
    function VisualEditorComponent(repository, router, activeRoute, fb) {
        this.repository = repository;
        this.router = router;
        this.activeRoute = activeRoute;
        this.fb = fb;
        this.editing = false;
        this.formSubmitted = false;
        this.imagePreviewCollection = new Array();
    }
    VisualEditorComponent.prototype.ngOnInit = function () {
        this.editing = this.activeRoute.snapshot.params['mode'] == 'edit';
        this.product = new _model_product_model__WEBPACK_IMPORTED_MODULE_1__["Visual"]();
        if (this.editing) {
            Object.assign(this.product, this.repository.getVisual(this.activeRoute.snapshot.params['id']));
        }
        else {
            this.product.parentCategory = 'oformlenie';
        }
        this.form = this.fb.group({
            'name': [this.product.name || null, [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]],
            'parentCategory': [this.product.parentCategory || null, [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]],
            'category': [this.product.category || null, [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]],
            'description': [this.product.description || null, [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]],
            'price': [this.product.price || null, [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].pattern('[0-9\\.]+$'), _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]],
            'img': this.fb.array([], [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required])
        });
        var imagesForm = this.form.controls['img'];
        if (this.product.img && this.product.img.length > 0) {
            for (var _i = 0, _a = this.product.img; _i < _a.length; _i++) {
                var image = _a[_i];
                imagesForm.push(this.fb.control(image));
            }
        }
    };
    VisualEditorComponent.prototype.onImagePicked = function (event) {
        var _this = this;
        var imagesForm = this.form.controls['img'];
        this.imagePreviewCollection = [];
        var fileList = event.target.files;
        while (imagesForm.length !== 0) {
            imagesForm.removeAt(0);
        }
        var _loop_1 = function (i) {
            var reader = new FileReader();
            reader.readAsDataURL(fileList[i]);
            reader.onload = function () {
                _this.imagePreviewCollection.push(reader.result);
            };
            imagesForm.push(this_1.fb.control(fileList[i]));
            this_1.form.get('img').updateValueAndValidity();
        };
        var this_1 = this;
        for (var i = 0; i < fileList.length; i++) {
            _loop_1(i);
        }
    };
    VisualEditorComponent.prototype.removeImg = function (i) {
        var imagesForm = this.form.controls['img'];
        this.imagePreviewCollection.splice(i, 1);
        imagesForm.removeAt(i);
    };
    VisualEditorComponent.prototype.save = function () {
        this.formSubmitted = true;
        if (this.form.invalid) {
            return;
        }
        else {
            if (!this.editing) {
                this.repository.addVisual(this.form.value.name, this.form.value.parentCategory, this.form.value.category, this.form.value.description, this.form.value.price, this.form.controls['img'].value);
            }
            else {
                this.repository.updateVisual(this.product._id, this.form.value.name, this.form.value.parentCategory, this.form.value.category, this.form.value.description, this.form.value.price, this.form.controls['img'].value);
            }
            this.formSubmitted = false;
            this.form.reset();
            this.router.navigateByUrl('/admin/main/visuals');
        }
    };
    VisualEditorComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./visualEditor.component.html */ "./src/app/admin/visualEditor.component.html"),
            styles: [__webpack_require__(/*! ./visualEditor.component.css */ "./src/app/admin/visualEditor.component.css")]
        }),
        __metadata("design:paramtypes", [_model_product_repository__WEBPACK_IMPORTED_MODULE_2__["ProductRepository"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"]])
    ], VisualEditorComponent);
    return VisualEditorComponent;
}());



/***/ }),

/***/ "./src/app/model/product.model.ts":
/*!****************************************!*\
  !*** ./src/app/model/product.model.ts ***!
  \****************************************/
/*! exports provided: Product, Visual */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Product", function() { return Product; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Visual", function() { return Visual; });
var Product = /** @class */ (function () {
    function Product(_id, name, parentCategory, category, subcategory, diameter, img, description, note, price, create_ts, newProd) {
        this._id = _id;
        this.name = name;
        this.parentCategory = parentCategory;
        this.category = category;
        this.subcategory = subcategory;
        this.diameter = diameter;
        this.img = img;
        this.description = description;
        this.note = note;
        this.price = price;
        this.create_ts = create_ts;
        this.newProd = newProd;
    }
    return Product;
}());

var Visual = /** @class */ (function () {
    function Visual(_id, name, parentCategory, category, img, description, price, create_ts) {
        this._id = _id;
        this.name = name;
        this.parentCategory = parentCategory;
        this.category = category;
        this.img = img;
        this.description = description;
        this.price = price;
        this.create_ts = create_ts;
    }
    return Visual;
}());



/***/ })

}]);
//# sourceMappingURL=admin-admin-module.js.map