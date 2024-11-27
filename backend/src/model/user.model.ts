import mongoose, { Schema, Document } from 'mongoose';

// Interface para o usuário
export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
}

// Schema do usuário
const UserSchema: Schema = new Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    {
        timestamps: true, // Adiciona 'createdAt' e 'updatedAt'
    }
);

// Exportar o modelo
const User = mongoose.model<IUser>('User', UserSchema);
export default User;
