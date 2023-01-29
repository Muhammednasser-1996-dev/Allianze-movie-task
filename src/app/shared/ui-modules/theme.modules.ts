import { NgModule } from '@angular/core';

// ANGULAR MATERIAL

// PRIME NG
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ChartModule } from 'primeng/chart';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CheckboxModule } from 'primeng/checkbox';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuModule } from 'primeng/menu';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { TabViewModule } from 'primeng/tabview';


const PRIME_NG_MODULES = [
  InputTextModule,
  ButtonModule,
  DropdownModule,
  DynamicDialogModule,
  InputSwitchModule,
  TableModule,
  DialogModule,
  ChartModule,
  MessagesModule,
  ToastModule,
  MultiSelectModule,
  CalendarModule,
  ConfirmDialogModule,
  CheckboxModule,
  MenuModule,
  CardModule, TooltipModule, TabViewModule
];
@NgModule({
  imports: [...PRIME_NG_MODULES],
  declarations: [],
  exports: [...PRIME_NG_MODULES],
  providers: [ ConfirmationService],
})
export class ThemeModule { }
