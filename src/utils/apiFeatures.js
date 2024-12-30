import { Types } from "mongoose";

class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const processedOperatorsQueryString = this.processOperators(
      //converting URLSearchParams to object then to entries
      Object.entries(Object.fromEntries(this.queryString))
    );
    const queryObj = Object.fromEntries(processedOperatorsQueryString);

    const exludedFields = ["page", "sort", "limit", "fields"];
    exludedFields.forEach((el) => delete queryObj[el]);

    // {difficulty: 'easy', duration: {$gte: 5}}
    // {difficulty: 'easy', duration: {gte: 5}}

    this.query = this.query.find(queryObj);
    return this;
  }

  sort() {
    if (this.queryString.has("sort")) {
      const sortBy = this.queryString.get("sort").split(",").join(" ");
      // console.log(sortBy);
      this.query = this.query.sort(sortBy);
      //sorting by many fields: sort('price ratingsAverage')
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  limitFields() {
    if (this.queryString.has("fields")) {
      const fields = this.queryString.get("fields").split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  paginate() {
    const page = Number(this.queryString.get("page")) || 1;
    const limit = Number(this.queryString.get("limit")) || 100;
    const skip = (page - 1) * limit;
    // page=3&limit=10, 1-10 page 1, 11-20 page 2, 21-30 page 3
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }

  processOperators(entries) {
    return entries.map((entry) => this.remapEntry(entry));
  }

  remapEntry(entry) {
    const [key, value, operator] = this.getKeyValueOperator(entry);
    if (!operator) {
      return [key, value];
    }
    return [key, { [`$${operator}`]: value }];
  }

  getKeyValueOperator(entry) {
    const [key, value] = entry;
    if (!key.includes("[")) {
      // there is no operator
      return entry;
    }
    const [newKey, rest] = key.split("[");
    const [operator, _] = rest.split("]");
    if (!operator in ["lt", "gt", "gte", "lte", "qe", "ne"]) {
      return entry;
    }
    return [newKey, value, operator];
  }
}

export default APIFeatures;
