import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '../../services/auth.service';
import { LoginComponent } from './login.component';
import { AuthServiceMock } from 'src/app/mocks/auth-service.mock';
// import { AuthServiceMock } from '../../mocks/auth-service.mock';

describe('Pruebas del LoginComponent', () => {
  let testComponent: LoginComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        MatFormFieldModule,
        MatInputModule,
        PipesModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      providers: [
        {
          provide: AuthService,
          useClass: AuthServiceMock,
        },
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(LoginComponent);
    testComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Si el campo email esta vacio el FormControl del email debe ser invalido', () => {
    testComponent.loginForm.setValue({ email: null, password: null });
    expect(testComponent.emailControl.invalid).toBeTrue();
  });

  it('Si el campo password esta vacio el FormControl del password debe ser invalido', () => {
    testComponent.loginForm.setValue({ email: null, password: null });
    expect(testComponent.passwordControl.invalid).toBeTrue();
  });

  it('Si el loginForm es invalido, debe marcar todos los controles como touched', () => {
    testComponent.loginForm.setValue({ email: null, password: null });
    const spyOnMarkAllAsTouched = spyOn(
      testComponent.loginForm,
      'markAllAsTouched'
    );

    testComponent.onSubmit();

    expect(spyOnMarkAllAsTouched).toHaveBeenCalled();
  });

  it('Si el loginForm es valido, debe llamar al metodo login del AuthService', () => {
    testComponent.loginForm.setValue({
      email: 'test@mail.com',
      password: '123456',
    });
    const spyOnAuthServiceLogin = spyOn(TestBed.inject(AuthService), 'login');
    testComponent.onSubmit();
    expect(testComponent.loginForm.valid).toBeTrue();
    expect(spyOnAuthServiceLogin).toHaveBeenCalled();
  });
});
