import {
    Resolver,
    Query,
    Mutation,
    Arg,
    Field,
    InputType,
} from 'type-graphql';
import auth from '../helpers/auth';
import { Category } from '../entity';

const { CategoryGraph, CategoryModel } = Category;
@InputType()
class CategoryInput {
    @Field()
    name!: string
    @Field(() => String)
    description!: string;
}

@Resolver()
export class CategoryResolver{
    @Mutation(() => CategoryGraph)
    async createCategory(
        @Arg('token', () => String) token: string,
        @Arg('data', () => CategoryInput) data: CategoryInput
    ){
        auth(token);
        const newCategory = await CategoryModel.create(data);
        return newCategory
    }

    @Query(()=> [CategoryGraph])
    getCategories(
        @Arg('token', () => String) token: string,
    ){
        auth(token);
        return CategoryModel.find()
    }

    @Query(()=> CategoryGraph)
    getOneCategories(
        @Arg('token', () => String) token: string,
        @Arg('_id', () => String) _id: string
    ){
        auth(token);
        return CategoryModel.findOne({ _id })
    }

    @Mutation(() => Boolean)
    async updateCategory(
        @Arg('token', () => String) token: string,
        @Arg('_id', () => String) _id: string,
        @Arg('data', () => CategoryInput) data: CategoryInput
    ){
        auth(token);
        const category = await CategoryModel.findOne({ _id });
        console.log(category);
        if (!category) return new Error('category not found');
        category.name = data.name;
        if (data.name) category.name = data.name;
        if (data.description) category.description = data.description;
        await category.save();
        return true
    }

    @Mutation(() => Boolean)
    async deleteCategory(
        @Arg('token', () => String ) token: string,
        @Arg('_id', () => String ) _id: string
    ){
        auth(token);
        const category = await CategoryModel.findOne({ _id });
        if (!category) return new Error('category not found');
        await CategoryModel.deleteOne({ _id });
        return true
    }
}
