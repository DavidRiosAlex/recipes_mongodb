import { connect } from "mongoose";
import requireAll from 'require-all';
import path from 'path';

declare var process : {
    env: {
        MONGODB_URI: string
    }
}

const {
    MONGODB_URI,
} = process.env;

requireAll({
    dirname: `${__dirname}/../entity`,
    filter: /\.model\.js$/,
});
export default async () => {
    await connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true });
    console.log('db is connected');
}