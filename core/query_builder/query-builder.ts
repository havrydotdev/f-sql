import {
  DuplicateFromError,
  DuplicateSelectError,
  DuplicateOrderByError,
  DuplicateGroupByError,
} from "../errors";
import { checkValid, genVariations, groupBy } from "../utils";

class QueryBuilder {
  // Data to be queried
  private data?: any[] | any[][];

  private joinMode: boolean = false;

  // Function to map the data to the desired output
  private selectMap?: SelectMap;

  // Function to filter the data
  private selectFilter: SelectFilter[][] = [];

  // Function to group the data
  private selectGroupBy?: SelectGroupBy[];

  // Function to filter the grouped data
  private selectHaving: SelectHaving[][] = [];

  // Function to order the data
  private selectOrderBy?: SelectOrderBy;

  /**
   *
   */
  public select(selectMap?: SelectMap): QueryBuilder {
    // Check if select() was called before
    if (this.selectMap) throw new DuplicateSelectError();

    this.selectMap = selectMap;

    return this;
  }

  public from(...data: any[]): QueryBuilder {
    // Check if from() was called before
    if (this.data) throw new DuplicateFromError();

    if (data.length === 1) {
      this.data = data[0] as any[];
    } else {
      this.joinMode = true;
      this.data = data;
    }

    return this;
  }

  /**
   *
   */
  public where(...selectFilter: SelectFilter[]): QueryBuilder {
    this.selectFilter.push(selectFilter);

    return this;
  }

  public groupBy(...selectGroupBy: SelectGroupBy[]): QueryBuilder {
    if (this.selectGroupBy) throw new DuplicateGroupByError();

    this.selectGroupBy = selectGroupBy;

    return this;
  }

  public having(...selectHaving: SelectHaving[]): QueryBuilder {
    this.selectHaving.push(selectHaving);

    return this;
  }

  public orderBy(selectOrderBy: SelectOrderBy): QueryBuilder {
    if (this.selectOrderBy) throw new DuplicateOrderByError();

    this.selectOrderBy = selectOrderBy;

    return this;
  }

  /**
   *
   */
  public execute(): any[] {
    // if 'from' is undefined, return empty array
    if (!this.data) {
      return [];
    }

    let result = this.data;

    if (this.joinMode) {
      result = genVariations(result);
    }

    if (this.selectFilter.length > 0) {
      result = result.filter((item: any) =>
        checkValid(this.selectFilter!, item)
      );
    }

    if (this.selectGroupBy) {
      result = groupBy(result, ...this.selectGroupBy.slice());
    }

    if (this.selectHaving) {
      result = result.filter((item) => checkValid(this.selectHaving!, item));
    }

    if (this.selectMap) {
      result = result.map(this.selectMap);
    }

    if (this.selectOrderBy) {
      result.sort((a, b) => this.selectOrderBy!(a, b));
    }

    return result;
  }
}

export default QueryBuilder;
