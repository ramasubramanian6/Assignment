class dynamic {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    //search for name
    query_based_search() {
        let searchfor = this.queryString.searchfor ? {
            name: {
                $regex: this.queryString.searchfor,
                $options: 'i'
            }
        } : {}
        //console.log(searchfor);
        this.query.find({ ...searchfor })
        return this;

    }
    filter_category() {
        let copy = { ...this.queryString };
        const del_string = ["searchfor"];
        del_string.forEach(str => delete copy[str]);
        if (copy.category) {
            copy.category = { $regex: copy.category, $options: 'i' };
        }
        console.log(copy);
        this.query.find(copy);
        return this;
    }


    filter_by_price() {
        let querycopy = { ...this.queryString };

        const del_string = ["searchfor"];
        del_string.forEach(str => delete querycopy[str]);
        let queryStr = JSON.stringify(querycopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
        const parsedQuery = JSON.parse(queryStr);
        this.query = this.query.find(parsedQuery);
       
        return this;
    }

    text_suggestions() {
        let searchfor = this.queryString.searchfor ? {
            name: {
                $regex: this.queryString.searchfor,
                $options: 'i'
            }
        } : {}
        this.query.find({ ...searchfor }).limit(2);
        return this;
    }


}

module.exports = dynamic