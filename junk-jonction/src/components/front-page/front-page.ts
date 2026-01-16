import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, MoveRight } from 'lucide-angular';

@Component({
  selector: 'app-front-page',
  imports: [RouterModule, LucideAngularModule],
  templateUrl: './front-page.html',
  standalone: true,
  host: {
    class:
      'flex items-center justify-center bg-[url(/jj-bg.webp)] h-full flex-1 bg-cover bg-center',
  },
})
export class FrontPage {
  readonly MoveRight = MoveRight;
}
