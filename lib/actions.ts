"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "./utils";
import slugify from "slugify";
import { write } from "fs";
import { writeClient } from "@/sanity/lib/write-client";
export const createidea = async (state: any, form: FormData, pitch: string) => {
  const session = await auth();
  if (!session) {
    return parseServerActionResponse({
      status: "ERROR",
      error: "User not authenticated",
    });
  }

  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch")
  );
  const slug = slugify(title as string, { lower: true, strict: true });
  try {
    const startup = {
      title,
      description,
      category,
      image: link,
      pitch,
      slug: {
        _type: slug,
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.user?.id,
      },
    };
    const resulte = await writeClient.create({
      _type: "startup",
      ...startup,
    });
    return parseServerActionResponse({
      status: "SUCCESS",
      id: resulte._id,
    })
  } catch (error) {
    return parseServerActionResponse({
      status: "ERROR",
      error: "Failed to create idea",
    });
  }
};
