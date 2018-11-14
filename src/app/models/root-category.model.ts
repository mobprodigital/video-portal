import { CategoryModel } from "./category.model";

export class RootCategoryModel {
    constructor(public id: number, public name: string, public categories?: CategoryModel[]) {
    }
}