import { Schema, model } from 'mongoose';
import { Field, ObjectType } from 'type-graphql';

interface Category {
    name: string;
    description: string;
};

@ObjectType()
class CategoryGraph {

    @Field()
    name: string;

    @Field()
    description: string;
    
    @Field()
    _id: string;
}

const SchemaCategory = new Schema<Category>({
    name: { type: String, unique: true },
    description: { type: String, default: '' }
})

const CategoryModel = model('Category', SchemaCategory);

export default {
    CategoryGraph,
    CategoryModel,
};