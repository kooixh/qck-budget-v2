import { TestBed } from '@angular/core/testing';

import { BarcodeApiService } from './barcode-api.service';

describe('BarcodeApiService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: BarcodeApiService = TestBed.get(BarcodeApiService);
        expect(service).toBeTruthy();
    });
});
