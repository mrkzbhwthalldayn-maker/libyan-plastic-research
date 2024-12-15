"use client"; // Ensures this component is client-side

import { Swiper, SwiperSlide, SwiperSlideProps } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import { CustomLink } from "../custom-link";
import { useParams } from "next/navigation";
import { PiNewspaperBold } from "react-icons/pi";
import LangRenderer from "../lang";
import { GiArchiveResearch } from "react-icons/gi";

const Carousel = () => {
  const { lang } = useParams();
  return (
    <Swiper
      spaceBetween={0}
      centeredSlides={true}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      pagination={{
        clickable: true,
      }}
      loop
      draggable
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper text-white select-none"
    >
      {/* slide 1 */}
      <SwiperSlide>
        <ReusableSwiperSlide
          image={"/images/polymer-1.png"}
          alt={"polymer-1.png"}
          title={{
            ar: "المركز الليبي لبحوث اللدائن",
            en: `Libyan Center for Plastic Research`,
          }}
          description={{
            ar: ` هو مؤسسة علمية متخصصة في بحوث وتقنية البوليمرات (اللدائن)،
                    تم انشاؤه بقرار رقم 625 لسنة 1999م كمركز بحثي متخصص يهــدف
                    إلى تحقيق نهضة تقنية وعلمية شــاملة في مجـال تقنية
                    البوليميرات وتطبيقاتها في مختلف الأوجه ذات العــلاقة
                    المبـاشرة بالقطـاعات الإنتـــاجية والخــدمـــية والـمراكـــز
                    البحـثية المتخصصة والجامعات.`,
            en: `A scientific institution specializing in research and
                    technology related to polymers (plastics). It was
                    established by Decision No. 625 of 1999 as a specialized
                    research center aimed at achieving a comprehensive
                    technological and scientific advancement in the field of
                    polymer technology and its applications in various areas
                    directly related to production and service sectors,
                    specialized research centers, and universities.`,
          }}
          links={[
            {
              href: `/${lang}/#news`,
              text: {
                ar: `اخر الأخبار`,
                en: "Latest News",
              },
            },
            {
              href: `/${lang}/#researches`,
              text: {
                ar: `اخر البحوث`,
                en: "Latest Researches",
              },
            },
          ]}
        />
      </SwiperSlide>
      {/* slide 2 */}
      <SwiperSlide>
        <ReusableSwiperSlide
          image={"/images/polymer-2.png"}
          alt={"polymer-2.png"}
          title={{
            ar: "ريادة في أبحاث اللدائن",
            en: `Pioneering Research in Polymers`,
          }}
          description={{
            ar: `نحن نقود أبحاثًا مبتكرة في تقنيات اللدائن، باستخدام مختبرات
                    وأدوات متقدمة لدفع حدود العلوم والاستدامة.`,
            en: `We lead innovative research in polymer technology, utilizing
                    advanced labs and tools to push boundaries in science and
                    sustainability.`,
          }}
          links={[
            {
              href: `/${lang}/#labs`,
              text: {
                ar: `اكتشف مختبراتنا`,
                en: "Explore Our Labs",
              },
            },
            {
              href: `/${lang}/#goals`,
              text: {
                ar: `أهدافنا`,
                en: "Our Goals",
              },
            },
          ]}
        />
      </SwiperSlide>
      {/* slide 3 */}
      <SwiperSlide>
        <ReusableSwiperSlide
          image={"/images/polymer-3.png"}
          alt={"polymer-3.png"}
          title={{
            ar: "رؤية للابتكار والاستدامة",
            en: `A Vision for Innovation & Sustainability`,
          }}
          description={{
            ar: `مهمتنا هي تعزيز علم البوليمرات مع حماية البيئة وتحسين الصحة
                    العامة من خلال الابتكار المستدام.`,
            en: `Our mission is to advance polymer science while protecting
                    the environment and enhancing public health through
                    sustainable innovation.`,
          }}
          links={[
            {
              href: `/${lang}/#vision`,
              text: {
                ar: `تعرف على رؤيتنا`,
                en: "Learn About Our Vision",
              },
            },
            {
              href: `/${lang}/#achievements`,
              text: {
                ar: `إنجازاتنا`,
                en: "Our Achievements",
              },
            },
          ]}
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default Carousel;

type SlideProps = {
  image: string;
  alt: string;
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  links: {
    href: string;
    text: { ar: string; en: string };
  }[];
};

const ReusableSwiperSlide = ({
  image,
  alt,
  title,
  description,
  links,
}: SlideProps) => {
  return (
    <SwiperSlide className="min-h-[90vh] relative flex items-center justify-center bg-secondary/50">
      <div className="h-[90vh] w-full overflow-hidden relative">
        <Image
          src={image}
          alt={alt}
          width={1000}
          height={1000}
          priority
          className="w-full h-full object-cover"
        />
        <div className="w-full h-full absolute bg-black/60 top-0 right-0 z-10 text-center content-center">
          <LangRenderer
            ar={
              <div className="container phone-only:h-full grid gap-5 md:gap-10 phone-only:flex flex-col items-center justify-around relative z-50">
                <h1 className="text-2xl md:text-6xl text-primary font-extrabold">
                  {title.ar}
                </h1>
                <p className="md:text-xl">{description.ar}</p>
                <div className="w-fit mx-auto flex justify-center items-center gap-5 phone-only:gap-1 phone-only:flex-col   phone-only:w-full">
                  {links.map((link, index) => (
                    <CustomLink
                      key={index}
                      href={link.href}
                      className=""
                      size={"lg"}
                    >
                      <span>{link.text.ar}</span>
                    </CustomLink>
                  ))}
                </div>
              </div>
            }
            en={
              <div className="container phone-only:h-full grid gap-5 md:gap-10 relative z-50 phone-only:flex flex-col items-center justify-around">
                <h1 className="text-2xl md:text-6xl text-primary font-extrabold">
                  {title.en}
                </h1>
                <p className="md:text-xl">{description.en}</p>
                <div className="w-fit mx-auto flex justify-center items-center gap-5 phone-only:gap-1 phone-only:flex-col   phone-only:w-full">
                  {links.map((link, index) => (
                    <CustomLink
                      key={index}
                      href={link.href}
                      className="phone-only:w-full"
                      size={"lg"}
                    >
                      <span>{link.text.en}</span>
                    </CustomLink>
                  ))}
                </div>
              </div>
            }
          />
        </div>
      </div>
    </SwiperSlide>
  );
};
