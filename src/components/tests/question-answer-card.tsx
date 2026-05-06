import { MathReasoning } from "@/components/answer/math-reasoning";
import { Question } from "@/components/practice/question";
import type { TestQuestion } from "@/data/test-questions";

type QuestionAnswerCardProps = {
  question: TestQuestion;
  questionNumber: number;
  totalQuestions: number;
};

export function QuestionAnswerCard({
  question,
  questionNumber,
  totalQuestions,
}: QuestionAnswerCardProps) {
  return (
    <section aria-label={question.title} id={question.id} className="space-y-4">
      <div className="rounded-xl bg-foreground p-6 md:p-8">
        <Question
          content={question.content}
          eyebrow={`Question ${questionNumber} of ${totalQuestions}`}
        />
        <MathReasoning />
      </div>
    </section>
  );
}
