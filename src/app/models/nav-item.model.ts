/**
 * Manu navigation model class
 */
export class NavItemModel {
    constructor(
        public id: string,
        public text: string,
        public href: string,
        public params: any = null,
        public navItems: NavItemModel[] = [],
        public megaMenu: boolean = false,
        public megaMenuData?: any
    ) {
    }








}