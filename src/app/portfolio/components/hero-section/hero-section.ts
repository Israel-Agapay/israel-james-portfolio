import { Component, Input, ViewChild, ElementRef, NgZone, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css'
})
export class HeroSectionComponent implements AfterViewInit {
  @Input() isSidebarOpen: boolean = true;

  @ViewChild('backText') backText!: ElementRef<HTMLDivElement>;
  @ViewChild('frontText') frontText!: ElementRef<HTMLDivElement>;
  @ViewChild('titleText') titleText!: ElementRef<HTMLHeadingElement>;

  titles = ['Web Developer', 'Game Developer', 'Web Designer'];
  currentIndex = 0;
  currentTitle = this.titles[0];

  private startTime = performance.now();

  constructor(private ngZone: NgZone, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.animate();
      this.startTextAnimation();
    });

    const homeSection = document.getElementById('home');
    const observer = new IntersectionObserver(
      (entries) => {
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
      },
      { threshold: 0.6 }
    );
    if (homeSection) observer.observe(homeSection);
  }

  private animate = () => {
    const time = (performance.now() - this.startTime) / 900;
    const backY = Math.sin(time * 2) * 15;
    const frontY = Math.sin(time * 3) * 10;
    if (this.backText?.nativeElement)
      this.backText.nativeElement.style.transform = `translate3d(0, ${backY}px, 0)`;
    if (this.frontText?.nativeElement)
      this.frontText.nativeElement.style.transform = `translate3d(0, ${frontY}px, 0)`;
    requestAnimationFrame(this.animate);
  };

  private startTextAnimation() {
    setInterval(() => {
      const el = this.titleText.nativeElement;
      el.classList.add(
        'blur-sm', 'opacity-0', '-skew-x-6', 'translate-x-1', 'scale-105',
        'drop-shadow-[2px_0_0_rgba(255,0,0,0.8)]',
        'drop-shadow-[-2px_0_0_rgba(0,255,255,0.8)]'
      );
      setTimeout(() => {
        this.ngZone.run(() => {
          this.currentIndex = (this.currentIndex + 1) % this.titles.length;
          this.currentTitle = this.titles[this.currentIndex];
          this.cdr.detectChanges();
        });
        el.classList.remove(
          'blur-sm', 'opacity-0', '-skew-x-6', 'translate-x-1', 'scale-105',
          'drop-shadow-[2px_0_0_rgba(255,0,0,0.8)]',
          'drop-shadow-[-2px_0_0_rgba(0,255,255,0.8)]'
        );
      }, 400);
    }, 2500);
  }
}