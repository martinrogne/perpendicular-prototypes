import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    Angulartics2Module.forRoot(),
    RouterTestingModule,
    ReactiveFormsModule,
  ],
  providers: [
  ]
})
export class MocksModule { }
