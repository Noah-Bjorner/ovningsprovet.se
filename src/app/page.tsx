import FeatureCarousel, { type FeatureSlide } from "@/components/landingPage/FeatureCarousel";
import AmbientGridBackground from "@/components/landingPage/AmbientGridBackground";
import Header from "@/components/landingPage/Header";
import InputContainer from "@/components/landingPage/InputContainer";
import SuggestionList from "@/components/landingPage/SuggestionList";

const featureSlides: FeatureSlide[] = [
  {
    id: "urls",
    title: "Turn any URL into audio",
    description: "Paste articles, blogs, or documentation and listen while you commute.",
    imageUrl: "https://static.listenlater.ai/random/asset-ex.png",
  },
  {
    id: "documents",
    title: "Upload your documents",
    description: "PDFs, Word docs, and more converted to natural-sounding audio.",
    imageUrl: "https://static.listenlater.ai/random/asset-ex.png",
  },
  {
    id: "prompts",
    title: "Generate from prompts",
    description: "Describe a topic and get a custom podcast-style audio summary.",
    imageUrl: "https://static.listenlater.ai/random/asset-ex.png",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-auto bg-background">
      <Header />
      <section className="relative isolate flex min-h-svh flex-col items-center overflow-hidden">
        <AmbientGridBackground />

        <div className="relative z-10 mt-40 mb-24 flex w-full flex-1 flex-col items-center justify-center gap-6 md:mt-24 md:mb-12">
          <div className="flex w-full max-w-2xl flex-col items-center gap-8 px-4 md:px-0">
            <div className="flex flex-col items-center gap-2">
              
              <div className="hidden md:flex mb-4 flex-row items-center justify-center gap-2 rounded-xl py-1.5 px-2.5">
                <p className="text-xs font-medium leading-none text-text">
                  Listen in your podcast app
                </p>
              </div>

              <h1 className="text-center font-sans text-4xl tracking-tight font-[450] text-text">
                What do you
                <br className="sm:hidden" /> want to study?
              </h1>

              <p className="w-4/5 text-center text-sm text-text-secondary">
                From articles to PDFs, turn anything you read into audio.
                Automatically added to your podcast app.
              </p>
            </div>

            <div className="flex w-full flex-col gap-4">
              <InputContainer />
              <SuggestionList />
            </div>
          </div>

        </div>

        <FeatureCarousel slides={featureSlides} className="relative z-10 pb-8 md:pb-6 md:mt-auto" />
      </section>
    </main>
  );
}
