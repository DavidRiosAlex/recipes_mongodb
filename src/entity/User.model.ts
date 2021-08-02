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
}

const SchemaUser = new Schema<User>({
    name: { type: String, unique: '' },
    lastName: { type: String, default: '' },
    email: { type: String, unique: true },
    password: { type: String, default: '' },
    recipes: { type: [Types.ObjectId], default: [] }
})

const UserModel = model('User', SchemaUser);

export default {
    UserGraph,
    UserModel
};