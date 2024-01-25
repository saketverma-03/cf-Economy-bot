import mongoose, { InferSchemaType } from 'mongoose';

const CommunitySchema = new mongoose.Schema(
    {
        // use guildId as _id
        _id: { type: String, require: true },
        currencyName: String,
        balance: { type: Number, default: 100000 },
        taxPerTransaction: { type: Number, default: false },
        managerRoles: [String],
    },
    { timestamps: true },
);

export type Community = InferSchemaType<typeof CommunitySchema>;

export default mongoose.model<Community>('community', CommunitySchema);
