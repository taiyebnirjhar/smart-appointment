/* eslint-disable @typescript-eslint/no-explicit-any */
import { IQuery } from "@/types/common/common";
import { Model, Query } from "mongoose";

export class QueryBuilder<T> {
  private page = 1;
  private limit = 10;

  constructor(
    private modelQuery: Query<T[], T>,
    private query: IQuery,
  ) {}

  search(fields: string[]) {
    if (this.query.search && fields.length) {
      const regex = new RegExp(this.query.search as string, "i");
      this.modelQuery = this.modelQuery.find({
        $or: fields.map((field) => ({ [field]: regex })),
      });
    }
    return this;
  }

  filter() {
    const excluded = ["page", "limit", "sort", "fields", "search", "populate"];
    const filters = { ...this.query };

    excluded.forEach((key) => delete filters[key]);

    this.modelQuery = this.modelQuery.find(filters);
    return this;
  }

  sort() {
    if (this.query.sort) {
      const sortBy = (this.query.sort as string).split(",").join(" ");
      this.modelQuery = this.modelQuery.sort(sortBy);
    } else {
      this.modelQuery = this.modelQuery.sort("-createdAt");
    }
    return this;
  }

  fields() {
    if (this.query.fields) {
      const fields = (this.query.fields as string).split(",").join(" ");
      this.modelQuery = this.modelQuery.select(fields);
    }
    return this;
  }

  populate() {
    if (this.query.populate) {
      const populateFields = (this.query.populate as string).split(",");
      populateFields.forEach((field) => {
        this.modelQuery = this.modelQuery.populate(field);
      });
    }
    return this;
  }

  paginate() {
    this.page = Number(this.query.page) || 1;
    this.limit = Number(this.query.limit) || 10;

    const skip = (this.page - 1) * this.limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(this.limit);
    return this;
  }

  async countTotal(model: Model<any>) {
    const clonedQuery = this.modelQuery.model.find(this.modelQuery.getFilter());

    const total = await clonedQuery.countDocuments();
    return total;
  }

  getMeta(total: number) {
    return {
      page: this.page,
      limit: this.limit,
      total,
    };
  }

  async exec() {
    return this.modelQuery;
  }
}
