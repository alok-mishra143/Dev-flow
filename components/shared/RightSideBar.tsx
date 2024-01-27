import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTag from "./RenderTag";
import { getHotQuestions } from "@/lib/actions/Question.action";
import { getTopPopularTags } from "@/lib/actions/tag.action";
// const HotQuestion = [
//   {
//     _id: "1",
//     title: "Async/Await Function Not Handling Errors Properly",
//   },
//   {
//     _id: "2",
//     title: "2Async/Await Function Not Handling Errors Properly",
//   },
//   {
//     _id: "3",
//     title: "3Async/Await Function Not Handling Errors Properly",
//   },
//   {
//     _id: "4",
//     title: "4Async/Await Function Not Handling Errors Properly",
//   },
// ];

// const populatTag = [
//   {
//     _id: "1",
//     name: "java",
//     total: 1,
//   },
//   {
//     _id: "2",
//     name: "javaScript",
//     total: 5,
//   },
//   {
//     _id: "3",
//     name: "python",
//     total: 4,
//   },
// ];
const RightSideBar = async () => {
  const hotQuestions = await getHotQuestions();
  const popularTags = await getTopPopularTags();
  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden lg:w-[350px]">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top question</h3>

        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQuestions.map((question: any) => (
            <Link
              href={`/question/${question._id}`}
              key={question._id}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700">
                {question.title}
              </p>
              <Image
                src="/assets/icons/chevron-right.svg"
                alt="chevron right"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-7 flex w-full flex-col gap-[30px]">
        <h3 className="h3-bold text-dark200_light900">Top question</h3>

        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map((tag) => {
            return (
              <RenderTag
                key={tag._id}
                _id={tag._id}
                name={tag.name}
                total={tag.numberOfQuestions}
                showcnt={true}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RightSideBar;
