import { Schema, model } from 'mongoose';
import { Field, ObjectType } from 'type-graphql';

interface Ingredient {
    name: string;
    quantity: number;
};

@ObjectType()
class IngredientGraph {

    @Field()
    name: string;

    @Field()
    quantity: number;
    
    @Field()
    _id: string;
}

const SchemaIngredient = new Schema<Ingredient>({
    name: { type: String, unique: true },
    quantity: { type: Number, default: 0 }
})

const IngredientModel = model('Ingredient', SchemaIngredient);

export default {
    IngredientGraph,
    IngredientModel,
};