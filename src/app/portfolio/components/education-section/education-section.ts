import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-education-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education-section.html',
  styleUrl: './education-section.css'
})
export class EducationSectionComponent {
  @Input() isSidebarOpen: boolean = true;
}