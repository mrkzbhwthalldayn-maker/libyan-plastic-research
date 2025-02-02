import { AnimatedCard } from "@/components/animations";
import { Locale } from "@/i18n-config";
import { cn } from "@/lib/utils";

const FieldOfActivityCard = ({
  title,
  description,
  icon: Icon,
  lang,
  className,
}: FieldOfActivity & { lang: Locale; className?: string }) => {
  return (
    <AnimatedCard
      XorY="y"
      initialY={30}
      className={cn(
        `text-center transition-all
        md:w-11/12 duration-300 min-h-44 px-2 gap-4 text-base md:text-lg flex justify-center items-center flex-col  rounded-lg  hover:scale-105 py-5 md:py-8 bg-secondary`,
        className
      )}
    >
      <div className="bg-indigo-900 p-3 md:p-5 rounded-full">
        <Icon size={24} color="white" />
      </div>
      <div className="">
        <div>{lang === "en" ? title.en : title.ar}</div>
        <div className="text-base text-foreground/75">
          {lang === "en" ? description.en : description.ar}
        </div>
      </div>
    </AnimatedCard>
  );
};

export default FieldOfActivityCard;
