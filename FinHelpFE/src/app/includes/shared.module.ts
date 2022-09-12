import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

/**
 * This module stores all external modules, libraries, components,...
 *
 * The purpose is to minimize importing codes when other modules of the application need to use some common sets of imports
 */
@NgModule({
    declarations: [],
    imports: [CommonModule, FormsModule, TranslateModule.forChild(), NgbModule],
    exports: [CommonModule, FormsModule, TranslateModule, ReactiveFormsModule, NgbModule],
})
export class SharedModule {}
