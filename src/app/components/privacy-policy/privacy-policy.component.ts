import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit, AfterViewInit {

  constructor() { }

  public pageTitle : string = 'Privacy policy';


  ngOnInit() {
  }

  ngAfterViewInit(){
    window.scroll({ top: 0, behavior: 'smooth' });
  }

}
