import { Component, OnDestroy, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {NgcCookieConsentService} from 'ngx-cookieconsent';
import {RouterOutlet} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Meta} from '@angular/platform-browser';
import {CanonicalService} from './core/shared/canonical.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  description: any | string;
  title: any | string;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private ccService: NgcCookieConsentService,
              private metaTagService: Meta,
              private canonicalService: CanonicalService,
              public http: HttpClient) {
  }

  ngOnInit(): void {

    // Client only code.
    if (isPlatformBrowser(this.platformId)) {
      const item = {key1: 'value1', key2: 'valu2' };
      localStorage.setItem('itemIndex', JSON.stringify(item) );
    }

    // SEO
    this.metaTagService.addTags([
      {name: 'keywords', content: 'Jeu concours, jeu, thé, ThéTipTop'},
      {name: 'robots', content: 'index, follow'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {charset: 'UTF-8'},
      {name: 'description', content: this.description},
      {property: 'og:title', content: this.title},
      {name: 'og:description', content: this.description},
      {property: 'og:image', content: '/assets/mango-bg-.jpg'},
      {property: 'og:image:alt', content: this.title}
    ]);
    this.canonicalService.setCanonicalURL();
  }

  prepareRoute(outlet: RouterOutlet): any {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  ngOnDestroy(): void {
  }

}
