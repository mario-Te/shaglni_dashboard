import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faCoffee, faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-default-table',
  templateUrl: './default-table.component.html',
  styleUrls: ['./default-table.component.css']
})
export class DefaultTableComponent implements OnInit {

  @Input() headers: string[] = [];
  values: any[] = []
  @Input() title: string = '';
  @Output() edit: EventEmitter<any> = new EventEmitter<any>();
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();
  @Output() showAddModal: EventEmitter<any> = new EventEmitter<any>();
  @Output() showUpdateModal: EventEmitter<any> = new EventEmitter<any>();
  faplus = faPlus
  @Input() rows: any[] = [];
  fatrash = faTrash;
  fapencil = faPen;
  ngOnInit(): void {
    this.rows.forEach((row) => {
      this.headers = Object.keys(row)
    })

    this.values = Object.values(this.rows);

  }

  editRow(row: any) {
    this.edit.emit(row);
  }

  deleteRow(row: any) {
    this.delete.emit(row);
  }
  showModal() {
    this.showAddModal.emit()
  }
  updateModal() {
    this.showUpdateModal.emit()
  }

}
