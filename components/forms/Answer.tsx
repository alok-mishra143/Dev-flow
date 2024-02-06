"use client";

import React, { useRef, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { AnswerValidation } from "@/lib/Validation";
import { z } from "zod";
import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "@/context/ThemeProvider";
import { Button } from "../ui/button";
import Image from "next/image";
import { QuestionId } from "@/lib/actions/shared.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAnswer } from "@/lib/actions/answer.action";
import { usePathname } from "next/navigation";
import { toast } from "../ui/use-toast";

interface Props extends QuestionId {
  type?: string;
  question: string;
  authorId: string;
  answerData?: string;
}

const Answer = ({
  type,
  question,
  questionId,
  authorId,
  answerData,
}: Props) => {
  const [isSubmitting, setisSubmitting] = useState(false);
  const [isSubmittingAi, setIsSubmittingAi] = useState<boolean>(false);
  const { mode } = useTheme();
  const editorRef = useRef(null);
  const pathname = usePathname();

  const form = useForm<z.infer<typeof AnswerValidation>>({
    resolver: zodResolver(AnswerValidation),
    defaultValues: {
      answer: "",
    },
  });

  async function onSubmit(values: z.infer<typeof AnswerValidation>) {
    setisSubmitting(true);
    try {
      await createAnswer({
        content: values.answer,
        author: JSON.parse(authorId),
        question: JSON.parse(questionId),
        path: pathname,
      });

      form.reset();

      if (editorRef.current != null) {
        // @ts-ignore
        editorRef.current.setContent("");
      }
    } catch (error) {
      toast({
        title: `Error ${type === "Edit" ? "editing" : "submitting"} answer ⚠️`,
        variant: "destructive",
      });
      console.log(error);
      throw error;
    } finally {
      setisSubmitting(false);

      toast({
        title: `Answer ${
          type === "Edit" ? "edited" : "submitted"
        } successfully 🎉`,
        variant: "default",
      });
    }
  }

  const generateAiAnswer = async () => {
    if (!authorId) return;

    setIsSubmittingAi(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/bard`,
        {
          method: "POST",
          body: JSON.stringify({ question }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const aiAnswer = await response.json();

      const formattedAiAnswer = aiAnswer.error
        ? "Sorry, I could not provide an answer to your question, please try again."
        : aiAnswer.text.replace(/\n/g, "<br />");

      if (editorRef.current) {
        const editor = editorRef.current as any;
        editor.setContent(formattedAiAnswer);
      }
    } catch (error) {
      console.error(error);
      // Handle errors here, e.g., show an error message
      toast({
        title: "Error generating AI answer ⚠️",
        variant: "destructive",
      });

      console.log(error);
      throw error;
    } finally {
      setIsSubmittingAi(false);

      toast({
        title: "AI answer generated successfully 🎉",
        variant: "default",
      });
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark400_light800">
          Write your answer here
        </h4>

        <Button
          className="btn light-border-2 gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-500"
          onClick={generateAiAnswer}
        >
          <Image
            src="/assets/icons/stars.svg"
            alt="star"
            width={12}
            height={12}
            className={`object-contain ${isSubmittingAi && "animate-pulse"}`}
          />
          {isSubmittingAi ? "Generating..." : "Generate AI Answer"}
        </Button>
      </div>

      <Form {...form}>
        <form
          className="mr-6 flex w-full flex-col gap-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3 ">
                <FormControl className="mt-3.5 ">
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API}
                    onInit={(evt, editor) => {
                      // @ts-ignore
                      editorRef.current = editor;
                    }}
                    init={{
                      menubar: false,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "codesample",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "wordcount",
                      ],
                      toolbar:
                        "undo redo | " +
                        "codesample | bold italic forecolor | alignleft aligncenter |" +
                        "alignright alignjustify | bullist numlist outdent indent",
                      content_style:
                        "body { font-family:Inter; font-size:16px }",
                      skin: mode === "dark" ? "oxide-dark" : "oxide",
                      content_css: mode === "dark" ? "dark" : "light",
                    }}
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
                  />
                </FormControl>

                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              className="primary-gradient w-fit text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Answer;
