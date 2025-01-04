"use client";
// inspired by tom is loading
import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { CustomLink } from "./custom-link";
interface Item {
  id: string;
  url?: string | null;
  title: string;
  email?: string | null;
  cv?: string | null;
}
function MansoryGrid({ items }: { items: Item[] }) {
  const [_, setSelected] = useState(null);

  return (
    <>
      <div className="container mx-auto p-1">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <>
            {items.map((item, index) => (
              <ImageItem
                key={item.id}
                item={item}
                index={index}
                setSelected={setSelected}
              />
            ))}
          </>
        </div>
      </div>
    </>
  );
}

interface ImageItemProps {
  item: Item;
  index: number | string;
  setSelected: any;
}

function ImageItem({ item, setSelected }: ImageItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.figure
      whileTap={{ scale: 0.9 }}
      initial="hidden"
      animate={isInView && "visible"}
      ref={ref}
      className="inline-block group w-full rounded-md  relative dark:bg-black bg-white overflow-hidden before:absolute before:top-0 before:content-[''] before:h-full before:w-full hover:before:bg-gradient-to-t dark:before:from-gray-900  before:from-gray-200/90 before:from-5% before:to-transparent before:to-90% cursor-pointer"
      onClick={() => setSelected(item)}
    >
      {item.url ? (
        <motion.img
          layoutId={`card-${item.id}`}
          whileHover={{ scale: 1.025 }}
          src={item.url}
          className="w-full bg-base-100 shadow-xl image-full cursor-pointer"
        />
      ) : (
        <motion.img
          layoutId={`card-${item.id}`}
          whileHover={{ scale: 1.025 }}
          src={"/images/unknown.png"}
          className="w-full bg-base-100 shadow-xl image-full cursor-pointer"
        />
      )}
      <div className="flex flex-col w-full mt-0 absolute bottom-0 left-0 p-2 group-hover:opacity-100 opacity-0 font-semibold ">
        <h1>{item.title}</h1>
        <div className="flex justify-between w-full">
          <Link
            href={`mailto:${item.email}`}
            className="text-primary-500 hover:text-primary-700"
          >
            {item.email}
          </Link>
          <CustomLink
            href={item.cv ?? "#"}
            download={item.cv}
            target="_blank"
            className="text-primary hover:text-primary/80 p-0 m-0"
          >
            cv
          </CustomLink>
        </div>
      </div>
    </motion.figure>
  );
}

export default MansoryGrid;
