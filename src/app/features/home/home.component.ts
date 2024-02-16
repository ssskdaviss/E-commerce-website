import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  images = [
    { url: '../../../assets/images/1.png' },
    { url: '../../../assets/images/2.png'  },
    { url: '../../../assets/images/3.png' }
  ];

  currentIndex = 0;
  transitionDuration = 2;

  startSlideshow() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, this.transitionDuration * 1000);
  }
  ngAfterViewInit() {
    this.startSlideshow();
  }
}


