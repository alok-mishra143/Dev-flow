"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../moongoose";
import {
  GetAllTagsParams,
  GetTagByIdParams,
  GetTopInteractedTagsParams,
} from "./shared.types";
import Tag from "@/database/tag.model";
import { FilterQuery } from "mongoose";

export async function getTopIneractedTags(prams: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();

    const { userId, limit = 3 } = prams;

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("user not found");
    }

    //find the interaction

    //interaction

    return [
      { _id: 1, name: "tag1" },
      { _id: 2, name: "tag2" },
      { _id: 3, name: "tag3" },
    ];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getTagById(params: GetTagByIdParams) {
  try {
    connectToDatabase();

    const { tagId } = params;

    const tag = await Tag.findOne({
      _id: tagId,
    });

    return tag;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//get all getTags

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDatabase();

    //! const { page = 1, pageSize = 10, filter, searchQuery } = params;

    // Calculate the number of tags to skip based on the page number and page size

    //!  const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Tag> = {};

    // if (searchQuery) {
    //   query.$or = [{ name: { $regex: new RegExp(searchQuery, "i") } }];
    // }

    // let sortOptions = {};

    // switch (filter) {
    //   case "popular":
    //     sortOptions = { questions: -1 };
    //     break;
    //   case "recent":
    //     sortOptions = { createdAt: -1 };
    //     break;
    //   case "name":
    //     sortOptions = { name: 1 };
    //     break;
    //   case "old":
    //     sortOptions = { createdAt: 1 };
    //     break;
    //   default:
    //     break;
    // }

    const tags = await Tag.find({});
    // .sort(sortOptions)
    // .skip(skipAmount)
    // .limit(pageSize);

    //const totalTags = await Tag.countDocuments(query);

    //const isNext = totalTags > skipAmount + tags.length;

    return { tags };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
