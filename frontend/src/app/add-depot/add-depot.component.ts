import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Depot } from '../model/depot';
import { DepotService } from '../services/depot.service';

@Component({
  selector: 'app-add-depot',
  templateUrl: './add-depot.component.html',
  styleUrls: ['./add-depot.component.css']
})
export class AddDepotComponent implements OnInit {
  depotFormGroup : FormGroup;

  constructor(private depotService:DepotService, private fb:FormBuilder){
    this.depotFormGroup = this.fb.group({
      name: new FormControl('',[Validators.required,Validators.minLength(4)])
    });
  }

  ngOnInit(): void {
  }

  public handleAdd(){
    let depot:Depot={
      name:this.depotFormGroup.value.name
    }
    this.depotService.save(depot).subscribe({
      next:()=>{
        alert("depo added");
      }
    })
  }

}
