"use server"

import User from "@/database/user.model";
import { connectToDatabase } from "../moongoose";
import { GetTopInteractedTagsParams } from "./shared.types";

export async function getTopIneractedTags(prams:GetTopInteractedTagsParams){

  try {
    connectToDatabase();

    const {userId,limit=3}=prams;

    const user =await User.findById(userId);

    if(!user){
      throw new Error("user not found");
    }

    //find the interaction

    //interaction


    return [{_id:1, name:'tag1'} ,{_id:2, name:'tag2'} ,{_id:3, name:'tag3'}]



    
  } catch (error) {
    console.log(error);
    throw error;
    
  }

}
