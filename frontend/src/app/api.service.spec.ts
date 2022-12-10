import { TestBed, inject } from '@angular/core/testing';

import { ApiService } from './api.service';
// import { BaseRequestOptions, Http, XHRBackend } from '@angular/http';
// import { MockBackend } from '@angular/http/testing';
import { HttpXhrBackend } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { HttpResponseBase } from '@angular/common/http';
import { HttpBackend } from '@angular/common/http';
describe('ApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useFactory: (backend: any) => {
            return new HttpClient(backend);
          },
          deps: [HttpBackend]
        },
        HttpBackend,
        ApiService
      ]
    });
  });

  it('should ...', inject([ApiService], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));
});