export interface INavigationLink {
    title: string;
    link: string;
}

export interface INavigation {
    id: number;
    icon: string;
    title: string;
    links: INavigationLink[];
}
