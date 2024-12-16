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

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
  children?: ReactNode[];
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options, children } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

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
        <div className="embla__container">
          {children?.map((child, index) => (
            <div className="embla__slide" key={index}>
              <div className="min-h-max h-full">{child}</div>
            </div>
          ))}
          <div className="embla__slide">
            <div className="min-h-max shadow-sm rounded-md h-full w-full bg-secondary content-center text-center">
              <CustomLink href={`/${lang}/Articles`} variant={"link"}>
                <LangRenderer ar={"كل المقالات"} en={"All Articles"} />
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
