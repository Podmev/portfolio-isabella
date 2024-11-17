import axiosWithUrl from "./axiosWithUrl";

// Guests are uniquely identified by their email address
export async function getGuest(email) {
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("email", email)
    .single();

  // No error here! We handle the possibility of no guest in the sign in callback
  return data;
}

/////////////
// CREATE

export async function createGuest(newGuest) {
  const { data, error } = await supabase.from("guests").insert([newGuest]);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be created");
  }

  return data;
}

export async function getCountries() {
  try {
    const res = await fetch(
      "https://countriesnow.space/api/v0.1/countries/flag/images"
    );
    const data = await res.json();
    const countries = data.data.map((el) => {
      return { name: el.name, flag: el.flag };
    });
    return countries;
  } catch {
    throw new Error("Could not fetch countries");
  }
}

export const getArticles = async function (searchParams) {
  const config = { params: searchParams };
  const { data, error } = await axiosWithUrl.get("/api/v1/articles", config);

  if (error) {
    console.error(error);
    throw new Error("Articles could not be loaded");
  }

  const articles = await data.data.articles;
  return articles;
};

export const getArticle = async function (id) {
  const { data, error } = await axiosWithUrl.get(`/api/v1/articles/${id}`);

  if (error) {
    console.error(error);
    throw new Error("Article could not be loaded");
  }

  const article = await data.data.article;
  return article;
};

