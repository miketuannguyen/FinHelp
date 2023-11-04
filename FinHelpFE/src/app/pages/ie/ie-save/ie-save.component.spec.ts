import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IESaveComponent } from './ie-save.component';

describe('IeSaveComponent', () => {
    let component: IESaveComponent;
    let fixture: ComponentFixture<IESaveComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [IESaveComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(IESaveComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
