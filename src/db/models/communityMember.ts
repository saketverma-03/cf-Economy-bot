import mongoose, { InferSchemaType } from "mongoose"

const CommunityMemberSchema = new mongoose.Schema({
  guildId: String,
  discordId: { type: String, index: true },
  totalBalance: Number
},
  { timestamps: true }
)


export type CommunityMember = InferSchemaType<typeof CommunityMemberSchema>


export default mongoose.model<CommunityMember>("communityMember", CommunityMemberSchema);

