import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/service/category.service';
import { CategoryForm } from '../model/form.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent {

  @Input() pageTitle = '';
  @Input() isUpdateMode = false;
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
      name: new FormControl('', Validators.required),
      slug: new FormControl('', Validators.required),
      categoryColor: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.setFormInitialValueForUpdate();
  }

  onSubmit() {
    if(this.categoryForm.invalid) {
      false
    } else {
      const categoryFormValue = this.categoryForm.value;
      const categoryForm: CategoryForm = {
        name: categoryFormValue.name,
        slug: categoryFormValue.slug,
        categoryId: categoryFormValue.categoryColor,
      }
      if(this.isUpdateMode) {
        this.updateCategory(categoryForm);
      } else {
        this.addCategory(categoryForm);
      }
    }
  }

  setFormInitialValueForUpdate() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.categoryService.getCategory(id).subscribe(category => {
      this.categoryForm.setValue({
        name: category.name,
        slug: category.slug,
        categoryColor: category.categoryColor,
      });
    });
  }

  addCategory(categoryForm: CategoryForm) {
    this.categoryService.addCategory(categoryForm).subscribe(
      _ => this.router.navigate(['/category'])
    );
  }

  updateCategory(categoryForm: CategoryForm) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.categoryService.updateCategory(id, categoryForm).subscribe(
      _ => this.router.navigate(['/category'])
    );
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
