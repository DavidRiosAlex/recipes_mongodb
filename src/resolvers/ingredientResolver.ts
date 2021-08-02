import {
    Resolver,
    Query,
    Mutation,
    Arg,
    Field,
    InputType,
    Int
} from 'type-graphql';
import { Ingredient } from '../entity';
import auth from '../helpers/auth';

const { IngredientGraph, IngredientModel } = Ingredient;
@InputType()
class IngredientInput {
    @Field()
    name!: string
    @Field()
    quantity!: number
}

@Resolver()
export class IngredientResolver{
    @Mutation(() => IngredientModel)
    async createIngredient(
        @Arg('token', () => String) token: string,
        @Arg('data', () => IngredientInput) data: IngredientInput
    ){
        auth(token);
        const newIngredient = await IngredientModel.create(data);
        return newIngredient
    }
    @Mutation(() => Boolean)
    async deleteIngredient(
        @Arg('token', () => String) token: string,
        @Arg('name', () => Int) name: string
    ){
        auth(token);
        await IngredientModel.deleteOne({ name });
        return true 
    }

    @Query(()=>[IngredientModel])
    getIngredient(
        @Arg('token', () => String) token
    ){
        auth(token);
        return IngredientModel.find()
    }

    @Query(()=>IngredientModel)
    getOneIngredient(
        @Arg('token', () => String) token: string,
        @Arg('name', () => String, { nullable: true }) name: string
    ){
        auth(token);
        return IngredientModel.findOne({ name });
    }

    @Mutation(() => Boolean)
    async updateIngredient(
        @Arg('id', () => Int ) id: number,
        @Arg('ingredient', () => IngredientInput) ingredient: IngredientInput,
        @Arg('token', () => String) token: string
    ){
        auth(token);
        await IngredientModel.updateOne({_id: id }, { $set: { id, ingredient} });
        return true
    }
}
