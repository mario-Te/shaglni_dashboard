import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AdminService } from '../services/admin.service';
import Swal from 'sweetalert2';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';

@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.css']
})
export class ApplicantsComponent {
  submitUpdateSkills() {
    throw new Error('Method not implemented.');
  }

  title = "Applicants";
  isloading = false;
  constructor(private adminservice: AdminService) { }
  tableRows: any[] = [
  ];
  @ViewChild('modalDialog') modalDialog!: DialogComponent;
  target: string = '#modalTarget';
  width: string = '50%';
  modalType: number = 1;
  headers: string[] = []
  @Input() current_job_page: number = 1;
  @Input() totalPages: number = 1;
  @Output() pageChange = new EventEmitter<number>();
  getPages(): number[] {
    const startPage = Math.max(1, this.current_job_page - 2);
    const endPage = Math.min(this.totalPages, startPage + 4);

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }
  goToPage(page: number): void {
    if (page !== this.current_job_page) {
      this.pageChange.emit(page);
      this.current_job_page = page;
      this.adminservice.getApplicants(page).subscribe((res: any) => {
        this.tableRows = res.jobs;
        this.totalPages = res.count;
      })
    }
  }

  editRow(row: any) {
    // Handle edit action
    console.log('Edit row:', row);
  }

  deleteRow(row: any) {
    this.adminservice.DeleteApplicant(row._id, row.username).subscribe(res => {
      Swal.fire({
        title: "Deleted Successfully!",
        icon: "success"
      }).then(() => this.ngOnInit())
    })
  }
  ngOnInit(): void {
    this.adminservice.getApplicants(0).subscribe(res => {
      this.tableRows = res.jobs
      this.headers = Object.keys(this.tableRows)
      this.totalPages = res.count
      this.isloading = false
    })

  }
  showModal() {
    this.modalDialog.show()
  }
  overlayClick() {
    this.modalDialog.hide()
  }
}
