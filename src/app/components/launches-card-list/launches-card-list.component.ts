import { Launch } from './../../models/Launch';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-launches-card-list',
  templateUrl: './launches-card-list.component.html',
  styleUrls: ['./launches-card-list.component.scss']
})

export class LaunchesCardListComponent implements OnInit {
  /**Apagar/ */
  dummy: Launch = {
    id: "1234",
    img: "https://farm5.staticflickr.com/4695/25557986177_2d315f4c11_o.jpg",
    name: "Launch à Lua",
    date: new Date(),
    details: "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.This is a wider card with supporting text below as a natural lead-in to additional contentThis is a ",
    success: true,
    classification: "Success",
    rocketId: "431",
    rocketName: "Rocket12",
  };
  /**Apagar/ */
  constructor() { }

  ngOnInit() {
  }

}
