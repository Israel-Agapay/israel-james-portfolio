import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-section.html',
  styleUrl: './contact-section.css'
})
export class ContactSectionComponent {
  @Input() isSidebarOpen: boolean = true;

  isLoading = false;
  submitted = false;

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

  sendEmail(form: any) {
    if (form.invalid) return;

    this.isLoading = true;

    emailjs.send(
      'service_dwk4mx7',
      'template_d9ivh9h',
      {
        user_name: form.value.name,
        user_email: form.value.email,
        subject: form.value.subject,
        message: form.value.message,
      }
    )
    .then(() => {
      this.isLoading = false;
      this.submitted = true;
      form.reset();
      setTimeout(() => {
        this.submitted = false;
      }, 3000);
    })
    .catch((error) => {
      this.isLoading = false;
      console.error('EmailJS Error:', error);
    });
  }
}