import { Component, OnInit } from '@angular/core';
import { AllService } from 'src/app/Api/all.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css'],
})
export class StatusComponent implements OnInit {
  userNotesData: any[] = [];
  clientNotesData: any[] = [];
  filteredUserNotes: any[] = [];
  filteredClientNotes: any[] = [];

  residentNameFilter: string = '';
  residentDateFilter: string = '';
  userNameFilter: string = '';
  userDateFilter: string = '';

  constructor(private api: AllService) {}

  ngOnInit(): void {
    this.getUserNotes();
    this.getClientNotes();
  }

  getUserNotes() {
    this.api.getUserNotes().subscribe((res: any) => {
      this.userNotesData = res.map((note: any) => ({
        ...note,
        day: this.getDayOfWeek(note.datetime),
      }));
      this.filteredUserNotes = [...this.userNotesData];
    });
  }

  getClientNotes() {
    this.api.getResidentNotes().subscribe((res: any) => {
      this.clientNotesData = res.map((note: any) => ({
        ...note,
        day: this.getDayOfWeek(note.date_created),
      }));
      this.filteredClientNotes = [...this.clientNotesData];
    });
  }

  getDayOfWeek(dateString: string): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateString);
    const dayOfWeek = days[date.getDay()];
    const hours = date.getHours();
    const timeOfDay = hours < 12 ? 'Morning' : hours < 18 ? 'Afternoon' : 'Evening';
    return `${dayOfWeek} (${timeOfDay})`;
  }

  applyResidentFilters() {
    this.filteredClientNotes = this.clientNotesData.filter((note) => {
      const nameMatch = note.name.toLowerCase().includes(this.residentNameFilter.toLowerCase());
      const dateMatch = this.residentDateFilter
        ? new Date(note.date_created).toISOString().split('T')[0] === this.residentDateFilter
        : true;
      return nameMatch && dateMatch;
    });
  }

  applyUserFilters() {
    this.filteredUserNotes = this.userNotesData.filter((note) => {
      const fullName = `${note.first_name} ${note.last_name}`.toLowerCase();
      const nameMatch = fullName.includes(this.userNameFilter.toLowerCase());
      const dateMatch = this.userDateFilter
        ? new Date(note.datetime).toISOString().split('T')[0] === this.userDateFilter
        : true;
      return nameMatch && dateMatch;
    });
  }

  
}