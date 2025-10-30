import fs from "fs";
import path from "path";
import matter from "gray-matter";

const editionsDirectory = path.join(process.cwd(), "app/content/editions");

export interface Edition {
  number: number;
  title: string;
  description: string;
  date: string;
  slug: string;
  readingTime: string;
  topics: string[];
  published: boolean;
  content: string;
}

export function getAllEditions(): Edition[] {
  const fileNames = fs.readdirSync(editionsDirectory);
  const editions = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(editionsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        number: data.number,
        title: data.title,
        description: data.description,
        date: data.date,
        slug: data.slug || slug,
        readingTime: data.readingTime,
        topics: data.topics || [],
        published: data.published !== false,
        content,
      };
    })
    .filter((edition) => edition.published)
    .sort((a, b) => b.number - a.number); // Sort by edition number, newest first

  return editions;
}

export function getEditionBySlug(slug: string): Edition | null {
  try {
    const fullPath = path.join(editionsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      number: data.number,
      title: data.title,
      description: data.description,
      date: data.date,
      slug: data.slug || slug,
      readingTime: data.readingTime,
      topics: data.topics || [],
      published: data.published !== false,
      content,
    };
  } catch (error) {
    return null;
  }
}

export function getEditionSlugs(): string[] {
  const fileNames = fs.readdirSync(editionsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => fileName.replace(/\.mdx$/, ""));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
