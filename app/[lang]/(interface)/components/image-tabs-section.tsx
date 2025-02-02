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

const tabs = [
  {
    question: {
      ar: "ما هي أهداف المركز؟",
      en: "What are the goals of the center?",
    },
    answer: {
      ar: "إعداد الكوادر - نقل التقنية - مطابقة المنتجات البلاستيكية للمواصفات المعمول بها - إجراء وتنفيذ البحوث العلمية - تقديم الاستشارات العلمية الفنية.",
      en: "Preparing cadres, transferring technology, ensuring conformity of plastic products to applicable standards, conducting and implementing scientific research, and providing scientific and technical consultations.",
    },
    imageUrl: "/images/q_a/q_a3.jpg",
  },
  {
    question: {
      ar: "ما هي مجالات عمل المركز؟",
      en: "What are the center's fields of activity?",
    },
    answer: {
      ar: "البحوث العلمية - الاستشارات العلمية والفنية - التوعية – خدمة المجتمع المحلي.",
      en: "Scientific research, scientific and technical consultations, awareness, and serving the local community.",
    },
    imageUrl: "/images/q_a/q_a1.jpg",
  },
  {
    question: {
      ar: "لماذا المركز الليبي لبحوث اللدائن؟",
      en: "Why is the Libyan Center for Polymer Research important?",
    },
    answer: {
      ar: "الاستفادة من الموارد المحلية – دعم المصنعيين والموردين – تطوير المنتج المحلي - تقييم المنتجات الموجودة بالسوق المحلي – التوعية البيئية.",
      en: "Utilizing local resources, supporting manufacturers and suppliers, developing local products, evaluating products in the local market, and promoting environmental awareness.",
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
