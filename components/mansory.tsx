"use client";
// inspired by tom is loading
import React, { useState } from "react";
import Link from "next/link";
import { CustomLink } from "./custom-link";
import Image from "next/image";
import { FacultyMember } from "@prisma/client";
import LangRenderer from "./lang";
import { IoCloudDownload } from "react-icons/io5";

function FacultyGrid({ members }: { members: FacultyMember[] }) {
  return (
    <>
      <div className="container mx-auto p-1">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <>
            {members.map((member, index) => (
              <CvCard {...member} key={index} />
            ))}
          </>
        </div>
      </div>
    </>
  );
}

function CvCard({ fullName, cv, specialization, picture }: FacultyMember) {
  return (
    <div className="bg-accent border border-foreground/20 shadow-lg rounded-lg overflow-hidden">
      <div className="overflow-hidden rounded-md h-56 w-full aspect-square">
        {picture ? (
          <Image
            width={400}
            height={400}
            src={picture}
            alt={`${fullName}-image`}
            className="w-full h-full object-cover"
          />
        ) : (
          <Image
            width={400}
            height={400}
            src={"/images/default_image.png"}
            alt={`${fullName}-image`}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <br />
      <div className="p-4 grid gap-2">
        <h3>{fullName}</h3>
        <p>{specialization ?? "لا يوجد بيانات"}</p>
        {cv && (
          <CustomLink
            target="_blank"
            className="gap-2"
            variant={"default"}
            href={cv}
          >
            <LangRenderer ar="السيرة الذاتية" en="CV" />
            <IoCloudDownload size={18} />
          </CustomLink>
        )}
      </div>
    </div>
  );
}

export default FacultyGrid;
