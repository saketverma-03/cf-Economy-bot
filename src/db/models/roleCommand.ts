import mongoose, { InferSchemaType } from 'mongoose';

const RoleCommands = new mongoose.Schema(
    {
        // use guildId as _id
        commandA: [String],
        commandB: [String],
        commandC: [String],
    },
    { timestamps: true },
);

export type Community = InferSchemaType<typeof RoleCommands>;

export default mongoose.model<Community>('roleCommands', RoleCommands);
