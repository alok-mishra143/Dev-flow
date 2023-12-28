"use server"

import Question from "@/database/question.model";
import { connectToDatabase } from "../moongoose"
import Tag from "@/database/tag.model";
import { CreateQuestionParams, GetQuestionsParams } from "./shared.types";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";


export async function GetQuestion(params:GetQuestionsParams){

  try {
    connectToDatabase();
    const question= await Question.find({})
     .populate({path:'tags',model:Tag})
     .populate({path:'author',model:User})
     .sort({createdAt:-1})
   

     return {question}
    

  } catch (error) {
    console.log(error);
    throw error;
  }

}

export async function CreateQuestion(prams:CreateQuestionParams){
  try{

    connectToDatabase();
    const {title,content,tags,author,path}=prams

    //create a question 

    const question=await Question.create({
      title,
      content,
      author
    });

    const tagDocument=[];

    //getting the tags from the database

    for(const tag of tags){
      const existingTag=await Tag.findOneAndUpdate(

        {name:{$regex:new RegExp(`^${tag}$`,'i')}},
        {$setOnInsert:{name:tag},$push:{questions:question._id}},

        {upsert:true,new:true}
      );

      tagDocument.push(existingTag._id);
    }
    await Question.findByIdAndUpdate(question._id,{
      $push:{tags:{$each:tagDocument}}
    })


    //craete a question and tags 


    revalidatePath(path)
    

  }
  catch(e){
    console.error("Error creating question:", e);
    throw e; 

  }
}