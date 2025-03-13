"use client";
import React, { ReactNode } from "react";
import { EmblaOptionsType } from "embla-carousel";
import { DotButton, useDotButton } from "./embla-carousel-dot-button";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./embla-carousel-arrow-buttons";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";
import { CustomLink } from "../custom-link";
import { useParams } from "next/navigation";
import LangRenderer from "../lang";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
  children?: ReactNode[];
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options, children } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, onDotButtonClick } = useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);
  const { lang } = useParams();

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container phone-only:px-4">
          {children?.map((child, index) => (
            <div className="embla__slide" key={index}>
              <div className="min-h-max h-full">{child}</div>
            </div>
          ))}
          <div className="embla__slide">
            <div className="content-center min-h-full text-center flex justify-center items-center">
              <CustomLink href={`/${lang}/articles`} variant={"default"}>
                <LangRenderer ar={"كل المقالات"} en={"All Articles"} />
                {lang === "en" ? (
                  <FaLongArrowAltRight className="inline-block ml-2" />
                ) : (
                  <FaLongArrowAltLeft className="inline-block mr-2" />
                )}
              </CustomLink>
            </div>
          </div>
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__dots px-4">
          {[...slides, slides.length + 1]?.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={cn(index === selectedIndex && "text-foreground")}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
