import { Component, OnInit } from '@angular/core';
import { AllService } from './Api/all.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'roles';

  constructor(private service:AllService){}

  ngOnInit(): void {
    this.getLogo();
  }

  logoGet: any[] = []; // Define it as an array to store all logo data
selectedLogo: string = ''; // To store the logo of the specific item with ID 3
defaultLogo: string = 'path/to/default-logo.png'; // Path to your default image

getLogo() {
  this.service.getLogo().subscribe((res: any) => {
    this.logoGet = res;

    // Find the item with ID 3
    const item = this.logoGet.find((data: any) => data.id === 3);

    // Assign the logo if it exists; otherwise, assign the default logo
    this.selectedLogo = item && item.logo ? item.logo : this.defaultLogo;

    // Update the favicon dynamically
    this.setFavicon(this.selectedLogo);
  });
}

setFavicon(iconUrl: string): void {
  const favicon = document.getElementById('dynamic-favicon') as HTMLLinkElement;
  if (favicon) {
    favicon.href = iconUrl; // Update the href of the favicon link
  }
}

}
