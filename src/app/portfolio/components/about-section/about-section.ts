import { Component, Input, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-section.html',
  styleUrl: './about-section.css'
})
export class AboutSectionComponent implements AfterViewInit {
  @Input() isSidebarOpen: boolean = true;

  ngAfterViewInit(): void {
    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const card = aboutSection.querySelector('.about-card');
        const items = aboutSection.querySelectorAll('.about-item');

        if (entry.isIntersecting) {
          card?.classList.add('show');
          items.forEach(el => el.classList.add('show'));
        } else {
          card?.classList.remove('show');
          items.forEach(el => el.classList.remove('show'));
        }
      });
    }, { threshold: 0.15 });

    observer.observe(aboutSection);
  }
}