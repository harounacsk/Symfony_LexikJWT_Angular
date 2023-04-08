import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Article } from '../model/article';
import { Depot } from '../model/depot';
import { ArticleService } from '../services/article.service';
import { DepotService } from '../services/depot.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  articles: Article[] | undefined;
  depots: Depot[] | undefined;
  articleFormGroup: FormGroup;

  @ViewChild('myModalClose') modalClose: any;

  constructor(private articleService: ArticleService, private depotService: DepotService, private fb: FormBuilder) {
    this.articleFormGroup = this.fb.group({
      id: new FormControl(0,[Validators.required]),
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      backup: new FormControl(false),
      price: new FormControl(0, [Validators.required, Validators.min(0.1)]),
      depot: new FormControl(0, [Validators.required])

    })
  }
  ngOnInit(): void {
    this.getArticles();
    this.getDepots();
    }

  public getArticle(article: Article) {
    this.articleFormGroup = this.fb.group({
      id: new FormControl(article.id),
      name: new FormControl(article.name),
      backup: new FormControl(article.backup),
      price: new FormControl(article.price),
      depot: new FormControl(article.depot.id)
    });
  }


  public getArticles() {
    this.articleService.findAll().subscribe({
      next: (data) => {
        this.articles = data;
      }
    })
  }

  public getDepots() {
    this.depotService.findAll().subscribe({
      next: (data) => {
        this.depots = data;
      }
    })
  }

  public handleUpdate() {
    let article: Article = {
      id: this.articleFormGroup.value.id,
      name: this.articleFormGroup.value.name,
      price: this.articleFormGroup.value.price,
      backup: this.articleFormGroup.value.backup,
      depot: this.articleFormGroup.value.depot
    };
    this.articleService.update(article).subscribe({
      next: () => {
        alert("article updated");
      }
    });
    this.modalClose.nativeElement.click();

  }

}
