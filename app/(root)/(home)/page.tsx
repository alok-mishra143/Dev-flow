import HomeFilter from "@/components/Home/HomeFilter";
import QuestionCard from "@/components/card/QuestionCard";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Custom_pagination";
import LocalSearchBar from "@/components/shared/Search/LocalSearchBar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import { GetQuestion } from "@/lib/actions/Question.action";
import { SearchParamsProps } from "@/types";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Custom_pagination from "@/components/shared/Custom_pagination";

export default async function Home({ searchParams }: SearchParamsProps) {
  const result = await GetQuestion({
    searchQuery: searchParams.q,
    page: searchParams.page ? +searchParams.page : 1,

    filter: searchParams.filter,
  });

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href={"/ask-question"} className="flex justify-end max:sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask question
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/"
          placeholder="Search for questions"
          iconPostition="left"
          imgsrc="/assets/icons/search.svg"
          otherClass="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClass="min-h-[56px] sm:min-w-[170px]"
          containerClass="hidden max-md:flex"
        />
      </div>
      <HomeFilter />

      <div className="mt-10 flex w-full flex-col gap-6">
        {result.question.length > 0 ? (
          result.question.map((question) => (
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
            title="There`s no question to show"
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
