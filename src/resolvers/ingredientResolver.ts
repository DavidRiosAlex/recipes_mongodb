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
    @Mutation(() => IngredientGraph)
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
        @Arg('_id', () => String) _id: string
    ){
        auth(token);
        await IngredientModel.deleteOne({ _id });
        return true 
    }

    @Query(()=>[IngredientGraph])
    getIngredient(
        @Arg('token', () => String) token
    ){
        auth(token);
        return IngredientModel.find()
    }

    @Query(()=>IngredientGraph)
    getOneIngredient(
        @Arg('token', () => String) token: string,
        @Arg('_id', () => String, { nullable: true }) _id: string
    ){
        auth(token);
        return IngredientModel.findOne({ _id });
    }

    @Mutation(() => Boolean)
    async updateIngredient(
        @Arg('_id', () => String ) _id: string,
        @Arg('ingredient', () => IngredientInput) ingredient: IngredientInput,
        @Arg('token', () => String) token: string
    ){
        auth(token);
        await IngredientModel.updateOne({ _id }, { $set: { ...ingredient } });
        return true
    }
}
