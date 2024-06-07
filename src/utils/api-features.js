import { paginationFunction } from "./pagination.js";

/**
 * @class APIFeatures
 * @constructor query, mongooseQuery
 * @description this class will be used to filter, sort, paginate and search the data
 * @method pagination  
    *@description this method will be used to divide the data into chunks or patches
    *@param {page, size}
 * @method sort
    * @description this method will be used to sort the data depending on the given field
    * @check if the field is not given then it will sort the data by createdAt field in descending order
    * @param {sortBy}
 * @method search
    * @description this method will be used to search the data depending on the given fields
    * @param {search}  => object contains the fields that we want to search by 
 * @method filters
    *@description this method will be used to filter the data depending on the given fields but more dynamically than the @mtethod search
    *@param {filters} => object contains the fields that we want to filter by 
    *@example 
        * @params will be in this formate
        * appliedPrice[gte]=100 
        * stock[lte]=200
        * discount[ne]=0
        * title[regex]=iphone
        * @object will be like this after the replace method
        * { appliedPrice: { $gte: 100 }, stock: { $lte: 200 }, discount: { $ne: 0 }, title: { $regex: 'iphone' }
 */

export class APIFeatures {
  //constructor
  constructor(query, mogooseQuery) {
    this.query = query;
    this.mogooseQuery = mogooseQuery;
  }

  //pagination method
  pagination({ page, size }) {
    const { limit, skip } = paginationFunction({ page, size });
    this.mogooseQuery = this.mogooseQuery.limit(limit).skip(skip);

    return this;
  }
}
