import fs from "fs";
import path from "path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkFrontmatter from "remark-frontmatter";
import remarkToc from "remark-toc";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import html from "remark-html";
import matter from "gray-matter";

export function getBlogPosts() {
  const dir = path.join(process.cwd(), "blogposts");
  const mdxFiles = fs
    .readdirSync(dir)
    .filter((file) => path.extname(file) === ".mdx");

  const blogPosts = mdxFiles.map(async (file) => {
    const filePath = path.join(dir, file);
    const fileContents = fs.readFileSync(filePath, "utf-8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    const processedContent = await unified()
      .use(html)
      .use(remarkParse)
      .use(remarkFrontmatter)
      .use(remarkRehype)
      .use(rehypePrettyCode, {
        theme: "one-dark-pro",
      }) // Prettify code blocks
      .use(rehypeAutolinkHeadings) // Add anchor links to headings
      .use(remarkToc) // Generate table of contents
      .use(rehypeSanitize) // Sanitize HTML input
      .use(rehypeStringify)
      .process(matterResult.content);

    const content = processedContent.toString();

    let slug = path.basename(file, path.extname(file));

    return {
      metadata: matterResult.data,
      slug,
      content,
    };
  });

  return blogPosts;
}
