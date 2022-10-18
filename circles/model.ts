import { Types, PopulatedDoc, Document } from "mongoose";
import { Schema, model } from "mongoose";
import type { User } from "../user/model";

/**
 * This file defines the properties stored in a Freet
 * DO NOT implement operations here ---> use collection file
 */

// Type definition for Circle on the backend
export type Circle = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  authorID: Types.ObjectId; // owner of circle
  userIDs: Types.ObjectId[];
  level: number;
  canShare: boolean;
  canRefreet: boolean;
  canReply: boolean;
};

export type populatedCircle = Circle & {
  authorID: User;
  userIDs: User[];
};

// Mongoose schema definition for interfacing with a MongoDB table
// Freets stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const CircleSchema = new Schema<Circle>({
  // Users in the circle
  userIDs: [
    {
      // Use Types.ObjectId outside of the schema
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],

  authorID: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  level: { type: Number, required: true, max: 3, min: 0 },
  canShare: { type: Boolean, default: false },
  canRefreet: { type: Boolean, default: false },
  canReply: { type: Boolean, default: false },
});

const CircleModel = model<Circle>("Circle", CircleSchema);
export default CircleModel;
