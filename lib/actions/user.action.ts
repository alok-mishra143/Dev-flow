"use server"

import User from "@/database/user.model";
import { connectToDatabase } from "../moongoose"
import { CreateUserParams, DeleteUserParams, GetUserByIdParams, UpdateUserParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";


export async function getUserById(prams:GetUserByIdParams){

  try {
    connectToDatabase();
    const {userId}=prams;

    const user=await User.findOne({clerkId:userId});
  
    return user;
    
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createUser(userData:CreateUserParams){

  try {
    connectToDatabase();

    const newUser=await User.create(userData);
    return newUser;

  } catch (error) {
    console.log(error);
    throw error;
  }
}


export async function updateUser(userData:UpdateUserParams){

  try {
    connectToDatabase();

    const {clerkId,updateData,path}=userData;
    await User.findOneAndUpdate({clerkId},updateData,{new:true});
    revalidatePath(path)
    
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(userData:DeleteUserParams){

  try {
    connectToDatabase();

    const {clerkId}=userData;

    const user = await User.findOneAndDelete({ clerkId });

    if(!user){
      throw new Error("User not found");
    }

    // const userQuestion=await Question.find({author:user._id}).distinct('_id');

   
    await Question.deleteMany({author:user._id});

    //TODO delete commnet ans etc..


    //@ts-ignore
    const deletedUser=await User.findByIdAndDelete(user._id);

    return deletedUser;

  } catch (error) {
    console.log(error);
    throw error;
  }
}