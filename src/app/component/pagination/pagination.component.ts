import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
  standalone: false
})
export class PaginationComponent {
  @Input() currentPage: number = 0;
  @Input() lastPage: number = 0;
  @Input() totalData: number = 0;
  @Input() currentStart: number = 0;
  @Input() currentLast: number = 0;
  // arrayNumber: number[] = []
  // ngOnInit() {
  //   this.arrayNumber = Array(this.lastPage).fill(1).map((n, i)=>n+i)
  //   console.log(this.arrayNumber);
  //   console.log(this.lastPage);
  // }
}
