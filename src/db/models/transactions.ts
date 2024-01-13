
import mongoose, { InferSchemaType } from "mongoose"

const TransactionSchema = new mongoose.Schema({
  guildId: String,
  from: String,
  to: String,
  ammount: String
},
  { timestamps: true }
)

export type Transaction = InferSchemaType<typeof TransactionSchema>


export default mongoose.model<Transaction>("transaction", TransactionSchema);

