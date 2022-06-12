import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    MdbCarouselModule,
    ReactiveFormsModule,
    FormBuilder,
  ],
  declarations: [],
})
export class LoginModule { }
