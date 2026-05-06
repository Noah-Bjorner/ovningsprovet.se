import { MathReasoningTest } from "@/components/tests/math-reasoning-test";
import { QuestionTest } from "@/components/tests/question-test";

export default function TestsPage() {
  return (
    <main className="min-h-screen p-6 md:p-12">
      <div className="flex flex-col gap-4 max-w-2xl mx-auto bg-foreground rounded-xl p-12">
        <QuestionTest />
        <MathReasoningTest />
      </div>
    </main>
  );
}
