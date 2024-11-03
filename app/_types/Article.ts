import { Document, Model} from "mongoose";

// todo add id
export interface IArticle{
    name: string,
    englishName: string,
    link: string,
    date: Date,
    company: string,
    type: string,
    originLang: string,
    language: string,
    tags: string[],
    summary: string,
}

export interface IArticleDocument extends IArticle, Document {}

export interface IArticleModel extends Model<IArticleDocument>{
    buildArticle(args: IArticle): IArticleDocument 
}