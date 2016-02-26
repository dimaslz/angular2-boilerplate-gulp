import {Component, OnInit, OnDestroy} from "angular2/core";

@Component({
    selector: 'about',
    templateUrl: './app/about/about.html',
    // styles: [],
    // directives: [],
    // providers: [],
    // pipes: []
})

export class About implements OnInit, OnDestroy {
  public title: string;
  
  ngOnInit() {}
  
  ngOnDestroy() {}
  
  constructor() {
    this.title = 'About';
  }
}