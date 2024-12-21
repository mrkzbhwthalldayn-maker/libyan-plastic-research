import SearchInput from "@/components/search";
import { Locale } from "@/i18n-config";
import React from "react";

// Define types for centerData structure
interface CenterItem {
  title: string;
  description: string;
  link: string;
}

interface CenterData {
  about: CenterItem;
  goals: CenterItem[];
  hopes: CenterItem;
  organizational_structure: CenterItem[];
  scientific_and_technical_consultations: CenterItem[];
  scientific_events: CenterItem[];
  labs: CenterItem[];
  partners: CenterItem[];
}

// Define the structure of the data
const centerData: CenterData = {
  about: {
    title:
      "التعريف بالمركز الليبي لبحوث اللدائن | Introduction to the Libyan Polymer Research Center",
    description:
      "هو مؤسسة علمية متخصصة في بحوث وتقنية البوليمرات (اللدائن)... | A scientific institution specializing in polymer (plastic) research and technology...",
    link: "/about",
  },
  goals: [
    {
      title: "إعداد الكوادر الوطنية...",
      description:
        "Prepare national cadres in the field of polymer material technology.",
      link: "/goals#goal-0",
    },
    {
      title: "إجراء التحاليل الفيزيائية...",
      description:
        "Conduct physical, chemical, and mechanical analysis of plastic materials.",
      link: "/goals#goal-1",
    },
  ],
  hopes: {
    title: "رؤيتنا و مُهمتنا | Our Mission And Vision",
    description:
      "أن نكون مركزاً بحثياً... | To be a distinguished research center... | نشر بحوث ودراسات... | To publish scientific research and studies...",
    link: "/hopes",
  },
  organizational_structure: [
    {
      title: "مدير عام المركز | General Director",
      description:
        "المسؤول عن الإدارة... | Responsible for the overall management...",
      link: "/organizational-structure#item-0",
    },
  ],
  scientific_and_technical_consultations: [
    {
      title: "الجهات القضائية (النيابة العامة)...",
      description: "Judicial authorities (Public Prosecution)",
      link: "/consultations#consultation-0",
    },
  ],
  scientific_events: [
    {
      title: "Conferences",
      description: "Number of conferences: 2",
      link: "/scientific-events#conferences",
    },
    {
      title: "Workshops",
      description: "Number of workshops: 34",
      link: "/scientific-events#workshops",
    },
  ],
  labs: [
    {
      title: "مختبر كيمياء البوليمر | Polymer Chemistry Lab",
      description:
        "مختبر متخصص... | A specialized lab conducting classical chemical experiments...",
      link: "/labs/polymer-chemistry-lab",
    },
  ],
  partners: [
    {
      title: "شركة تكنوبل...",
      description: "Technobell Slovenia for GRP Pipes Manufacturing",
      link: "/partners#partner-0",
    },
  ],
};

// Define the type for search results
type SearchResult = CenterItem;

// Function to search data
function searchCenterData(query: string): SearchResult[] {
  if (typeof query !== "string" || !query.trim()) {
    throw new Error("Query must be a non-empty string.");
  }

  const results: SearchResult[] = [];
  const addResult = (
    title: string,
    description: string,
    link: string
  ): void => {
    results.push({ title, description, link });
  };

  // Search "about"
  if (
    centerData.about.title.includes(query) ||
    centerData.about.description.includes(query)
  ) {
    addResult(
      centerData.about.title,
      centerData.about.description,
      centerData.about.link
    );
  }

  // Search "goals"
  centerData.goals.forEach((goal) => {
    if (goal.title.includes(query) || goal.description.includes(query)) {
      addResult(goal.title, goal.description, goal.link);
    }
  });

  // Search "hopes"
  if (
    centerData.hopes.title.includes(query) ||
    centerData.hopes.description.includes(query)
  ) {
    addResult(
      centerData.hopes.title,
      centerData.hopes.description,
      centerData.hopes.link
    );
  }

  // Search "organizational_structure"
  centerData.organizational_structure.forEach((item) => {
    if (item.title.includes(query) || item.description.includes(query)) {
      addResult(item.title, item.description, item.link);
    }
  });

  // Search "scientific_and_technical_consultations"
  centerData.scientific_and_technical_consultations.forEach((consultation) => {
    if (
      consultation.title.includes(query) ||
      consultation.description.includes(query)
    ) {
      addResult(
        consultation.title,
        consultation.description,
        consultation.link
      );
    }
  });

  // Search "labs"
  centerData.labs.forEach((lab) => {
    if (lab.title.includes(query) || lab.description.includes(query)) {
      addResult(lab.title, lab.description, lab.link);
    }
  });

  // Search "partners"
  centerData.partners.forEach((partner) => {
    if (partner.title.includes(query) || partner.description.includes(query)) {
      addResult(partner.title, partner.description, partner.link);
    }
  });

  return results;
}

// Example Usage
const query = "البوليمر"; // Search term in Arabic or English
// try {
//   const searchResults = searchCenterData(query);
//   console.log(searchResults);
// } catch (error) {
//   console.error(error.message);
// }

const SearchPage = async ({
  searchParams,
  params,
}: {
  searchParams?: Promise<{
    query?: string;
  }>;
  params: Promise<{
    lang: Locale;
  }>;
}) => {
  const lang = (await params).lang;
  const searchParam = await searchParams;
  const searchResults = searchCenterData(query);
  console.log(searchResults);
  // const searchResults = queryObject(data, searchParam?.query ?? "");

  return (
    <main className="p-4">
      <SearchInput
        query={"query"}
        placeholder={lang === "en" ? "search here ..." : "ابحث هنا ..."}
      />
      <h1>
        {lang === "en" ? "Search Results" : "نتائج البحث"}
        {"  "}
        {/* {searchResults.length} */}
      </h1>

      {/* {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((result, index) => (
            <li key={index}>
              <strong>Path:</strong> {result.path}
              <br />
              <strong>Value:</strong>{" "}
              {typeof result.value === "string" ? (
                result.value
              ) : (
                <pre>{JSON.stringify(result.value, null, 2)}</pre>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No matches found for the term.</p>
      )} */}
    </main>
  );
};

export default SearchPage;
