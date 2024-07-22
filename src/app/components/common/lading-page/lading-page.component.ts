import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { ScrollService } from './ScrollService.service';


@Component({
  selector: 'app-lading-page',
  templateUrl: './lading-page.component.html',
  styleUrl: './lading-page.component.css'
})

export class LadingPageComponent {
  @ViewChild('card', { static: false }) card?: ElementRef;
  isTransparent = false;
  spawncardAboutUS = false;
  spawncardJoinUS = false;
  elementsToShow: NodeListOf<Element>;

  images = [
    './assets/img/hero2.jpg',
    './assets/img/hero3.jpg',
    './assets/img/1500x500.jpeg'
  ];
  currentIndex = 0;

  constructor(
    private router: Router,
    private scrollService: ScrollService,

  ) {
    this.elementsToShow = document.querySelectorAll('.text, .image');
  }

  login(): void {
    window.location.href = 'http://localhost:3000/api/discord';
  }
  

  ngOnInit() {
    setInterval(() => {
      this.changeBackground();
    }, 5000);
  }

  scrollTo(elementId: string): void {
    this.scrollService.scrollToElement(elementId);
  }

  changeBackground() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.handleScroll();
  }

  handleScroll() {
    if (this.card) {

      const el = this.card.nativeElement;
      const rect = el.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        el.classList.add('animate');
      } else {
        el.classList.remove('animate');
      }
    }
  }

  isElementInViewport(el: Element) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }


  @HostListener('window:scroll', [])
  onWindowScroll() {

    const cardAboutUS = document.getElementById('cardAboutUS');
    if (!cardAboutUS) return;
    const cardJoinUS = document.getElementById('cardJoinUS');
    if (!cardJoinUS) return;

    const cardAboutUSrect = cardAboutUS.getBoundingClientRect();
    const cardJoinUSrect = cardJoinUS.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    if ((cardAboutUSrect.top < windowHeight && cardAboutUSrect.bottom >= 0)) {
      this.spawncardAboutUS = false;
    } else {
      this.spawncardAboutUS = true;
    }
    if ((cardJoinUSrect.top < windowHeight && cardJoinUSrect.bottom >= 0)) {
      this.spawncardJoinUS = false;
    } else {
      this.spawncardJoinUS = true;
    }

    const offset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (offset > 50) {
      this.isTransparent = true;
    } else {
      this.isTransparent = false;
    }
  }
}
