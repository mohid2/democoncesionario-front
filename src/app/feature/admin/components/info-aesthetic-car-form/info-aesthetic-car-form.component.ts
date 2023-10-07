import { Component, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'app-info-aesthetic-car-form',
  templateUrl: './info-aesthetic-car-form.component.html',
  styleUrls: ['./info-aesthetic-car-form.component.css']
})
export class InfoAestheticCarFormComponent implements OnInit{

  public InfoAestheticForm:  any;


  constructor(private controlContainer: ControlContainer){}
  ngOnInit(): void {
    this.InfoAestheticForm=this.controlContainer.control  ;
    this.InfoAestheticForm=this.InfoAestheticForm.controls["infoAestheticCarForm"] ;
  }

}
