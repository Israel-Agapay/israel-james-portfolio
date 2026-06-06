import { AfterViewInit, Component, NgZone, HostListener} from '@angular/core';
import { CommonModule } from '@angular/common';
import emailjs from '@emailjs/browser'; 
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from './components/sidebar/sidebar';
import { RightSidebarComponent } from './components/right-sidebar/right-sidebar';
import { HeroSectionComponent } from './components/hero-section/hero-section';
import { GoalSectionComponent } from './components/goal-section/goal-section';
import { AboutSectionComponent } from './components/about-section/about-section';
import { SkillsSectionComponent } from './components/skills-section/skills-section';
import { EducationSectionComponent } from './components/education-section/education-section';
import { ProjectsSectionComponent } from './components/projects-section/projects-section';
import { ServiceSectionComponent } from './components/service-section/service-section';
import { ContactSectionComponent } from './components/contact-section/contact-section';
import { FooterComponent } from './components/footer/footer';


@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, 
    RightSidebarComponent, HeroSectionComponent,GoalSectionComponent, 
    AboutSectionComponent, SkillsSectionComponent, EducationSectionComponent,
    ProjectsSectionComponent, ServiceSectionComponent, ContactSectionComponent,
    FooterComponent],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class Portfolio implements AfterViewInit {

  constructor(
    private ngZone: NgZone,
  ) {
    emailjs.init('YOUR_PUBLIC_KEY');
  }

  isSidebarOpen: boolean = true;
  private isUserInteracting = false;
  private pauseMomentum = false;
  private currentScroll = window.scrollY;
  private targetScroll = window.scrollY;
  private isMomentumScrolling = false;
  private ease = 0.08;
  private startTime = performance.now();
  isRightSidebarVisible: boolean = true;
  private lastScrollY = window.scrollY;

  activeSection: string = 'home';
  sections = ['home', 'about', 'skills', 'education', 'projects', 'service' ,'contact'];
  activeNav = 'bg-red-600/30 text-red-400 font-semibold shadow-[inset_0_0_10px_rgba(220,38,38,0.3)]';
  inactiveNav ='text-gray-300 hover:bg-red-600/20 hover:text-red-400 hover:shadow-[inset_0_0_10px_rgba(220,38,38,0.3)]';

  toggleMenu() {
    this.isUserInteracting = true;
    this.pauseMomentum = true;
    this.isSidebarOpen = !this.isSidebarOpen;
    this.isRightSidebarVisible = !this.isSidebarOpen;

    setTimeout(() => {
      this.isUserInteracting = false;
      this.pauseMomentum = false;
    }, 1050);
  }

  @HostListener('window:scroll', [])
  onAutoShowRightSidebar() {
    if (this.isSidebarOpen) return;
    const currentY = window.scrollY;
    if (Math.abs(currentY - this.lastScrollY) > 10) {
      this.isRightSidebarVisible = true;
    }
    this.lastScrollY = currentY;
  }

  ngAfterViewInit(): void {

      // HOME
      const homeSection = document.getElementById('home');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.target === homeSection) {
            const animatedEls = homeSection!.querySelectorAll('.reveal, .reveal-image');
            if (entry.isIntersecting) {
              animatedEls.forEach(el => el.classList.add('show'));
            } else {
              animatedEls.forEach(el => el.classList.remove('show'));
            }
          }
        });
      }, { threshold: 0.6 });
      if (homeSection) observer.observe(homeSection);

      // ABOUT
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        const aboutObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            const items = aboutSection.querySelectorAll('.about-item');
            if (entry.isIntersecting) {
              items.forEach(el => el.classList.add('show'));
            } else {
              items.forEach(el => el.classList.remove('show'));
            }
          });
        }, { threshold: 0.3 });
        aboutObserver.observe(aboutSection);
      }

      // SKILLS
      const skillsSection = document.getElementById('skills');
      if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            const cards = skillsSection.querySelectorAll('.skill-card');
            if (entry.isIntersecting) {
              cards.forEach((card, index) => {
                card.classList.remove('show');
                setTimeout(() => card.classList.add('show'), index * 120);
              });
            } else {
              cards.forEach(card => card.classList.remove('show'));
            }
          });
        }, { threshold: 0.3 });
        skillsObserver.observe(skillsSection);
      }

      // PROJECTS
      const projectItems = document.querySelectorAll('.project-item');
      if (projectItems.length) {
        const projectObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('show');
            } else {
              entry.target.classList.remove('show');
            }
          });
        }, { threshold: 0.35 });
        projectItems.forEach(item => projectObserver.observe(item));
      }

      // REVEAL UP
      const revealUpItems = document.querySelectorAll('.reveal-up');
      if (revealUpItems.length) {
        const revealUpObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('show');
            } else {
              entry.target.classList.remove('show');
            }
          });
        }, { threshold: 0.25 });
        revealUpItems.forEach(el => revealUpObserver.observe(el));
      }

      // SOCIAL WAVE
      const socialWaves = document.querySelectorAll('.social-wave');
      if (socialWaves.length) {
        const socialObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('show');
            } else {
              entry.target.classList.remove('show');
            }
          });
        }, { threshold: 0.25 });
        socialWaves.forEach(el => socialObserver.observe(el));
      }

      // FOOTER
      const footerEls = document.querySelectorAll('.footer-reveal');
      const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          entry.target.classList.toggle('show', entry.isIntersecting);
        });
      }, { threshold: 0.2 });
      footerEls.forEach(el => footerObserver.observe(el));

      // MOMENTUM SCROLL + ACTIVE NAV
      this.ngZone.runOutsideAngular(() => {
        this.initMomentumScroll();
      });

      window.addEventListener('scroll', () => {
        let current = 'home';
        this.sections.forEach(section => {
          const el = document.getElementById(section);
          if (!el) return;
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            current = section;
          }
        });
        this.ngZone.run(() => {
          this.activeSection = current;
        });
      });
    }

  private syncMomentumScroll() {
    const y = window.scrollY;
    this.currentScroll = y;
    this.targetScroll = y;
    this.isMomentumScrolling = false;
  }

    private initMomentumScroll() {
      if ('ontouchstart' in window) return; // desktop only

      window.addEventListener(
        'wheel',
        (e) => {
          e.preventDefault();

          this.targetScroll += e.deltaY * 1.1;
          this.targetScroll = Math.max(
            0,
            Math.min(
              this.targetScroll,
              document.body.scrollHeight - window.innerHeight
            )
          );

          if (!this.isMomentumScrolling) {
            this.isMomentumScrolling = true;
            requestAnimationFrame(this.momentumScroll);
          }
        },
        { passive: false }
      );

      window.addEventListener('scroll', () => {
        if (!this.isMomentumScrolling) {
          this.syncMomentumScroll();
        }
      });
    }

    private momentumScroll = () => {
      this.currentScroll += (this.targetScroll - this.currentScroll) * this.ease;
      window.scrollTo(0, this.currentScroll);

      if (this.isSidebarOpen && !this.isUserInteracting) {
      this.ngZone.run(() => {
        this.isSidebarOpen = false;
        this.isRightSidebarVisible = true; 
      });
    }

      if (Math.abs(this.targetScroll - this.currentScroll) > 0.5) {
        requestAnimationFrame(this.momentumScroll);
      } else {
        this.isMomentumScrolling = false;
      }
    };

}
