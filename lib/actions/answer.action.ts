"use server";

import Answer from "@/database/answer.model";
import { connectToDatabase } from "../moongoose";
import { CreateAnswerParams, GetAnswersParams } from "./shared.types";
import Question from "@/database/question.model";
import { revalidatePath } from "next/cache";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDatabase();

    const { content, author, question, path } = params;

    const newAnswer = await Answer.create({
      content,
      author,
      question,
      path,
    });

    // add the answer to the question's answers array
    const questionObj = await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    // create an interaction record for the user's create_answer action

    // increment author's reputation by +S for creating a answer

    revalidatePath(path);

  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAnswers(params: GetAnswersParams) {
  try {
    connectToDatabase();

    const { questionId } = params;
    const answer = await Answer.find({ question: questionId })
      .populate("author", "_id name picture clerkId")
      .sort({ createdAt: -1 });

    return { answer };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
