import { NextRequest, NextResponse } from "next/server";
import APIFeatures from "../_utils/apiFeatures";
import AppError from "../_utils/appError";
import catchAsync from "../_utils/catchAsync";

export function deleteOne(Model) {
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id).exec();

    if (!doc) {
      return next(
        new AppError(
          `No ${Model.modelName.toLowerCase()} found with that ID`,
          404
        )
      );
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  });
}

export function updateOne(Model) {
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    const docName = Model.modelName.toLowerCase();

    if (!doc) {
      return next(new AppError(`No ${docName} found with that ID`, 404));
    }

    const resObj = {
      status: "success",
      data: {},
    };
    resObj.data[docName] = doc;
    res.status(200).json(resObj);
  });
}

export function createOne(Model) {
  catchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body);
    const docName = Model.modelName.toLowerCase();

    const resObj = {
      status: "success",
      data: {},
    };
    resObj.data[docName] = newDoc;
    res.status(201).json(resObj);
  });
}

export function getOne(Model, populateOptions) {
  return async (req, params) => {
    let query = Model.findById(params.id);
    if (populateOptions) query = query.populate(populateOptions);
    const doc = await query;

    const docName = Model.modelName.toLowerCase();

    if (!doc) {
      return next(new AppError(`No ${docName} found with that ID`, 404));
    }

    const resObj = {
      status: "success",
      data: {},
    };
    resObj.data[docName] = doc;
    return NextResponse.json(resObj, { status: 200 });
  };
}

export function getAll(Model, dataPluralName) {
  return async (req) => {
    let filter = {};

    // EXECUTE QUERY
    const features = new APIFeatures(
      Model.find(filter),
      req.nextUrl.searchParams
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();

    // const docs = await features.query.explain();
    const docs = await features.query;

    const docName = Model.modelName.toLowerCase();
    const docNamePlural = dataPluralName || docName + "s";

    // SEND RESPONSE
    const resObj = {
      status: "success",
      results: docs.length,
      data: {},
    };
    resObj.data[docNamePlural] = docs;
    return NextResponse.json(resObj, { status: 200 });
  };
}
