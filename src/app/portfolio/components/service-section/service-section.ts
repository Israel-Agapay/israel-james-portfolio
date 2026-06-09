import { Component, Input, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-section.html',
  styleUrl: './service-section.css'
})
export class ServiceSectionComponent implements AfterViewInit {
  @Input() isSidebarOpen: boolean = true;

  ngAfterViewInit(): void {
    const serviceSection = document.getElementById('service');
    if (!serviceSection) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const cards = serviceSection.querySelectorAll('.service-card');
        if (entry.isIntersecting) {
          cards.forEach((card, i) => {
            setTimeout(() => card.classList.add('show'), i * 100);
          });
        } else {
          cards.forEach(card => card.classList.remove('show'));
        }
      });
    }, { threshold: 0.1 });

    observer.observe(serviceSection);
  }
}