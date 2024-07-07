import { db } from "../db/client";
import { PgTable, PgTableWithColumns } from "drizzle-orm/pg-core";
import { eq, lt, gt, gte, ne, lte, sql, desc, asc, like } from "drizzle-orm";

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
    this.query = this.query.offset((Number(n) - 1) * this.limit);
    return this;
  }

  public where(query: any): QueryBuilder {
    if (!query) return this;
    this.query = this.query.query(sql`${query}`);
    return this;
  }

  public whereLike(field: any, value: any): QueryBuilder {
    if (!field || !value) return this;
    this.query = this.query.where(like(field, `%${value}%`));
    return this;
  }

  public whereEq(field: any, value: any): QueryBuilder {
    if (!field || !value) return this;
    this.query = this.query.where(eq(field, value));
    return this;
  }

  public whereLt(field: any, value: any): QueryBuilder {
    if (!field || !value) return this;
    this.query = this.query.where(lt(field, value));
    return this;
  }

  public whereLte(field: any, value: any): QueryBuilder {
    if (!field || !value) return this;
    this.query = this.query.where(lte(field, value));
    return this;
  }

  public whereGt(field: any, value: any): QueryBuilder {
    if (!field || !value) return this;
    this.query = this.query.where(gt(field, value));
    return this;
  }

  public whereGte(field: any, value: any): QueryBuilder {
    if (!field || !value) return this;
    this.query = this.query.where(gte(field, value));
    return this;
  }

  public whereNe(field: any, value: any): QueryBuilder {
    if (!field || !value) return this;
    this.query = this.query.where(ne(field, value));
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
