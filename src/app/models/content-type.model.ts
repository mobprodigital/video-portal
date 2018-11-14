import { ContentTypeEnum } from "../enums/content-type.enum";

export class ContentTypeModel {
    constructor(
        public ContentTypeName: string,
        public ContentTypeId: ContentTypeEnum) {
    }
}
