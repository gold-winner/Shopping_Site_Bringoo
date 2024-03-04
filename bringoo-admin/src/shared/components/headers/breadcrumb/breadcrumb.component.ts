import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent implements OnInit {
  path!: string[];
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.setPath();
    this.pathSubscribe();
  }

  pathSubscribe(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.setPath();
      }
    });
  }

  setPath(): void {
    this.path = this.router.url.split('/').filter((value: string) => value !== 'section');
    this.path.splice(0, 1);
  }
}
