import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

/**
 * Props for `Article`.
 */
export type ArticleProps = SliceComponentProps<Content.ArticleSlice>;

/**
 * Component for "Article" Slices.
 */
const Article: FC<ArticleProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      {slice.primary.image && slice.primary.image.url && (
        <div className="mb-6">
          <PrismicNextImage
            field={slice.primary.image}
            className="w-full h-auto rounded-lg"
          />
        </div>
      )}

      {slice.primary.article && (
        <div className="prose prose-lg max-w-none">
          <PrismicRichText field={slice.primary.article} />
        </div>
      )}
    </section>
  );
};

export default Article;
