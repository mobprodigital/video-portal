export class CategoryModel {

    constructor(public categoryName: string, public categoryId: string, public slug?: string, Categories: Array<CategoryModel> = []) {

    }
}