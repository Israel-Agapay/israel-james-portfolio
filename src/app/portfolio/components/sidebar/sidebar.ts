import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent {
  @Input() isSidebarOpen: boolean = true;
  @Input() activeSection: string = 'home';
  @Output() toggle = new EventEmitter<void>();

  activeNav = 'bg-red-600/30 text-red-400 font-semibold shadow-[inset_0_0_10px_rgba(220,38,38,0.3)]';
  inactiveNav = 'text-gray-300 hover:bg-red-600/20 hover:text-red-400 hover:shadow-[inset_0_0_10px_rgba(220,38,38,0.3)]';

  toggleMenu() {
    this.toggle.emit();
  }
scrollTo(sectionId: string) {
  const el = document.getElementById(sectionId);
  if (!el) return;
  const offset = -70; 
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'instant' });
}
}