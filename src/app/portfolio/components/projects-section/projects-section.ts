import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects-section.html',
  styleUrl: './projects-section.css'
})
export class ProjectsSectionComponent {
  @Input() isSidebarOpen: boolean = true;

  // LIGHTBOX
  isLightboxOpen = false;
  isAnimating = false;
  currentImageIndex = 0;

  lightboxImages = [
    'assets/Game1.png',
    'assets/Game2.png',
    'assets/Game3.png'
  ];

  openLightbox(index: number) {
    this.currentImageIndex = index;
    this.isLightboxOpen = true;
    requestAnimationFrame(() => {
      this.isAnimating = true;
    });
  }

  closeLightbox() {
    this.isAnimating = false;
    setTimeout(() => {
      this.isLightboxOpen = false;
    }, 100);
  }

  nextImage() {
    this.currentImageIndex =
      (this.currentImageIndex + 1) % this.lightboxImages.length;
  }

  prevImage() {
    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.lightboxImages.length) %
      this.lightboxImages.length;
  }

  // SLIDER
  images = [
    'assets/ApexP1.png',
    'assets/ApexP2.png',
    'assets/ApexP3.png',
    'assets/ApexP4.png',
    'assets/ApexP5.png',
    'assets/ApexP6.png',
    'assets/ApexP7.png',
  ];

  current = 0;

  next() {
    this.current = (this.current + 1) % this.images.length;
  }

  prev() {
    this.current = (this.current - 1 + this.images.length) % this.images.length;
  }

  getCardClass(index: number) {
    const total = this.images.length;

    if (index === this.current) {
      return 'z-20 w-[1000px]';
    }
    if (index === (this.current - 1 + total) % total) {
      return 'z-10 -translate-x-80 scale-90 opacity-50 w-[650px]';
    }
    if (index === (this.current + 1) % total) {
      return 'z-10 translate-x-80 scale-90 opacity-50 w-[650px]';
    }
    return 'opacity-0 scale-75';
  }
}