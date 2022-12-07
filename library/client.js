import sanityClient from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: "ovh0enal",
  dataset: "production",
  apiVersion: "2022-12-07",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

const builder = ImageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
