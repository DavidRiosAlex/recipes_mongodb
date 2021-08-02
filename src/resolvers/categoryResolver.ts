import {
    Resolver,
    Query,
    Mutation,
    Arg,
    Field,
    InputType,
} from 'type-graphql';
import { Category } from '../entity';

const { CategoryGraph, CategoryModel } = Category;
@InputType()
class CategoryInput {
    @Field()
    name!: string
}

@Resolver()
export class CategoryResolver{
    @Mutation(() => CategoryGraph)
    async createCategory(
        @Arg('token', () => String) token: string,
        @Arg('data', () => CategoryInput) data: CategoryInput
    ){
        const newCategory = await CategoryModel.create(data);
        return newCategory
    }

    @Query(()=> [Category])
    getCategories(
        @Arg('token', () => String) token: string,
    ){

        return CategoryModel.find()
    }

    @Query(()=> CategoryGraph)
    getOneCategories(
        @Arg('token', () => String) token: string,
        @Arg('name', () => String) name: string
    ){
        return CategoryModel.findOne({ name })
    }

    @Mutation(() => Boolean)
    async updateCategory(
        @Arg('token', () => String) token: string,
        @Arg('name', () => String) name: string,
        @Arg('data', () => CategoryInput) data: typeof CategoryGraph
    ){
        const category = await CategoryModel.findOne({ name });
        if (!category) return new Error('category not found');
        category.name = data.name;
        await category.save();
        return category
    }

    @Mutation(() => Boolean)
    async deleteCategory(
        @Arg('token', () => String ) token: string,
        @Arg('name', () => String ) name: string
    ){
        const category = await CategoryModel.findOne({ name });
        if (!category) return new Error('category not found');
        await CategoryModel.deleteOne({ name });
        return true
    }
}
