export interface Category {
  id?: number,
  name: string,
  slug: string,
  categoryColor: CategoryColor
}

/**
 * @COLOR_OPTION_NONE code = 0, name = "灰", color = "#808080"
 * @COLOR_OPTION1 code = 1, name = "赤", color = "#FF4500"
 * @COLOR_OPTION2 code = 2, name = "緑", color = "#4CAF50"
 * @COLOR_OPTION3 code = 3, name = "青", color = "#03A9F4"
 */
export enum CategoryColor {
  COLOR_OPTION_NONE = 0,
  COLOR_OPTION1 = 2,
  COLOR_OPTION2 = 3,
  COLOR_OPTION3 = 4,
}
