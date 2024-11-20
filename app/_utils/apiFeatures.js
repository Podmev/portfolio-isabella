class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = Object.fromEntries(this.queryString);
    
    const exludedFields = ["page", "sort", "limit", "fields"];
    exludedFields.forEach((el) => delete queryObj[el]);

    // 1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    // console.log(JSON.parse(queryStr));
    
    // {difficulty: 'easy', duration: {$gte: 5}}
    // {difficulty: 'easy', duration: {gte: 5}}

    // let query = Tour.find(JSON.parse(queryStr));
    this.query = this.query.find(JSON.parse(queryStr));
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
}

export default APIFeatures;
