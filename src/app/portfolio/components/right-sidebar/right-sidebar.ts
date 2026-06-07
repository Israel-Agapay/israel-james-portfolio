import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-right-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './right-sidebar.html',
  styleUrl: './right-sidebar.css'
})
export class RightSidebarComponent {
  @Input() isRightSidebarVisible: boolean = true;
  @Input() activeSection: string = 'home';
  @Output() hide = new EventEmitter<void>();

  hideSidebar() {
    this.hide.emit();
  }
  scrollTo(sectionId: string) {
  const el = document.getElementById(sectionId);
  if (!el) return;
  const offset = -75; 
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'instant' });
}
}