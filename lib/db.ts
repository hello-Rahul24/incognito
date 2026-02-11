import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://girirahul2028_db_user:HpubPUIpLILEtPsm@paytm.ddhqe3i.mongodb.net/incognito"
);

const roomSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      required: true,
      unique: true
    },
    owner: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    maxusers: {
      type: Number,
      default: 10
    },
    expiresIn: {
      type: String,
      default: "24h"
    },
    createdAt: {
      type: Date, 
      default: Date.now
    }
  },
  {
    timestamps: true, // This auto-adds createdAt and updatedAt
  }
);

export const Room = mongoose.models.Room || mongoose.model("Room", roomSchema);
