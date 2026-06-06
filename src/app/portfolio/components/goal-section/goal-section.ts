import { Component, Input, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-goal-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './goal-section.html',
  styleUrl: './goal-section.css'
})
export class GoalSectionComponent {
  @Input() isSidebarOpen: boolean = true;

  @HostListener('window:scroll', [])
  onGoalFillScroll() {
    const section = document.getElementById('goal');
    const lines = document.querySelectorAll('.goal-line');

    if (!section) return;

    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    let baseProgress = 1 - rect.top / (windowHeight * 0.6);
    baseProgress = Math.min(Math.max(baseProgress, 0), 1);

    if (rect.bottom <= windowHeight * 0.6) {
      baseProgress = 1;
    }

    lines.forEach((line: any) => {
      const delay = parseFloat(line.style.getPropertyValue('--delay')) || 0;
      const progress = Math.min(Math.max(baseProgress - delay, 0), 1);

      line.style.backgroundImage = `
        linear-gradient(
          to right,
          white ${progress * 260}%,
          rgb(75,75,75) ${progress * 100}%
        )
      `;
    });
  }
}