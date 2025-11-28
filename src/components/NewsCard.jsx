import Image from "next/image";
import Link from "next/link";
import { formatRelativeTime } from "@/lib/prismic-helpers";

const NewsCard = ({ item, showReadMore = false }) => {
    // Helper to truncate text
    const truncateText = (text, maxLength = 100) => {
        if (!text) return "";
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    };

    // Determine if this is a Prismic article (has uid) or external link
    const articleLink = item.uid ? `/article/${item.uid}` : item.link;
    const isExternal = !item.uid && item.link;

    return (
        <Link
            href={articleLink}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="flex flex-col gap-3 group h-full"
        >
            <div className="relative w-full h-48 bg-gray-200 rounded-lg overflow-hidden shadow-sm transition-shadow duration-300 group-hover:shadow-md">
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    unoptimized // Allow loading images from any domain
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"

                />
            </div>

            <div className="flex flex-col flex-grow">
                <div className="flex gap-2 items-center text-xs text-gray-500 mb-2">
                    <span className="font-semibold text-gray-700">{item.source}</span>
                    <span>•</span>
                    <span>{formatRelativeTime(item.time)}</span>
                </div>

                <h3 className="font-bold text-lg leading-tight mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {item.title}
                </h3>

                <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">
                    {truncateText(item.snippet, 120)}
                </p>

                <div className="mt-auto flex items-center justify-between">
                    <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded-full capitalize">
                        {item.category}
                    </span>

                    {showReadMore && (
                        <span className="text-sm font-medium text-blue-600 group-hover:text-blue-800 transition-colors">
                            Read More →
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default NewsCard;
