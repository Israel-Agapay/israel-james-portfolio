import { Component, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills-section.html',
  styleUrl: './skills-section.css'
})
export class SkillsSectionComponent implements AfterViewInit, OnDestroy {
  @Input() isSidebarOpen: boolean = true;

  glowX = '90%';
  glowY = '90%';

  private observers: IntersectionObserver[] = [];

  onGlowMove(event: MouseEvent) {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    this.glowX = `${event.clientX - rect.left}px`;
    this.glowY = `${event.clientY - rect.top}px`;
  }

  onGlowLeave() {
    this.glowX = '90%';
    this.glowY = '90%';
  }

 ngAfterViewInit() {
  const groups = document.querySelectorAll<HTMLElement>(
    '.frontend-group, .core-group, .backend-group, .tools-group'
  );

  groups.forEach(group => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          group.classList.add('skills-animate');
          group.querySelectorAll<HTMLElement>('.skill-card').forEach(card => {
            card.classList.add('show');
          });
        } else {
          group.classList.remove('skills-animate');
          group.querySelectorAll<HTMLElement>('.skill-card').forEach(card => {
            card.classList.remove('show');
          });
        }
      },
      { 
        threshold: 0,
        rootMargin: '0px 0px -30px 0px'
      }
    );
    observer.observe(group);
    this.observers.push(observer);
  });
}
  ngOnDestroy() {
    this.observers.forEach(o => o.disconnect());
  }
}
