import {
    Resolver,
    Query,
    Mutation,
    Arg,
    Field,
    InputType,
    Int,
    ObjectType
} from 'type-graphql';
import { Ingredient, Recipe } from '../entity';
// import Category from '../entity/Category';
import auth from '../helpers/auth';


const { RecipeGraph, RecipeModel } = Recipe;
@ObjectType()
@InputType()
class RecipeInput {
    @Field()
    name!: string;
    @Field()
    description!: string;
    @Field( () => [Int])
    ingredients!: [number];
    @Field()
    category!: number;
}

@Resolver()
export class RecipeResolver{
    @Mutation(() => RecipeGraph)
    async createRecipe(
        @Arg('data', () => RecipeInput) data: typeof RecipeGraph,
        @Arg('token', () => String) token: string
    ){
        auth(token);
        const newRecipe = await RecipeModel.create(data);
        return newRecipe
    }
    @Mutation(() => Boolean)
    async deleteRecipe(
        @Arg('id', () => Int) id: number,
        @Arg('token', () => String) token: string
    ){
        auth(token);
        await RecipeModel.deleteOne({ _id: id });
        return true 
    }

    @Query(()=>[Recipe])
    async getRecipes(
        @Arg('token', () => String) token: string
    ){
        auth(token);
        const recipes = await RecipeModel.find({});
        console.log(recipes);
        return recipes
    }

    @Query(()=>Recipe)
    getOneRecipes(
        @Arg('name', () => String ) name: string,
        @Arg('token', () => String) token: string
    ){
        auth(token);
        return RecipeModel.findOne({ name })
    }

    @Mutation(() => Boolean)
    async updateRecipe(
        @Arg('id', () => Int ) id: number,
        @Arg('recipe', () => RecipeInput) recipe: typeof RecipeGraph,
        @Arg('token', () => String) token: string
    ){

        auth(token);
        await RecipeModel.updateOne({ _id: id }, { $set: { recipe } });
        return true
    }
}
