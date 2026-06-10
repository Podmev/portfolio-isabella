export const PROFILE_WORK_LOCATION_MODES = ["specific", "remote", "regional", "global"];

export const PROFILE_WORK_REGION_VALUES = [
  "africa",
  "asia_pacific",
  "europe",
  "latin_america",
  "middle_east",
  "north_america",
];

export function formatBasedLocation(location = {}) {
  return [location?.city, location?.country]
    .map((value) => String(value || "").trim())
    .filter(Boolean)
    .join(", ");
}

function normalizeWorkLocation(workLocation = {}) {
  const mode = PROFILE_WORK_LOCATION_MODES.includes(workLocation?.mode) ? workLocation.mode : "specific";
  const regions = Array.isArray(workLocation?.regions)
    ? workLocation.regions
        .map((value) => String(value || "").trim())
        .filter((value, index, items) => PROFILE_WORK_REGION_VALUES.includes(value) && items.indexOf(value) === index)
    : [];

  return {
    mode,
    regions: mode === "regional" ? regions : [],
  };
}

export function formatWorkLocation(workLocation = {}, t) {
  const normalized = normalizeWorkLocation(workLocation);

  if (normalized.mode === "remote") return t("workLocationMode_remote");
  if (normalized.mode === "global") return t("workLocationMode_global");

  if (normalized.mode === "regional" && normalized.regions.length) {
    return t("workLocationRegionalDisplay", {
      regions: normalized.regions.map((region) => t(`workRegion_${region}`)).join(", "),
    });
  }

  return "";
}
