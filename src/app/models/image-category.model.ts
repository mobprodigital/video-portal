export class ImageCategoryModel {
    /**
     * Name of the Category
     */
    public name: string = '';
    /**
     * Id of the Category
     */
    public id: string = '';

    /**
     * Child category array
     */
    public categories: Array<ImageCategoryModel> = [];

    constructor(Name: string, Id: string, Categories?: Array<ImageCategoryModel>) {
        this.id = Id;
        this.name = Name;
        if (Categories && Categories.length > 0) {
            this.categories = Categories;
        }
    }
}