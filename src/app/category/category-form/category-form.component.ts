import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/service/category.service';
import { CategoryForm } from '../model/form.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent {

  @Input() pageTitle = '';
  categoryId: number | undefined;
  isUpdateMode: boolean
  subscriptions = new Subscription();
  categoryForm: FormGroup;
  categoryColorList = [
    { value: 1, name: '赤', color: '#FF4500' },
    { value: 2, name: '緑', color: '#4CAF50' },
    { value: 3, name: '青', color: '#03A9F4' },
  ];

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.categoryForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern('([^\x01-\x7E]|[\da-zA-Z])+')
      ]),
      slug: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]*$')
      ]),
      categoryColor: new FormControl('', Validators.required),
    });
    const categoryId = this.route.snapshot.paramMap.get('id');
    this.isUpdateMode = categoryId ? true : false;
    if(this.isUpdateMode) {
      this.categoryId = Number(categoryId);
    }
  }

  ngOnInit(): void {
    if(this.isUpdateMode) {
      this.setFormInitialValueForUpdate();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSubmit(): void {
    if(this.categoryForm.invalid) {
      false
    } else {
      const categoryFormValue = this.categoryForm.value;
      const categoryForm: CategoryForm = {
        name: categoryFormValue.name,
        slug: categoryFormValue.slug,
        categoryColorId: categoryFormValue.categoryColor,
      }
      if(this.isUpdateMode) {
        this.updateCategory(categoryForm);
      } else {
        this.addCategory(categoryForm);
      }
    }
  }

  setFormInitialValueForUpdate(): void {
    if(typeof this.categoryId === 'number') {
      this.subscriptions.add(
        this.categoryService.getCategory(this.categoryId).subscribe(category => {
          this.categoryForm.setValue({
            name: category.name,
            slug: category.slug,
            categoryColor: category.categoryColor,
          });
        })
      );
    }
  }

  addCategory(categoryForm: CategoryForm): void {
    this.subscriptions.add(
      this.categoryService.addCategory(categoryForm).subscribe(
        _ => this.router.navigate(['/category'])
      )
    );
  }

  updateCategory(categoryForm: CategoryForm): void {
    if(typeof this.categoryId === 'number') {
      this.subscriptions.add(
        this.categoryService.updateCategory(this.categoryId, categoryForm).subscribe(
          _ => this.router.navigate(['/category'])
        )
      );
    }
  }

  get nameForm() {
    return this.categoryForm.controls['name'];
  }

  get slugForm() {
    return this.categoryForm.controls['slug'];
  }

  get categoryColorForm() {
    return this.categoryForm.controls['categoryColor'];
  }

}
