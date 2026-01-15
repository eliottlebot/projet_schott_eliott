import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PollutionList } from '../components/pollution-list/pollution-list';
import { PollutionService } from '../services/pollution.service';
import { HttpClientModule } from '@angular/common/http';
import { PollutionFormComponent } from '../components/pollution-form/pollution-form.component';
import { PollutionFavoritesList } from '../components/pollution-favorites-list/pollution-favorites-list.component';

const routes = [
  { path: '', component: PollutionFormComponent },
  { path: 'list', component: PollutionList },
  { path: 'favorites', component: PollutionFavoritesList },
];

@NgModule({
  imports: [RouterModule.forChild(routes), HttpClientModule],
  providers: [PollutionService],
})
export class PollutionModule {}
