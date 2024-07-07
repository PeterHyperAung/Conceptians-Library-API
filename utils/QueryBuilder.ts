import { db } from "../db/client";
import { PgTable, PgTableWithColumns } from "drizzle-orm/pg-core";
import { eq, lt, gt, gte, ne, lte, sql, desc, asc, like } from "drizzle-orm";

export class QueryBuilder {
  private client: any;
  private limit = 10;

  constructor(private Model: PgTableWithColumns<any>) {
    this.client = db.select().from(Model);
  }

  public build(): any {
    return this.client;
  }

  public page(n: string | number | undefined): QueryBuilder {
    if (!n) {
      return this;
    }
    this.client = this.client
      .limit(this.limit)
      .offset((Number(n) - 1) * this.limit);
    return this;
  }

  public where(query: any): QueryBuilder {
    if (!query) return this;
    this.client = this.client.query(sql`${query}`);
    return this;
  }

  public whereLike(field: any, value: any): QueryBuilder {
    if (!field || !value) return this;
    this.client = this.client.where(like(field, `%${value}%`));
    return this;
  }

  public whereEq(field: any, value: any): QueryBuilder {
    if (!field || !value) return this;
    this.client = this.client.where(eq(field, value));
    return this;
  }

  public whereLt(field: any, value: any): QueryBuilder {
    if (!field || !value) return this;
    this.client = this.client.where(lt(field, value));
    return this;
  }

  public whereLte(field: any, value: any): QueryBuilder {
    if (!field || !value) return this;
    this.client = this.client.where(lte(field, value));
    return this;
  }

  public whereGt(field: any, value: any): QueryBuilder {
    if (!field || !value) return this;
    this.client = this.client.where(gt(field, value));
    return this;
  }

  public whereGte(field: any, value: any): QueryBuilder {
    if (!field || !value) return this;
    this.client = this.client.where(gte(field, value));
    return this;
  }

  public whereNe(field: any, value: any): QueryBuilder {
    if (!field || !value) return this;
    this.client = this.client.where(ne(field, value));
    return this;
  }

  public orderByAsc(field: any): QueryBuilder {
    if (!field) return this;
    this.client = this.client.orderBy(asc(field));
    return this;
  }

  public orderByDesc(field: any): QueryBuilder {
    if (!field) return this;
    this.client = this.client.orderBy(desc(field));
    return this;
  }
}
