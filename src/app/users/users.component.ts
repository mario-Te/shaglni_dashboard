import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AdminService } from '../services/admin.service';
import Swal from 'sweetalert2';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {




  title = "Users";
  isloading = false;
  headers: string[] = [];
  faplus = faPlus;
  selected_id: string = ''
  constructor(private adminservice: AdminService) { }
  tableRows: any[] = [
  ];
  @ViewChild('modalDialog') modalDialog!: DialogComponent;
  target: string = '#modalTarget';
  width: string = '50%';
  modalType: number = 1;
  updated_user: any;
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
      this.adminservice.getUsers(page).subscribe((res: any) => {
        this.tableRows = res.users;
        this.totalPages = res.count;
      })
    }
  }


  deleteRow(row: any) {
    this.adminservice.DeleteUser(row._id, row.username).subscribe(res => {
      Swal.fire({
        title: "Deleted Successfully!",
        icon: "success"
      }).then(() => this.ngOnInit())
    })

  }

  ngOnInit(): void {
    this.adminservice.getUsers(0).subscribe(res => {
      this.tableRows = res.users
      this.totalPages = res.count
      this.headers = Object.keys(this.tableRows)
      this.isloading = false

    })

  }
  overlayClick() {
    this.modalDialog.hide()
  }
  showModal() {
    this.modalDialog.show()
  }
  editRow(row: any) {
    this.modalType = 2;
    this.selected_id = row._id;
    this.adminservice.getUser(row._id).subscribe((res) => {
      this.updated_user = res.user
      this.updated_user.birthdate = new Date(res.user.birthdate).toJSON().slice(0, 10)
    })
    this.modalDialog.show()
  }

  onSubmit(form: NgForm) {
    this.adminservice.CreateUser(form.value).subscribe(res => {
      Swal.fire({
        title: "Added Successfully!",
        icon: "success"
      }).then(() => this.ngOnInit())
    })
  }
  onUpdate(form: NgForm) {
    this.adminservice.UpdateUser(form.value, this.selected_id).subscribe(res => {
      Swal.fire({
        title: "Updated Successfully!",
        icon: "success"
      }).then(() => this.ngOnInit())
    })
  }
}
