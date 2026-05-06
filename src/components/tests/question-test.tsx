import { Question } from "@/components/practice/question";
import { testQuestions, type TestQuestion } from "@/data/test-questions";

type QuestionTestProps = {
  question?: TestQuestion;
};

export function QuestionTest({ question = testQuestions[3] }: QuestionTestProps) {
  return (
    <section className="space-y-8" aria-label="Question test">
      <Question
        content={question.content}
        eyebrow="Question test"
        title={question.title}
      />
    </section>
  );
}
