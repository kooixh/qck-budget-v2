import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAccountsPage } from './view-accounts.page';

describe('ViewAccountsPage', () => {
    let component: ViewAccountsPage;
    let fixture: ComponentFixture<ViewAccountsPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ViewAccountsPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ViewAccountsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
