import { Locale } from "@/i18n-config";

const FieldOfActivityCard = ({
  title,
  description,
  icon: Icon,
  lang,
}: FieldOfActivity & { lang: Locale }) => {
  return (
    <div
      className="text-center transition-all
        md:w-11/12 duration-300 min-h-44 gap-4 text-base md:text-lg flex justify-center items-center flex-col bg-card hover:bg-card/80 rounded-lg shadow-md hover:scale-105 py-5 md:py-8"
    >
      <div className="bg-primary/60 p-3 md:p-5 rounded-full">
        <Icon size={24} color="white" />
      </div>
      <div className="">
        <div>{lang === "en" ? title.en : title.ar}</div>
        <div className="text-base text-foreground/75">
          {lang === "en" ? description.en : description.ar}
        </div>
      </div>
    </div>
  );
};

export default FieldOfActivityCard;
