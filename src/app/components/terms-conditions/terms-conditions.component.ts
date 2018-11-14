import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.css']
})
export class TermsConditionsComponent implements OnInit, AfterViewInit {

  public pageTitle : string = 'Terms and Conditions';


  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    window.scroll({ top: 0, behavior: 'smooth' });
  }

}
