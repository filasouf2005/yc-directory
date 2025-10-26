import StartupCard, { StartupCardType } from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";
import { client } from "@/sanity/lib/client";
import { STARTUP_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  // const posts = await client.fetch(STARTUP_QUERY);
  const { data: posts } = await sanityFetch({
    query: STARTUP_QUERY,
    params: { search: query || null },
  });

  const params = { search: query || null };
 const session = await auth();

  return (
    <>
      <section className="pink_container">
        <h1 className="heading w-full">
          Pitch Your Strtup, <br /> Connect Woth Entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches , and Noticed in Virtual Competitions
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? 'Search results for "' + query + '"' : "Discover Startups"}
        </p>
        <ul className="mt-7 card-grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupCardType, index: number) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p>No startups found matching "{query}"</p>
          )}
        </ul>
      </section>
      <SanityLive />
    </>
  );
}
