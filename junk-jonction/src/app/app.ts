import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PollutionModule } from '../modules/pollution.module';
import { HeaderComponent } from '../components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [PollutionModule, RouterModule, HeaderComponent],
  templateUrl: './app.html',
  host: {
    class: 'block h-full',
  },
})
export class App {
  protected readonly title = 'Junk Junction';
  showPollutionList: boolean = false;

  togglePollutionList() {
    this.showPollutionList = !this.showPollutionList;
  }
}
