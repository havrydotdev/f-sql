import { defaultSelectMap } from "../constants";
import { DuplicateFromError, DuplicateSelectError } from "../errors";
import { checkValid, genVariations, groupBy } from "../utils";

class QueryBuilder {
  // Data to be queried
  private data?: any[] | any[][];

  private joinMode: boolean = false;

  // Function to map the data to the desired output
  private selectMap?: SelectMap;

  // Function to filter the data
  private selectFilter?: SelectFilter[][];

  // Function to group the data
  private selectGroupBy?: SelectGroupBy[];

  // Function to filter the grouped data
  private selectHaving?: SelectHaving[][];

  // Function to order the data
  private selectOrderBy?: SelectOrderBy;

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

  public from(...data: any[]): QueryBuilder {
    // Check if from() was called before
    if (this.data) {
      throw new DuplicateFromError();
    }

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
    if (!this.selectFilter) this.selectFilter = [];

    this.selectFilter?.push(selectFilter);

    return this;
  }

  // TODO: Multilevel group by
  public groupBy(...selectGroupBy: SelectGroupBy[]): QueryBuilder {
    this.selectGroupBy = selectGroupBy;

    return this;
  }

  public having(...selectHaving: SelectHaving[]): QueryBuilder {
    if (!this.selectFilter) this.selectFilter = [];

    this.selectHaving?.push(selectHaving);

    return this;
  }

  public orderBy(selectOrderBy: SelectOrderBy): QueryBuilder {
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

    if (this.joinMode && this.selectFilter) {
      const res = genVariations(this.data);

      result = res.filter((item: any[]) =>
        checkValid(this.selectFilter!, item)
      );
    } else if (this.selectFilter) {
      result = result.filter((item: any[]) =>
        checkValid(this.selectFilter!, item)
      );
    }

    result = result.sort((a, b) => {
      return this.selectOrderBy ? -this.selectOrderBy(a, b) : 1;
    });

    if (this.selectGroupBy) {
      for (const groupRule of this.selectGroupBy) {
        result = groupBy(result, groupRule);
      }
    }

    result = result.map(this.selectMap ?? defaultSelectMap);

    if (this.selectHaving) {
      result = result.filter((item) => checkValid(this.selectHaving!, item));
    }

    return result;
  }
}

export default QueryBuilder;
