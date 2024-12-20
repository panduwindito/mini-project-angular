import {Component, OnInit} from '@angular/core';
import {RealtimeDatabaseService} from "../../service/realtime-database.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-submission',
  templateUrl: './list-submission.component.html',
  styleUrl: './list-submission.component.css',
  standalone: false
})
export class ListSubmissionComponent implements OnInit {
  listTempData: any[] = []
  listData: any[] = []
  currentStart: number = 0
  currentLast: number = 0
  totalData: number = 0
  currentPage: number = 1
  totalPages: number = 0
  itemsPerPage: number = 10

  constructor(private realtimeDb: RealtimeDatabaseService, private router: Router) { }


  async ngOnInit() {
    await this.getAllData()
    console.log(this.listData)
  }

  async getAllData() {
    const response = await this.realtimeDb.getFormSubmissions()
    this.listTempData = Object.keys(response).map((key) => [key, response[key]])
    this.totalData = this.listTempData.length
    this.updatePagination()
  }

  async deleteData(id: string){
    await this.realtimeDb.deleteFormSubmission(id)
    await this.getAllData()
  }

  openDetail(id: String){
    this.router.navigate([`/edit/${id}`])
  }

  nextPage(){
    if(this.currentPage < this.totalPages){
      this.currentPage++;
      this.paginate()
    }
  }
  previousPage(){
    if(this.currentPage > 1){
      this.currentPage--
      this.paginate()
    }
  }

  paginate(){
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.listData = this.listTempData.slice(startIndex, endIndex);
    this.currentStart = startIndex + 1
    this.currentLast = Math.min(endIndex, this.listData.length)
  }

  updatePagination(){
    this.totalPages = Math.ceil(this.listTempData.length/this.itemsPerPage);
    this.paginate()
  }
}
