import {Component, OnInit, OnDestroy} from "angular2/core";

@Component({
    selector: 'home',
    templateUrl: './app/home/home.html',
    // styles: [],
    // directives: [],
    // providers: [],
    // pipes: []
})

export class Home implements OnInit, OnDestroy {
  public title: string;
  
  ngOnInit() {}
  
  ngOnDestroy() {}
  
  constructor() {
    this.title = 'Home';
  }
}