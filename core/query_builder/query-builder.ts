import { defaultSelectFilter, defaultSelectMap } from "../contants";
import { DuplicateFromError, DuplicateSelectError } from "../errors";
import { groupBy } from "../utils";

class QueryBuilder {
  // Data to be queried
  private data?: any[];

  // Function to map the data to the desired output
  private selectMap?: SelectMap;

  // Function to filter the data
  private selectFilter?: SelectFilter;

  // Function to group the data
  private selectGroupBy?: SelectGroupBy;

  /**
   *
   */
  public select(selectMap?: SelectMap): QueryBuilder {
    // Check if select() was called before
    if (this.selectMap) {
      throw new DuplicateSelectError();
    }

    this.selectMap = selectMap ?? defaultSelectMap;

    return this;
  }

  /**
   *
   */
  public from(data: any[]): QueryBuilder {
    // Check if from() was called before
    if (this.data) {
      throw new DuplicateFromError();
    }

    this.data = data;

    return this;
  }

  /**
   *
   */
  public where(selectFilter: SelectFilter): QueryBuilder {
    this.selectFilter = selectFilter;

    return this;
  }

  /**
   *
   */
  public groupBy(selectGroupBy: SelectGroupBy): QueryBuilder {
    this.selectGroupBy = selectGroupBy;

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

    let result = this.data.filter(this.selectFilter ?? defaultSelectFilter);

    if (this.selectGroupBy) {
      result = groupBy(result, this.selectGroupBy);
    }

    result = result.map(this.selectMap ?? defaultSelectMap);

    return result;
  }
}

export default QueryBuilder;
