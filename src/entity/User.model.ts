import { Schema, Types, model } from 'mongoose';
import { Field, ObjectType } from 'type-graphql';

interface User {
    name: string;
    lastName: string;
    email: string;
    password: string;
};

@ObjectType()
class UserGraph {
    @Field()
    name: string;
    @Field()
    lastName: string;
    @Field()
    email: string;
    @Field()
    password: string;
    @Field()
    _id: string;
    @Field( () => [String] )
    recipes: string[];
}

const SchemaUser = new Schema<User>({
    name: { type: String, unique: '' },
    lastName: { type: String, default: '' },
    email: { type: String, unique: true },
    password: { type: String, default: '' },
    secret: { type: String, default: '' },
    recipes: { type: [Types.ObjectId], ref: 'Recipe', default: [] }
})

const UserModel = model('User', SchemaUser);

export default {
    UserGraph,
    UserModel
};