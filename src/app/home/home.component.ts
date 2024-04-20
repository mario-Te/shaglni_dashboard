import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AdminService } from '../services/admin.service';
import Swal from 'sweetalert2';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  specs: any = []
  update_company: any
  selected_id: string = ''
  @ViewChild('modalDialog') modalDialog!: DialogComponent;
  target: string = '#modalTarget';
  width: string = '50%';
  modalType: number = 1;
  title = "Companies";
  isloading = false;
  constructor(private adminservice: AdminService) { }
  tableRows: any[] = [
  ];
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
      this.adminservice.getCompanies(page).subscribe((res: any) => {
        this.tableRows = res.companies;
        this.totalPages = res.count;
      })
    }
  }

  editRow(row: any) {
    this.modalType = 2;
    this.selected_id = row._id;
    this.adminservice.getCompany(row._id).subscribe((res) => {
      this.update_company = res.company
    })
    this.modalDialog.show()
  }
  deleteRow(row: any) {
    // Handle delete action
    this.adminservice.DeleteCompany(row._id).subscribe(res => {
      Swal.fire({
        title: "Deleted Successfully!",
        icon: "success"
      }).then(() => this.ngOnInit())
    })
  }
  ngOnInit(): void {
    this.adminservice.getCompanies(0).subscribe(res => {
      this.tableRows = res.companies
      this.headers = Object.keys(this.tableRows)
      this.totalPages = res.count
      this.isloading = false
    })
    this.adminservice.getSpecializations().subscribe(res => {
      if (res != null)
        this.specs = res.specializations
    })
  }
  overlayClick() {
    this.modalDialog.hide()
  }
  showModal() {
    this.modalDialog.show()
  }
  onSubmit(form: NgForm) {
    this.adminservice.CreateCompany(form.value).subscribe(res => {
      Swal.fire({
        title: "Added Successfully!",
        icon: "success"
      }).then(() => this.ngOnInit())
    })
  }
  submitUpdateCompany(form: NgForm) {
    this.adminservice.UpdateCompany(form.value, this.selected_id).subscribe(res => {
      Swal.fire({
        title: "Updated Successfully!",
        icon: "success"
      }).then(() => this.ngOnInit())
    })
  }
}
