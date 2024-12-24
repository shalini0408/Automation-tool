import { json } from "body-parser";
import express, { Request, Response } from "express";
import ContainerModel from "../../models/container";
import Images from "../../models/image";

const router = express.Router();

router.use(json());

// Fetches 20 recently created images
router.get("/all", async (req: Request, res: Response) => {
  const images = await Images.find({})
    .sort({ created_at: -1 })
    .catch((err: Error) => {
      console.log(err);
      return false;
    });

  if (images) {
    res.json(images);
  } else {
    res.status(500);
    res.json({
      message: "Failed to fetch images from db",
    });
  }
});

// Fetch 20 latest images created by a user
router.get("/", async (req: Request, res: Response) => {
  const { userId } = req.query;

  if (userId) {
    //@ts-ignore
    const userImages = await Images.find({ userId })
      .limit(20)
      .catch((err: Error) => {
        console.log(err);
        return false;
      });

    const userContainers = await ContainerModel.find({}).catch((err: Error) => {
      console.log(err);
      return false;
    });

    if (userImages || userContainers) {
      res.json({ userImages, userContainers });
    } else {
      res.status(500);
      res.json({
        message: "Failed to fetch user images and containers from db",
      });
    }
  } else {
    res.status(400);
    res.json({
      message: "Invalid or missing user id.",
    });
  }
});

// give the image name with image id
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  if (id) {
    const image = await Images.findOne({ _id: id }).catch((err: Error) => {
      console.log(err);
      return false;
    });

    if (image) {
      res.json(image);
    } else {
      res.status(500);
      res.json({
        message: "Failed to fetch image from db",
      });
    }
  } else {
    res.status(400);
    res.json({
      message: "Invalid or missing image id.",
    });
  }
});

export { router as indexImageRouter };
