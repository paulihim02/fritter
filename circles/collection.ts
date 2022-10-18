import type { HydratedDocument, Types } from "mongoose";
import type { Circle } from "./model";
import FreetModel from "./model";
import UserCollection from "../user/collection";
import { User } from "user/model";
import CircleModel from "./model";

/**
 * This files contains a class that has the functionality to explore freets
 * stored in MongoDB, including adding, finding, updating, and deleting freets.
 * Feel free to add additional operations in this file.
 *
 * Note: HydratedDocument<Freet> is the output of the FreetModel() constructor,
 * and contains all the information in Freet. https://mongoosejs.com/docs/typescript.html
 */
class CircleCollection {
  /**
   * Add a circle to the collection
   *
   * @param {string} author - The author (user) of the circle
   * @param {number} level - The level to add the user to
   * @return {Promise<HydratedDocument<Circle>>} - The updated Circle
   */
  static async addOne(
    authorID: Types.ObjectId,
    level: number,
    // userIDs: Types.ObjectId[],
    canShare?: boolean,
    canRefreet?: boolean,
    canReply?: boolean
  ): Promise<HydratedDocument<Circle>> {
    const newCircle = new CircleModel({
      authorID,
      level,
      canShare,
      canRefreet,
      canReply,
    });

    await newCircle.save();

    return newCircle.populate("authorID");
  }

  /**
   * Find a circle of specific level by authorId
   *
   * @param {string} username - The id of the freet to find
   * @return {Promise<HydratedDocument<Circle>> | Promise<null> } - The freet with the given freetId, if any
   */
  static async findOne(
    authorID: string | Types.ObjectId,
    level: number
  ): Promise<HydratedDocument<Circle>> {
    console.log("finding for", authorID, level);
    return await CircleModel.findOne({
      authorID,
      level,
    }).populate("authorID");
  }

  /**
   * Get all the circles in the database
   *
   * @return {Promise<HydratedDocument<Circle>[]>} - An array of all of the freets
   */
  static async findAll(): Promise<Array<HydratedDocument<Circle>>> {
    // Retrieves freets and sorts them from most to least recent
    console.log("finding!", await CircleModel.find({}));
    // .populate("authorID"));
    return await CircleModel.find({}).populate("authorID");
  }

  /**
   * Get all the circles by given author
   *
   * @param {string} username - The username of author of the freets
   * @return {Promise<HydratedDocument<Freet>[]>} - An array of all of the freets
   */
  static async findAllByUsername(
    username: string
  ): Promise<Array<HydratedDocument<Circle>>> {
    const authorID = (await UserCollection.findOneByUsername(username))._id;
    return CircleModel.find({ authorID }).populate("author");
  }

  /**
   * Update a circle with the new content
   *
   * @param {string} authorID - The owner of the circle to be updated
   * @param {number} level - the circle level
   * @param {string} usernameToUpdate - The username to be added/removed
   * @param {boolean} removeUser - toggle of whether to add or remove a user
   * @return {Promise<HydratedDocument<Circle>>} - The newly updated freet
   */
  static async updateOne(
    authorID: Types.ObjectId,
    level: number,
    usernameToUpdate: string,
    removeUser = false
  ): Promise<HydratedDocument<Circle>> {
    console.log("attempting to update user with username:", usernameToUpdate);
    const userFromString = await UserCollection.findOneByUsername(
      usernameToUpdate
    );
    console.log("user found is", userFromString);

    console.log("auth ID", authorID, "lvl", level);
    const circle = await CircleModel.findOne({ authorID, level });

    if (!circle || !userFromString) {
      console.log("circle doesn't exist or user not a valid user");
      console.log(circle, usernameToUpdate);
      return;
    }

    console.log("old", circle.userIDs, removeUser);

    circle.userIDs = removeUser
      ? circle.userIDs.filter((userId) =>
          usernameToUpdate.includes(userId as any)
        )
      : [...circle.userIDs, userFromString._id];
    console.log(...circle.userIDs, userFromString._id);
    await circle.save();
    console.log(circle.userIDs);
    return circle.populate("authorID");
  }

  /**
   * Delete a circle associated with given username.
   *
   * @param {string} username - The freetId of freet to delete
   * @param {number} level - The freetId of freet to delete
   * @return {Promise<Boolean>} - true if the freet has been deleted, false otherwise
   */
  static async deleteOne(username: string, level: number): Promise<boolean> {
    const circle = await CircleModel.deleteOne({
      author: UserCollection.findOneByUsername(username),
      level,
    });
    return circle !== null;
  }
}

export default CircleCollection;
