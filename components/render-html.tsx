import { cn } from "@/lib/utils";
import * as cheerio from "cheerio";

interface Props {
  html: string;
  className?: string;
}

function wrapImagesInDiv(html: string): string {
  const cheerioApi = cheerio.load(html, {}, false);

  cheerioApi("img").each((_, img) => {
    const selectedImg = cheerioApi(img);
    // console.log(selectedImg.attr("src"));

    // Add lazy loading
    selectedImg.attr("loading", "lazy");
    // Add custom class
    const existingClass = selectedImg.attr("class") || "";
    selectedImg.attr(
      "class",
      `${existingClass} rounded-md customImage w-full h-full`
    );

    // Set default alt if missing
    if (!selectedImg.attr("alt")) {
      selectedImg.attr("alt", `Image_${_}`);
    }

    const imageWrapper = cheerioApi(
      `<div class="rounded-lg shadow-md my-4 max-w-full bg-transparent w-full overflow-hidden phone-only:max-w-sm h-full">${selectedImg}</div>`
    );
    selectedImg.replaceWith(imageWrapper);
    // selectedImg.replaceWith(imageWrapper.append(selectedImg));
  });

  cheerioApi("table").each((_, table) => {
    const selectedTable = cheerioApi(table);
    const tableWrapper = cheerioApi('<div class="tableWrapper"></div>');
    selectedTable.replaceWith(tableWrapper.append(selectedTable));
  });
  // console.log("💥 Final wrapped HTML:\n", cheerioApi.html());

  return cheerioApi.html();
}

const RenderHtml = ({ html, className }: Props) => {
  // console.log(`old html: ${html}`);
  return (
    <div
      className={cn("ProseMirror tiptap rounded-lg max-w-full", className)}
      dangerouslySetInnerHTML={{
        __html: wrapImagesInDiv(html),
      }}
    />
  );
};

export default RenderHtml;
// function wrapTablesAndImages(html: string): string {
//   let updatedHtml = html;

//   // Wrap <table> elements
//   updatedHtml = updatedHtml.replace(
//     /<table([\s\S]*?)<\/table>/gi,
//     (match) => `<div class="tableWrapper">${match}</div>`
//   );

//   // Group only two or more consecutive <img> elements
//   updatedHtml = updatedHtml.replace(/(<img[\s\S]*?>\s*){2,}/gi, (match) => {
//     // Extract all <img> tags and apply custom styling
//     const images =
//       match
//         .match(/<img[\s\S]*?>/g) // Extract individual <img> tags
//         ?.map((img) =>
//           img.replace(
//             /<img([\s\S]*?)>/,
//             `<img class="customImage rounded-lg shadow-md max-w-full w-full h-full" loading="lazy" />`
//           )
//         )
//         .join("") || "";

//     return `<div class="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 my-4">${images}</div>`;
//   });

//   return updatedHtml;
// }
