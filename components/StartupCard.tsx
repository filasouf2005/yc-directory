import { formatDate, truncateText } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { Author, Startup } from "@/sanity/type";
import { author } from "@/sanity/schemaTypes/author";

export type StartupCardType = Omit<Startup, "author"> & { author?: Author };

const StartupCard = ({ post }: { post: StartupCardType }) => {
  const {
    _createdAt,
    views,
    author: { _id: authorId, name, image: authorImage } = {},
    title,
    category,
    _id,
    image,
    description,
  } = post;
  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startup-card-date">{formatDate(post._createdAt)}</p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-meduim">{post.views}</span>
        </div>
      </div>
      <div className="flex-between">
        <div className="flex-1">
          <Link href={`/user/${post.author?._id}`}>
            <p className="text-16-meduim line-clamp-1">{post.author?.name}</p>
          </Link>
          <Link href={`/startup/${post._id}`}>
            <h3 className="text-26-semibold line-clamp-1">{title}</h3>
          </Link>
        </div>
        <Link href={`/user/${post.author?._id}`}>
          <Image
            src={authorImage || ""}
            alt={title || "author image"}
            width={48}
            height={48}
            className="rounded-full "
          />
        </Link>
      </div>
      <Link href={`/startup/${_id}`}>
        <p className="startup-card-desc">
          {truncateText(description ?? "", 1000)}
        </p>
        <img src={image} alt="palc>>>" className="startup-card_img" />
      </Link>
      <div className="flex-between gap-3 mt-5">
        <Link href={`/?query=${category?.toLowerCase()}`} className="tag">
          <p className="text-16-meduim">{category}</p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

export default StartupCard;
