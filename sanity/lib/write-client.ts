import { createClient } from "next-sanity";
import "server-only";
import { apiVersion, dataset, projectId, token } from "../env";

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token, // Include the write token for authenticated requests
});

if (!token) {
  console.warn(
    "No write token provided. Ensure you have set the SANITY_WRITE_TOKEN environment variable for write operations."
  );
}
