import type { NextFunction, Request, Response } from "express";
import express from "express";
import UserCollection from "../user/collection";

import * as userValidator from "../user/middleware";
import CircleCollection from "./collection";
import * as circleValidator from "./middleware";
import * as util from "./util";

const router = express.Router();

// router.use("/", (req: Request, res: Response, next: NextFunction) => {
//   console.log("hit here");
//   next();
// });

/**
 * Creates a circle. Requires user to be signed in.
 *
 * @name POST /api/circles
 *
 * @param {number} level - The circle level to create
 * @return {UserResponse} - An object with user's details
 * @throws {404} - If user is not signed in
 *
 */
router.post(
  "/",
  [userValidator.isUserLoggedIn, circleValidator.canCreateCircles],
  async (req: Request, res: Response) => {
    const authorID = req.session.userId;
    const { level, canShare, canRefreet, canReply } = req.body;
    console.log("level", req.body);
    console.log("params", req.params);
    console.log("made it here", authorID);
    const circle = await CircleCollection.addOne(
      authorID,
      level,
      canShare || false,
      canRefreet || false,
      canReply || false
    );

    res.status(201).json({
      message: `Circle was created successfully!`,
      user: util.constructCircleResponse(circle),
    });
  }
);

/** gets all circles */
router.get("/", async (req: Request, res: Response) => {
  const allCircles = await CircleCollection.findAll();
  const response = allCircles.map(util.constructCircleResponse);

  res.status(200).json(response);
});

router.get("/:username/:level", async (req: Request, res: Response) => {
  console.log("hitting here");
  const { username, level } = req.params;
  const userID = (await UserCollection.findOneByUsername(username))._id;
  const circle = await CircleCollection.findOne(userID, parseInt(level));
  res.status(200).json(util.constructCircleResponse(circle));
});

router.put(
  "/",
  userValidator.isUserLoggedIn,
  async (req: Request, res: Response) => {
    console.log(req.body, req.params);
    const { removeUser, level, username } = req.body;

    const circle = await CircleCollection.updateOne(
      req.session.userId,
      level,
      username,
      removeUser === "true" ? true : false
    );
    res.status(200).json(util.constructCircleResponse(circle));
  }
);

export { router as circlesRouter };
