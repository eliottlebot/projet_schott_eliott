import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  imports: [CommonModule],
  templateUrl: './loader.html',
})
export class LoaderComponent {
  @Input() size: 's' | 'm' | 'l' = 's';

  tailwindSizeMap: { [key: string]: string } = {
    s: 'w-6 h-6',
    m: 'w-12 h-12',
    l: 'w-16 h-16',
  };

  get sizeClass(): string {
    return this.tailwindSizeMap[this.size] || this.tailwindSizeMap['s'];
  }
}
