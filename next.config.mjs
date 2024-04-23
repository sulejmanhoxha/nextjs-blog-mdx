// Rename the file to next.config.mjs and update the import syntax
import createMDX from "@next/mdx";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkFrontmatter from "remark-frontmatter";
import remarkToc from "remark-toc";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

// Use dynamic import for rehype-highlight
const withMDX = async () => {
  return createMDX({
    options: {
      remarkPlugins: [remarkToc, remarkRehype],
      rehypePlugins: [
        rehypeSanitize,
        rehypeStringify,
        rehypeAutolinkHeadings,
        [
          rehypePrettyCode,
          {
            theme: "one-dark-pro",
          },
        ],
      ],
    },
  })(nextConfig);
};

export default withMDX();
