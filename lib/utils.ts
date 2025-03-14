import { ArticleType } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Validates a phone number to ensure it starts with one of the specified prefixes
 * (092, 091, 094, or 093) and is exactly 10 digits long.
 *
 * @param {string} phoneNumber - The phone number to validate.
 * @returns {boolean} `true` if the phone number is valid, `false` otherwise.
 *
 * @example
 * // Returns true
 * isValidPhoneNumber('0921234567');
 *
 * @example
 * // Returns false
 * isValidPhoneNumber('0891234567');
 */
export function isValidPhoneNumber(phoneNumber: string): boolean {
  const pattern = /^(092|091|094|093|92|91|94|93)\d{7}$/;
  return pattern.test(phoneNumber);
}

export const getArticleUrlSegment = (type: ArticleType): string => {
  switch (type) {
    case "research":
      return "research-and-studies";
    case "news":
    case "conference":
      return "news-and-activities";
    case "article":
      return "articles";
    default:
      return "articles"; // Default fallback
  }
};
