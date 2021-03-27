export class Query {
  constructor(private _query: Record<string, unknown>[] = []) {}

  public chain(query: Record<string, unknown> | Query): Query {
    if (query instanceof Query) {
      this._query.push(...query.query);
      return this;
    }
    this._query.push(query);
    return this;
  }

  get query() {
    return this._query;
  }
}
