import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-section.html',
  styleUrl: './service-section.css'
})
export class ServiceSectionComponent {
  @Input() isSidebarOpen: boolean = true;
}