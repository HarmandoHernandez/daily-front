import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor() { }
  
  ngOnInit(): void {
    
  }
  /* yesterday: String = ''
  today: String = ''
  tomorrow: String = ''


  ngOnInit(): void {
    ({ 
      yesterday: this.yesterday, 
      today: this.today, 
      tomorrow: this.tomorrow 
      } = this.getDays())
  }

  formatDay (date: Date): String {
    const day = date.getDate()//new Date(date).getDate()
    const formatDay = (day < 10) ? `0${day}` : day
    return formatDay.toString()
  }

  getDays () {
    const date = new Date()
    // Today
    const today = this.formatDay(date)
    // Tomorrow
    date.setDate(date.getDate() + 1)
    const tomorrow = this.formatDay(date)
    // Today
    date.setDate(date.getDate() - 2)
    const yesterday = this.formatDay(date)

    return { yesterday, today, tomorrow }
  } */
}
