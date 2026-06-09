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

    // Sweep LEFT — line moves from right to left, hiding the text
    el.style.transition = 'clip-path 0.45s ease-in';
    el.style.clipPath = 'inset(0 100% 0 0)';

    setTimeout(() => {
      // Change word while hidden
      this.ngZone.run(() => {
        this.currentIndex = (this.currentIndex + 1) % this.titles.length;
        this.currentTitle = this.titles[this.currentIndex];
        this.cdr.detectChanges();
      });

      // Sweep RIGHT — line moves from left to right, revealing new text
      setTimeout(() => {
        el.style.transition = 'clip-path 1.35s ease-out';
        el.style.clipPath = 'inset(0 0% 0 0)';
      }, 50);
    }, 380);

  }, 3000);
}
}