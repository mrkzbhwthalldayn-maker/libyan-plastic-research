"use client"; // Ensures this component is client-side

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
const Carousel = () => (
  <Swiper
    spaceBetween={30}
    centeredSlides={true}
    autoplay={{
      delay: 4000,
      disableOnInteraction: false,
    }}
    pagination={{
      clickable: true,
    }}
    loop
    navigation={true}
    modules={[Autoplay, Pagination, Navigation]}
    className="mySwiper text-white"
  >
    <SwiperSlide className="min-h-[90vh] relative flex items-center justify-center bg-red-500">
      <div className="h-[90vh] w-full overflow-hidden relative">
        <Image
          src={"/images/polymer-1.png"}
          alt="polymer-1.png"
          width={1000}
          height={1000}
          priority
          className="w-full h-full object-cover"
        />
        <div className="w-full h-full absolute bg-black/60 top-0 right-0 z-10 text-center content-center">
          <div className="container grid gap-3 relative z-50">
            <h1 className="text-2xl md:text-6xl text-primary mb-10 font-extrabold">
              المركز الليبي لبحوث اللدائن
            </h1>
            <p>
              هو مؤسسة علمية متخصصة في بحوث وتقنية البوليمرات (اللدائن)، تم
              انشاؤه بقرار رقم 625 لسنة 1999م كمركز بحثي متخصص يهــدف إلى تحقيق
              نهضة تقنية وعلمية شــاملة في مجـال تقنية البوليميرات وتطبيقاتها في
              مختلف الأوجه ذات العــلاقة المبـاشرة بالقطـاعات الإنتـــاجية
              والخــدمـــية والـمراكـــز البحـثية المتخصصة والجامعات.
            </p>
          </div>
        </div>
      </div>
    </SwiperSlide>
    <SwiperSlide className="min-h-[90vh] flex items-center justify-center bg-blue-500">
      <div className="h-[90vh] w-full overflow-hidden relative">
        <Image
          src={"/images/polymer-2.png"}
          alt="polymer-1.png"
          width={1000}
          height={1000}
          priority
          className="w-full h-full object-cover"
        />
        <div className="w-full h-full absolute bg-black/60 top-0 right-0 z-10 "></div>
      </div>
    </SwiperSlide>
    <SwiperSlide className="min-h-[90vh] flex items-center justify-center bg-green-500">
      <div className="h-[90vh] w-full overflow-hidden relative">
        <Image
          src={"/images/polymer-3.png"}
          alt="polymer-1.png"
          width={1000}
          height={1000}
          priority
          className="w-full h-full object-cover"
        />
        <div className="w-full h-full absolute bg-black/60 top-0 right-0 z-10 "></div>
      </div>{" "}
    </SwiperSlide>
  </Swiper>
);

export default Carousel;
