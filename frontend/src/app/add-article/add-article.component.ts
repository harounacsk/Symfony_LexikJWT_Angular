import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Article } from '../model/article';
import { Depot } from '../model/depot';
import { ArticleService } from '../services/article.service';
import { DepotService } from '../services/depot.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {
  articleFormGroup: FormGroup;
  depots: Depot[] | undefined;

  constructor(private route:Router,private fb: FormBuilder,private articleService:ArticleService, private depotService: DepotService) {
    this.articleFormGroup = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      backup: new FormControl(false),
      price: new FormControl(0, [Validators.required, Validators.min(0.1)]),
      depot: new FormControl(0, [Validators.required])
    })
  }

  ngOnInit(): void {
    this.getDepots();
  }

  public handleAdd() {
    let article: Article = {
      name: this.articleFormGroup.value.name,
      backup: this.articleFormGroup.value.backup,
      price: this.articleFormGroup.value.price,
      depot: this.articleFormGroup.value.depot
    };

    this.articleService.save(article).subscribe({
      next:()=>{
        alert("article added");
      }
    })

    this.route.navigateByUrl("nav/article");
  }

  public getDepots() {
    this.depotService.findAll().subscribe({
      next: (data) => {
        this.depots = data;
      }
    })
  }

}
