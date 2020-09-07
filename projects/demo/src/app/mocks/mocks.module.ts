import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProvidersWCSConfig, ProvidersWCSFactoryModule } from '@perpendicular/providers-wcs';
import { PerpendicularTestingModule } from '@perpendicular/test';
import { Angulartics2Module } from 'angulartics2';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

/**
 * Module containing common mock functionality for unit tests
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProvidersWCSFactoryModule,
    PerpendicularTestingModule,
    Angulartics2Module.forRoot(),
    RouterTestingModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: ProvidersWCSConfig, useClass: ProvidersWCSConfig}
  ]
})
export class MocksModule { }
