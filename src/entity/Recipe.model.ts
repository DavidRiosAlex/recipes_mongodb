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
    @Field()
    name: string;
    @Field()
    description: string;
    @Field()
    ingredients: string[];
    @Field()
    category: string;
}

const SchemaRecipe = new Schema<Recipe>({
    name: { type: String, unique: true },
    description: { type: String, default: '' },
    ingredients: { type: [Types.ObjectId], default: null },
    category: { type: Types.ObjectId, default: null },
})

const RecipeModel = model('Recipe', SchemaRecipe);

export default {
    RecipeGraph,
    RecipeModel
};