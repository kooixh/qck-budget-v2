import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTransactionPage } from './view-transaction.page';

describe('ViewTransactionPage', () => {
    let component: ViewTransactionPage;
    let fixture: ComponentFixture<ViewTransactionPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ViewTransactionPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ViewTransactionPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
