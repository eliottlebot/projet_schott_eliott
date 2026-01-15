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
      'flex flex-col items-center justify-center text-center gap-4 px-4 bg-[url(/jj-bg.webp)] h-full flex-1 bg-cover bg-center',
  },
})
export class FrontPage {
  readonly MoveRight = MoveRight;
}
