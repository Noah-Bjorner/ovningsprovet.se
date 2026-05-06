import { QuestionAnswerCard } from "@/components/tests/question-answer-card";
import { getPracticeSet } from "@/data/practice-sets";
import { testQuestions, type TestQuestion } from "@/data/test-questions";

type TestPageProps = {
  params: Promise<{
    SLUG: string;
  }>;
};

type TestQuestionNavigationProps = {
  activeQuestionIndex: number;
  description: string;
  questions: TestQuestion[];
  title: string;
};

type TestQuestionWorkspaceProps = {
  questions: TestQuestion[];
};

function TestQuestionNavigation({
  activeQuestionIndex,
  description,
  questions,
  title,
}: TestQuestionNavigationProps) {
  const activeQuestion = questions[activeQuestionIndex];

  return (
    <aside className="rounded-xl bg-background p-6 md:p-8 lg:sticky lg:top-8 lg:self-start">
      <h1 className="text-4xl tracking-tight leading-tight text-text">{title}</h1>
      <p className="mt-4 text-sm leading-6 text-text-secondary">{description}</p>

      <nav aria-label="Questions" className="mt-10">
        <ol className="space-y-5 border-l-4 border-border pl-7">
          {questions.map((question, index) => {
            const isActive = index === activeQuestionIndex;

            return (
              <li className="relative" key={question.id}>
                <a
                  aria-current={isActive ? "step" : undefined}
                  className={`block transition hover:text-text ${
                    isActive ? "text-text" : "text-text-tertiary"
                  }`}
                  href={`#${question.id}`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute -left-8 top-1 h-8 w-1 rounded-full ${
                      isActive ? "bg-text" : "bg-transparent"
                    }`}
                  />
                  <span className="text-sm font-medium">
                    {index + 1}. {question.title}
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-text-tertiary">
                    {question.description}
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </aside>
  );
}

function TestQuestionWorkspace({ questions }: TestQuestionWorkspaceProps) {
  return (
    <section className="min-w-0 space-y-6 rounded-xl">
      {questions.map((question, index) => (
        <QuestionAnswerCard
          key={question.id}
          question={question}
          questionNumber={index + 1}
          totalQuestions={questions.length}
        />
      ))}
    </section>
  );
}

export default async function TestPage({ params }: TestPageProps) {
  const { SLUG } = await params;
  const practiceSet = getPracticeSet(SLUG);
  const activeQuestionIndex = 0;

  return (
    <main className="min-h-screen p-6 md:p-12">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[minmax(240px,320px)_minmax(0,1fr)]">
        <TestQuestionNavigation
          activeQuestionIndex={activeQuestionIndex}
          description={practiceSet.description}
          questions={testQuestions}
          title={practiceSet.title}
        />
        <TestQuestionWorkspace
          questions={testQuestions}
        />
      </div>
    </main>
  );
}
