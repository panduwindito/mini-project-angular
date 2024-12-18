import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {RealtimeDatabaseService} from "../../service/realtime-database.service";
import {CanComponentDeactive} from "../../guard/candeactiveguard.guard";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-submission',
  templateUrl: './list-submission.component.html',
  styleUrl: './list-submission.component.css',
  standalone: false
})
export class ListSubmissionComponent implements OnInit {
  listData: any[] = []
  constructor(private realtimeDb: RealtimeDatabaseService, private router: Router) { }


  async ngOnInit() {
    await this.getAllData()
    console.log(this.listData)
  }

  async getAllData() {
    const response = await this.realtimeDb.getFormSubmissions()
    this.listData = Object.keys(response).map((key) => [key, response[key]])
  }

  async deleteData(id: string){
    await this.realtimeDb.deleteFormSubmission(id)
    await this.getAllData()
  }

  openDetail(id: String){
    this.router.navigate([`/edit/${id}`])
  }
}
