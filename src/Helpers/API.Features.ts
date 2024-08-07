class APIFeatures {
    query: any;
    queryString: any;
    constructor(query: any, queryString: any){
        this.query = query;
        this.queryString = queryString;
    }
    filter(){
        const queryObj = { ...this.queryString};
        // console.log('Before',queryObj)
        const excludedFields = ['page','sort', 'limit', 'fields', 'deleted'];
        excludedFields.forEach(el => delete queryObj[el]);
        // console.log('After',queryObj)

        let queryStr = JSON.stringify(queryObj);

        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        
        queryStr = JSON.parse(queryStr);

        if(Object.keys(queryStr).length){
            // console.log('WE have filter to apply')

            let queryOption = Object.keys(queryStr).map((field:any) => {
                // console.log('each field',field,queryStr[field])
                if(!!queryStr[field]){
                    return {[field] :queryStr[field] === 'true'}
                }
                return {[field]: {$regex: queryStr[field], $option: 'i'},}
            });
            // console.log(queryOption)
            this.query = this.query.find({ $and: queryOption });
        }
        return this;
    }
    
    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }
    
    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select('-__v');
        }
        return this;
    }

    paginate() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page -1) * limit;
       
        this.query = this.query.skip(skip).limit(limit);
       
        return this;
    }
    
    search(searchFields: any) {
        if (this.queryString?.search) {
            const queryOption = searchFields.map((field: any) => ({
                [field]: { $regex: this.queryString.search, $option: 'i'},
            }));
            console.log(queryOption)

            this.query = this.query.find({ $or: queryOption});
        }
        return this;
    }
}
export default APIFeatures;