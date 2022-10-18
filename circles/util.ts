import type { Types, HydratedDocument } from "mongoose";
import moment from "moment";
import type { Circle, populatedCircle } from "./model";
import { User } from "user/model";

// Update this if you add a property to the Freet type!
type CircleResponse = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  authorID: string; // owner of circle
  userIDs: Types.ObjectId[];
  canShare: boolean;
  canRefreet: boolean;
  canReply: boolean;
};

/**
 * Transform a raw Freet object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<Freet>} freet - A freet
 * @returns {FreetResponse} - The freet object formatted for the frontend
 */
const constructCircleResponse = (
  circle: HydratedDocument<Circle>
): CircleResponse => {
  if (!circle) {
    return;
  }

  const circleCopy: populatedCircle = {
    ...circle.toObject({
      versionKey: false, // Cosmetics; prevents returning of __v property
    }),
  };

  console.log(circleCopy.authorID);
  return {
    ...circleCopy,
    // _id: (circleCopy._id as any).toString(),
    authorID: JSON.stringify(circleCopy.authorID).replace("\\", ""),
  };
};

export { constructCircleResponse };
