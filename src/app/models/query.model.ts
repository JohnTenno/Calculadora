export class QueryModel {
  skip?: number = 0;
  search?: string = "";
  sortBy?: string = "createdAt";
  sortDirection?: "asc" | "desc" | "" = "asc";
  startDate?: Date | string;
  endDate?: Date | string;
  [extraQueries: string]: any;
}