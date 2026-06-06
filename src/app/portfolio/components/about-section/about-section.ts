import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-section.html',
  styleUrl: './about-section.css'
})
export class AboutSectionComponent {
  @Input() isSidebarOpen: boolean = true;

  glowX = '90%';
  glowY = '90%';

  onGlowMove(event: MouseEvent) {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    this.glowX = `${event.clientX - rect.left}px`;
    this.glowY = `${event.clientY - rect.top}px`;
  }

  onGlowLeave() {
    this.glowX = '90%';
    this.glowY = '90%';
  }
}