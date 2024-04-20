import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AdminService } from '../services/admin.service';
import Swal from 'sweetalert2';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { NgForm } from '@angular/forms';
import { tags } from '../services/tag.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent {

  companies: any[] = []
  tags = tags
  selected_id: string = ''
  updated_job: any = {}
  title = "Jobs";
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
      this.adminservice.getJobsAdmin(page).subscribe((res: any) => {
        this.tableRows = res.jobs;
        this.totalPages = res.count;
      })
    }
  }

  editRow(row: any) {
    this.modalType = 2;
    this.selected_id = row._id;
    this.adminservice.getJob(row._id).subscribe((res) => {
      this.updated_job = res.job
      this.updated_job.deadline = new Date(res.job.deadline).toJSON().slice(0, 10)
    })
    this.modalDialog.show()
  }

  deleteRow(row: any) {
    this.adminservice.DeleteJob(row._id).subscribe(res => {
      Swal.fire({
        title: "Deleted Successfully!",
        icon: "success"
      }).then(() => this.ngOnInit())
    })
  }

  ngOnInit(): void {
    this.adminservice.getJobsAdmin(0).subscribe(res => {
      this.tableRows = res.jobs
      this.totalPages = res.count
      this.headers = Object.keys(this.tableRows)

    })
    this.adminservice.getallCompanies().subscribe(res => {
      this.companies = res.companies,
        this.isloading = false
    })
  }
  showModal() {
    this.modalDialog.show()
  }
  overlayClick() {
    this.modalDialog.hide()
  }
  getNamebyLang() {
    if (localStorage.getItem('LANGUAGE') === 'ar')
      return `name_ar`;
    return `name_en`
  }
  submitAddJob(form: NgForm) {
    this.adminservice.CreateJob(form.value).subscribe(res => {
      Swal.fire({
        title: "Added Successfully!",
        icon: "success"
      }).then(() => this.ngOnInit())
    })
  }
  submitUpdateJob(form: NgForm) {
    this.adminservice.UpdateJob(form.value, this.selected_id).subscribe(res => {
      Swal.fire({
        title: "Updated Successfully!",
        icon: "success"
      }).then(() => this.ngOnInit())
    })
  }
}
