export const createSlug = (title: string) => {
  // create random string like sXQcUpK
  const randomString = Math.random().toString(36).substring(2, 8);
  const slug = title
    .toLowerCase() // convert to lowercase
    .replace(/[^\w\s]/gi, "") // remove punctuation
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .trim(); // remove leading/trailing white space

  return `${slug}-${randomString}`;
};
