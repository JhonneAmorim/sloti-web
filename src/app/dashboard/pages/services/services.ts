import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CurrencyPipe } from '@angular/common';
import { Service } from '../../../core/interfaces/service.interface';
import { ServicesService } from '../../../core/services/services';
import { ServiceFormDialogComponent } from '../../components/service-form-dialog/service-form-dialog';
import { DeleteConfirmationDialogComponent, DeleteConfirmationData } from '../../components/delete-confirmation-dialog/delete-confirmation-dialog';
import { filter } from 'rxjs';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    CurrencyPipe
  ],
  templateUrl: './services.html',
  styleUrls: ['./services.scss']
})
export class ServicesComponent implements OnInit {
  services: Service[] = [];
  isLoading = true;

  displayedColumns: string[] = ['name', 'duration', 'price', 'actions'];

  constructor(
    private servicesService: ServicesService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices() {
    this.isLoading = true;
    this.servicesService.getServices().subscribe({
      next: (data) => {
        this.services = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Erro ao carregar serviços', err);
        this.showNotification('Erro ao carregar serviços', 'error');
      }
    });
  }

  openServiceDialog(service?: Service) {
    const dialogRef = this.dialog.open(ServiceFormDialogComponent, {
      width: '500px',
      data: { service: service },
      disableClose: true
    });

    dialogRef.afterClosed()
      .pipe(filter(result => !!result))
      .subscribe((result: Service) => {
        if (service) {
          this.showNotification('Serviço atualizado com sucesso!', 'success');
        } else {
          this.showNotification('Serviço criado com sucesso!', 'success');
        }
        this.loadServices();
      });
  }

  onDeleteService(service: Service) {
    const dialogData: DeleteConfirmationData = {
      title: 'Excluir Serviço',
      message: 'Tem certeza que deseja excluir o serviço',
      itemName: service.name,
      isLoading: false
    };

    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '500px',
      data: dialogData,
      disableClose: true
    });

    dialogRef.afterClosed()
      .pipe(filter(result => !!result))
      .subscribe(() => {
        dialogData.isLoading = true;
        this.servicesService.deleteService(service.id).subscribe({
          next: () => {
            this.showNotification('Serviço excluído com sucesso!', 'success');
            this.loadServices();
            dialogRef.close();
          },
          error: (err) => {
            console.error('Erro ao excluir serviço', err);
            this.showNotification('Erro ao excluir serviço', 'error');
            dialogData.isLoading = false;
          }
        });
      });
  }

  showNotification(message: string, panelClass: 'success' | 'error') {
    this.snackBar.open(message, 'Fechar', {
      duration: 5000,
      panelClass: [panelClass],
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }
}
