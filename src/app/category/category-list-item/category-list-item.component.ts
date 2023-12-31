import { Component } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category-list-item',
  templateUrl: './category-list-item.component.html',
  styleUrls: ['./category-list-item.component.scss']
})
export class CategoryListItemComponent {
  displayedColumns: string[] = ['name', 'slug', 'categoryColor', 'expand'];
  categoryList: Category[] = [];

  constructor(
    private categoryService: CategoryService,
  ) { }

  ngOnInit(): void {
    this.getCategoryList();
  }

  getCategoryList() {
    this.categoryService.getCategoryList().subscribe(categories => {
      this.categoryList = categories;
    });
  }

  deleteCategory(id: number, categoryName: string) {
    if(confirm(`${categoryName}を削除しますか`)) {
      this.categoryService.deleteCategory(id).subscribe(
        _ => location.reload()
      );
    }
  }

  getCategoryColor(categoryId: number): string {
    switch(categoryId) {
      case 0:
        return "#808080"
      case 1:
        return "#FF4500"
      case 2:
        return "#4CAF50"
      case 3:
        return "#03A9F4"
      default:
        return "#808080";
    }
  }

  getCategoryName(categoryId: number): string {
    switch(categoryId) {
      case 0:
        return "灰"
      case 1:
        return "赤"
      case 2:
        return "緑"
      case 3:
        return "青"
      default:
        return "灰";
    }
  }

}

