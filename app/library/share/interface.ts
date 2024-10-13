export interface Category {
    _id: string;
    title: string;
    subTitle: string;
    description: string;
    shortDescription: string;
    backgroundImage: string;
    __v: number;
}

export interface TPromt {
    _id: string;
    title: string;
    subTitle: string;
    description: string;
    shortDescription: string;
    icon: string;
    backgroundImage: string;
    aiType: string;
    packageType: string;
    prompt: string;
    categoryId: Category;
    __v: number;
}
