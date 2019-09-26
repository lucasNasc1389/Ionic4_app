import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MenuToogleComponent } from './components/menu-toogle/menu-toogle.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';

@NgModule({
  declarations: [LogoutButtonComponent, MenuToogleComponent],
  imports: [IonicModule],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    MenuToogleComponent,
    LogoutButtonComponent
  ]
})
export class SharedModule {}
