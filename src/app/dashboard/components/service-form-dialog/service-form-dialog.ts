import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Service, ServiceDto } from '../../../core/interfaces/service.interface';
import { ServicesService } from '../../../core/services/services';

@Component({
  selector: 'app-service-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './service-form-dialog.html',
  styleUrls: ['./service-form-dialog.scss']
})
export class ServiceFormDialogComponent implements OnInit {
  serviceForm!: FormGroup;
  isLoading = false;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ServiceFormDialogComponent>,
    private servicesService: ServicesService,
    @Inject(MAT_DIALOG_DATA) public data: { service?: Service }
  ) { }

  ngOnInit(): void {
    this.isEditMode = !!this.data?.service;

    this.serviceForm = this.fb.group({
      name: ['', [Validators.required]],
      price: [null, [Validators.required, Validators.min(0.01)]],
      duration: [null, [Validators.required, Validators.min(1), Validators.pattern('^[0-9]*$')]]
    });

    if (this.isEditMode && this.data.service) {
      this.serviceForm.patchValue(this.data.service);
    }
  }

  onSubmit() {
    if (this.serviceForm.invalid) {
      this.serviceForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const formValue: ServiceDto = this.serviceForm.value;

    const operation = this.isEditMode
      ? this.servicesService.updateService(this.data.service!.id, formValue)
      : this.servicesService.createService(formValue);

    operation.subscribe({
      next: (response) => {
        this.isLoading = false;
        this.dialogRef.close(response);
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Erro ao salvar serviço', err);
      }
    });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
