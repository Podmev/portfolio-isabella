
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
    const res = await fetch("https://countriesnow.space/api/v0.1/countries/flag/images");
    const data = await res.json();
    const countries = data.data.map((el) => {
      return { name: el.name, flag: el.flag };
    });
    return countries;
  } catch {
    throw new Error("Could not fetch countries");
  }
}