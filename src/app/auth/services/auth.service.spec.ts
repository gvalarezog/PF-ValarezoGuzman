import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService, LoginFormValue } from './auth.service';
import { Usuario } from 'src/app/core/models';
import { Router } from '@angular/router';
import { skip } from 'rxjs';

describe('Pruebas sobre AuthService', () => {
  let service: AuthService;
  let httpController: HttpTestingController;
  const apiBase = 'http://localhost:3000/';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    }).compileComponents();

    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('El login debe consultar al API los datos recogidos del formulario para verificar si es quien dice ser', (done) => {
    const loginFake: LoginFormValue = {
      email: 'test@mail.com',
      password: '123456',
    };
    const MOCK_REQUEST_RESULT: Usuario[] = [
      {
        id: 1,
        apellido: 'testapellido',
        email: loginFake.email,
        nombre: 'testnombre',
        password: loginFake.password,
        role: 'admin',
        token: 'asdjkasdnasjhdj36231321',
      },
    ];
    spyOn(TestBed.inject(Router), 'navigate');
    service
      .obtenerUsuarioAutenticado()
      .pipe(skip(1))
      .subscribe((usuario) => {
        expect(usuario).toEqual(MOCK_REQUEST_RESULT[0]);
        done();
      });
    service.login(loginFake);
    httpController
      .expectOne({
        // http://localhost:3000/usuarios
        url: `${apiBase}usuarios?email=${loginFake.email}&password=${loginFake.password}`,
        method: 'GET',
      })
      .flush(MOCK_REQUEST_RESULT);
  });

  it('El logout debe emitir un authUser null, remover el token del Localstorage y redireccionar al usuario', () => {
    const spyOnNavigate = spyOn(TestBed.inject(Router), 'navigate');
    const loginFake: LoginFormValue = {
      email: 'test@mail.com',
      password: '123456',
    };
    const MOCK_REQUEST_RESULT: Usuario[] = [
      {
        id: 1,
        apellido: 'testapellido',
        email: loginFake.email,
        nombre: 'testnombre',
        password: loginFake.password,
        role: 'admin',
        token: 'asdjkasdnasjhdj36231321',
      },
    ];

    service.login(loginFake);
    httpController
      .expectOne({
        // http://localhost:3000/usuarios
        url: `${apiBase}usuarios?email=${loginFake.email}&password=${loginFake.password}`,
        method: 'GET',
      })
      .flush(MOCK_REQUEST_RESULT);

    service.logout();

    const tokenLs = localStorage.getItem('token');

    expect(tokenLs).toBeNull();
    expect(spyOnNavigate).toHaveBeenCalled();
  });
});
