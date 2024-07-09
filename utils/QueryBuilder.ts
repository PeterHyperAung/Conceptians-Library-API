import { db } from "../db/client";
import { PgTable, PgTableWithColumns } from "drizzle-orm/pg-core";
import { eq, lt, gt, gte, ne, lte, sql, desc, asc, ilike } from "drizzle-orm";

export class QueryBuilder {
  private query: any;
  private limit = 10;

  constructor(private Model: PgTableWithColumns<any>) {
    this.query = db.select().from(Model);
  }

  public build(): any {
    this.query = this.query.limit(this.limit);
    return this.query;
  }

  public page(n: string | number | undefined): QueryBuilder {
    if (!n) {
      return this;
    }
    this.query = this.query.offset(Number(n) * this.limit);
    return this;
  }

  public where(...q: any): QueryBuilder {
    if (q.length === 0) return this;
    this.query = this.query.where(...q);
    return this;
  }

  public orderByAsc(field: any): QueryBuilder {
    if (!field) return this;
    this.query = this.query.orderBy(asc(field));
    return this;
  }

  public orderByDesc(field: any): QueryBuilder {
    if (!field) return this;
    this.query = this.query.orderBy(desc(field));
    return this;
  }
}
