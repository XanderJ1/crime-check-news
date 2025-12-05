import { type FC } from "react";
import { type Content } from "@prismicio/client";
import { PrismicNextLink, PrismicNextImage } from "@prismicio/next";
import {
  PrismicRichText,
  type SliceComponentProps,
  type JSXMapSerializer,
} from "@prismicio/react";
import styles from "./index.module.css";

const components: JSXMapSerializer = {
  hyperlink: ({ node, children }) => {
    return <PrismicNextLink field={node.data}>{children}</PrismicNextLink>;
  },
  label: ({ node, children }) => {
    if (node.data.label === "codespan") {
      return <code>{children}</code>;
    }
  },
};

/**
 * Props for `RichText`.
 */
type RichTextProps = SliceComponentProps<Content.RichTextSlice>;

/**
 * Component for "RichText" Slices.
 */
const RichText: FC<RichTextProps> = ({ slice }) => {
  return (
    <section className={styles.richtext}>
      {/* Render article image if present */}
      {slice.primary.article_image && slice.primary.article_image.url && (
        <div className={styles.imageWrapper}>
          <PrismicNextImage
            field={slice.primary.article_image}
            className={styles.image}
          />
        </div>
      )}

      {/* Render rich text content */}
      <PrismicRichText field={slice.primary.content} components={components} />

      {/* Render video embed if present */}
      {slice.primary.video && slice.primary.video.html && (
        <div
          className={styles.videoWrapper}
          dangerouslySetInnerHTML={{ __html: slice.primary.video.html }}
        />
      )}
    </section>
  );
};

export default RichText;
