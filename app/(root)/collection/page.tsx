import HomeFilter from "@/components/Home/HomeFilter";
import QuestionCard from "@/components/card/QuestionCard";
import Custom_pagination from "@/components/shared/Custom_pagination";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchBar from "@/components/shared/Search/LocalSearchBar";
import { Button } from "@/components/ui/button";
import { HomePageFilters, QuestionFilters } from "@/constants/filters";
import { GetQuestion } from "@/lib/actions/Question.action";
import { GetSavedQuestion, getUserById } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collection — DevOverflow",
};

export default async function Home({ searchParams }: SearchParamsProps) {
  const { userId } = auth();
  if (!userId) return null;

  const mongoUser = await getUserById({
    userId,
  });
  if (!mongoUser?.onboarded) redirect("/onboarding");

  const result = await GetSavedQuestion({
    clerkId: userId,
    searchQuery: searchParams.q,
    page: searchParams.page ? +searchParams.page : 1,
    filter: searchParams.filter,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/collection"
          placeholder="Search for questions"
          iconPostition="left"
          imgsrc="/assets/icons/search.svg"
          otherClass="flex-1"
        />
        <Filter
          filters={QuestionFilters}
          otherClass="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {result.question.length > 0 ? (
          result.question.map((question: any) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There`s no saved question  to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>

      <div className="mt-10">
        <Custom_pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
        />
      </div>
    </>
  );
}
