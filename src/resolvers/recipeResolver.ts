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
import { Ingredient, Recipe, Category, User } from '../entity';
// import Category from '../entity/Category';
import auth from '../helpers/auth';


const { RecipeGraph, RecipeModel } = Recipe;
const { CategoryGraph } = Category;
const { IngredientGraph } = Ingredient;
const { UserModel } = User;
@ObjectType()
@InputType()
class RecipeInput {
    @Field({ nullable: true })
    name!: string;
    @Field({ nullable: true })
    description!: string;
    @Field(()=> [String], { nullable: true })
    ingredients!: string[];
    @Field({ nullable: true })
    category!: string;
}
@ObjectType()
class RecipeOutput {
    @Field()
    name!: string;
    @Field()
    description!: string;
    @Field(()=> [IngredientGraph])
    ingredients!: typeof IngredientGraph[];
    @Field(() => CategoryGraph)
    category!: typeof CategoryGraph;
    @Field()
    _id!: string;
}
@Resolver()
export class RecipeResolver{
    @Mutation(() => RecipeGraph)
    async createRecipe(
        @Arg('data', () => RecipeInput) data: InstanceType<typeof RecipeGraph>,
        @Arg('token', () => String) token: string
    ){
        const verified = auth(token);
        if ( verified instanceof Error ) return
        const { data: loggedUser } = verified;

        const user = await UserModel.findOne({ _id: loggedUser._id });
        console.log(user);
        if(!user) return new Error('user not found');

        const newRecipe = await RecipeModel.create(data);
        console.log(user)
        user.recipes.push(newRecipe._id);
        await user.save()
        console.log(user);

        return newRecipe
    }

    @Mutation(() => Boolean)
    async deleteRecipe(
        @Arg('_id', () => String) _id: string,
        @Arg('token', () => String) token: string
    ){
        auth(token);
        await RecipeModel.deleteOne({ _id });
        return true 
    }

    @Query(()=>[RecipeOutput])
    async getRecipes(
        @Arg('token', () => String) token: string
    ){
        auth(token);
        const recipes = await RecipeModel.find({})
            .populate('ingredients')
            .populate('category')
            .populate('recipes');
        console.log(JSON.stringify(recipes[0]));
        return recipes
    }

    @Query(()=>RecipeOutput)
    async getOneRecipes(
        @Arg('_id', () => String ) _id: string,
        @Arg('token', () => String) token: string
    ){
        auth(token);
        const recipe = await RecipeModel.findOne({ _id }).populate('ingredients').populate('category');
        console.log(recipe);
        return recipe
    }

    @Mutation(() => Boolean)
    async updateRecipe(
        @Arg('_id', () => String ) _id: string,
        @Arg('recipe', () => RecipeInput) recipe: RecipeInput,
        @Arg('token', () => String) token: string
    ){

        auth(token);
        await RecipeModel.updateOne({ _id }, { $set: { ...recipe } });
        return true 
    }
}
