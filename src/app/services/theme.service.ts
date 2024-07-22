import { Injectable, Inject, RendererFactory2, Renderer2, EventEmitter } from "@angular/core";
import { DOCUMENT } from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  theme = "light";
  renderer: Renderer2;
  themeEmmiter = new EventEmitter<any>();


  constructor(
    rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document,

  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    let theme = localStorage.getItem('theme');
    if (theme) {
      this.theme = theme;
      this.renderer.addClass(this.document.body, "theme-" + theme);
    }
  }

  init() {

  }

  toggleTheme() {
    if (this.theme == "light") {
      this.theme = "dark";
      this.updateTheme('theme-dark', 'theme-light');
    } else if (this.theme == "dark") {
      this.theme = "light";
      this.updateTheme('theme-light', 'theme-dark');
    } else {
      this.theme = "light";
      this.updateTheme('theme-light', 'theme-dark');
    }
    this.themeEmmiter.emit(this.theme);
    localStorage.setItem('theme', this.theme);
  }

  updateTheme(newTheme: string, oldTheme: string) {
    this.renderer.addClass(this.document.body, newTheme);
    this.renderer.removeClass(this.document.body, oldTheme);
  }

}
