import type { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import CircleCollection from "./collection";
import { Circle } from "./model";

/**
 * Checks if a freet with freetId is req.params exists
 */
const canCreateCircles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validFormat = Types.ObjectId.isValid(req.params.username);
  const circles = validFormat
    ? await CircleCollection.findAllByUsername(req.params.username)
    : [];

  const uniqueLevels: Set<number> = circles.reduce(
    (prevCircle: Set<number>, currCircle: Circle) =>
      prevCircle.add(currCircle.level),
    new Set()
  );

  if (uniqueLevels.size > 3 || Math.max(...uniqueLevels) > 3) {
    res.status(404).json({
      error: {
        circleNotFound: `${req.params.username} has no circles that exists. Make your first one!`,
      },
    });
    return;
  }

  next();
};

/**
 * Checks if the current user is the author of the freet whose freetId is in req.params
 */
const isValidCircleModifier = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const circle = await CircleCollection.findOne(
    req.params.authorId,
    parseInt(req.params.level)
  );

  if (req.session.userId !== circle.authorID.toString()) {
    res.status(403).json({
      error: "Cannot modify other users' circles.",
    });
    return;
  }

  next();
};

export { canCreateCircles, isValidCircleModifier };
