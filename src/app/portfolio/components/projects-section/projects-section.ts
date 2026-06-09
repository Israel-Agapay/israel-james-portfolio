import { Component, Input, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects-section.html',
  styleUrl: './projects-section.css'
})
export class ProjectsSectionComponent implements AfterViewInit {
  @Input() isSidebarOpen: boolean = true;

  modalOpen = false;
  currentProject = 0;
  currentModalSlide = 0;

  projects = [
    {
      title: 'The Lost Horizons: The Treasure Awaits',
      shortTitle: 'The Lost Horizons',
      desc: 'An immersive 3D adventure game with rich storytelling and treasure hunting mechanics. Features smooth gameplay, creative world-building, and engaging puzzle elements built in Unity.',
      role: 'Fullstack Developer',
      year: '2025',
      type: 'Game Dev',
      tags: ['Unity', 'C#', '2D', 'Adventure'],
      videoSrc: 'assets/video-project2.mp4',
      slides: ['assets/Game1.png', 'assets/Game2.png', 'assets/Game3.png'],
      accentColor: 'red',
      reverse: false
    },
    {
      title: "Apex Auto's – Car Selling Website",
      shortTitle: "Apex Auto's",
      desc: "Modern car selling platform with smooth browsing experience, interactive animations, and clean layouts. Designed the full UI/UX and implemented all frontend functionality using Angular.",
      role: 'Frontend Developer',
      year: '2023',
      type: 'Web Dev',
      tags: ['Angular', 'Tailwind CSS', 'TypeScript', 'UI/UX'],
      videoSrc: 'assets/video-project.mp4',
      slides: ['assets/ApexP1.png', 'assets/ApexP2.png', 'assets/ApexP3.png', 'assets/ApexP4.png', 'assets/ApexP5.png'],
      accentColor: 'red',
      reverse: true
    },
    {
      title: 'Tech Store Admin Dashboard',
      shortTitle: 'Tech Store Admin Panel',
      desc: 'A full-stack inventory management dashboard built with React, TypeScript, Express.js, and MongoDB. Features include product management, JWT authentication, inventory analytics, category filtering, sorting, pagination, and real-time stock monitoring.',
      role: 'Full-Stack Developer',
      year: '2025',
      type: 'Web Dev',
      tags: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
      videoSrc: 'assets/video-project3.mp4',
      slides: ['assets/techstorePic1.png', 'assets/techstorePic2.png', 'assets/techstorePic3.png', 'assets/techstorePic4.png'],
      accentColor: 'emerald',
      reverse: false
    }
  ];

  playVideo(el: HTMLVideoElement) {
  el.muted = true;
  el.volume = 0;
  
  if (el.readyState >= 3) {
    // Already loaded (cached), play immediately
    el.play().catch(() => {});
  } else {
    el.play().catch(() => {});
  }
}

  slideshowIndexes: number[] = [0, 0, 0];
  private intervals: any[] = [];

  ngAfterViewInit(): void {
    this.initSlideshows();

    const projectItems = document.querySelectorAll('.project-card-item');
    if (projectItems.length) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          } else {
            entry.target.classList.remove('show');
          }
        });
      }, { threshold: 0.2 });
      projectItems.forEach(item => observer.observe(item));
    }
  }

  initSlideshows() {
    this.projects.forEach((proj, pi) => {
      if (proj.slides.length <= 1) return;
      this.intervals[pi] = setInterval(() => {
        this.slideshowIndexes[pi] = (this.slideshowIndexes[pi] + 1) % proj.slides.length;
      }, 2500);
    });
  }

  openModal(index: number) {
    this.currentProject = index;
    this.currentModalSlide = 0;
    this.modalOpen = true;
  }

  prevSlide() {
    const total = this.projects[this.currentProject].slides.length;
    this.currentModalSlide = (this.currentModalSlide - 1 + total) % total;
  }

  nextSlide() {
    const total = this.projects[this.currentProject].slides.length;
    this.currentModalSlide = (this.currentModalSlide + 1) % total;
  }

  closeModal() {
    this.modalOpen = false;
  }

  switchSlide(index: number) {
    this.currentModalSlide = index;
  }
}