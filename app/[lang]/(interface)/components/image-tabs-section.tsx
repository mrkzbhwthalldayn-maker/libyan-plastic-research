"use client";
import React, { Fragment, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useParams } from "next/navigation";
interface Tab {
  question: {
    ar: string;
    en: string;
  };
  answer: {
    ar: string;
    en: string;
  };
  imageUrl: string;
}

const tabs: Tab[] = [
  {
    question: {
      ar: "ما هي أهداف المركز؟",
      en: "What are the goals of the center?",
    },
    answer: {
      ar: "إعداد الكوادر الوطنية وإجراء البحوث التقنية.",
      en: "To prepare national cadres and conduct technical research.",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1709949908058-a08659bfa922?q=80&w=1200&auto=format",
  },
  {
    question: {
      ar: "ما هي مجالات نشاطات المركز؟",
      en: "What are the center's fields of activity?",
    },
    answer: {
      ar: "البحث العلمي، التعليم، الاستشارات، التوعية.",
      en: "Scientific research, education, consultancy, and awareness.",
    },
    imageUrl: "/images/q_a/q_a1.jpg",
  },
  {
    question: {
      ar: "لماذا يعتبر مركز بحوث اللدائن مهماً؟",
      en: "Why is the Polymer Research Center important?",
    },
    answer: {
      ar: "لأنه يساهم في تطوير تقنيات اللدائن، ودعم الاقتصاد المحلي، وحماية البيئة.",
      en: "It contributes to advancing polymer technology, supporting the local economy, and protecting the environment.",
    },
    imageUrl: "/images/q_a/q_a2.jpg",
  },
];

function ImageTabSection() {
  const { lang } = useParams();
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const handleClick = async (index: number) => {
    setActiveIndex(activeIndex === index ? index : index);
  };
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <>
      <div className=" md:grid grid-cols-12 p-2 items-center justify-center w-full h-full">
        <div className="rounded-sm   col-span-5">
          {tabs.map((tab, index) => (
            <motion.div
              key={index}
              className={`rounded-lg overflow-hidden mb-2  ${
                activeIndex === index
                  ? "active border-2 dark:border-[#656fe2]  border-[#F2F2F2] dark:bg-[#E0ECFB] bg-[#F2F2F2]"
                  : "bg-transparent border-2 dark:hover:border-[#656fe2]"
              }
            `}
              onClick={() => handleClick(index)}
            >
              <h3
                className={`p-4 cursor-pointer transition-all font-semibold    dark:text-white text-black dark:hover:bg-[#1e2a78] hover:bg-[#F2F2F2] dark:hover:text-white hover:text-black flex justify-between items-center ${
                  activeIndex === index
                    ? "active  dark:bg-[#1e2a78] bg-[#F2F2F2] "
                    : "dark:bg-[#11112b] bg-white"
                }
               `}
              >
                {lang === "en" ? tab.question.en : tab.question.ar}
              </h3>
              <AnimatePresence mode="sync">
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut",
                      delay: 0.14,
                    }}
                  >
                    <p className={`dark:bg-white bg-[#F2F2F2] text-black p-3`}>
                      {lang === "en" ? tab.answer.en : tab.answer.ar}
                    </p>
                    <img
                      src={tab.imageUrl}
                      alt={tab.answer.en}
                      className="mb-2 max-w-full h-full md:hidden block  rounded-md object-cover"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        <>
          {isDesktop &&
            tabs.map((tab, index) => {
              return (
                <Fragment key={index}>
                  <AnimatePresence mode="popLayout">
                    {activeIndex === index && (
                      <motion.div className="p-4 h-[400px] overflow-hidden col-span-7">
                        <motion.img
                          src={tab.imageUrl}
                          alt={tab.answer.en}
                          className="mb-2 max-w-full h-full  rounded-md object-cover"
                          width={800}
                          initial={{ opacity: 0, overflow: "hidden" }}
                          animate={{ opacity: 1, overflow: "hidden" }}
                          exit={{ opacity: 0, overflow: "hidden" }}
                          transition={{
                            duration: 0.4,
                            delay: 0.2,
                          }}
                          height={800}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Fragment>
              );
            })}
        </>
      </div>
    </>
  );
}

export default ImageTabSection;
