import { Schema, Types, model } from 'mongoose';
import { Field, ObjectType } from 'type-graphql';

interface Recipe {
    name: string;
    description: string;
    ingredients: string[];
    category: string;
};

@ObjectType()
class RecipeGraph {
    @Field({ nullable: true })
    name: string;
    @Field({ nullable: true })
    description: string;
    @Field(()=>[String], { nullable: true })
    ingredients: string[];
    @Field({ nullable: true })
    category: string;
    @Field()
    _id: string;
}

const SchemaRecipe = new Schema<Recipe>({
    name: { type: String, unique: true },
    description: { type: String, default: '' },
    ingredients: { type: [Types.ObjectId], ref: 'Ingredient', default: null },
    category: { type: Types.ObjectId, ref: 'Category', default: null },
})

const RecipeModel = model('Recipe', SchemaRecipe);

export default {
    RecipeGraph,
    RecipeModel
};