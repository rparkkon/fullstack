
const format = (blog) => {
    return {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes
    }
}  

const formatBlog = (blog, short = false) => {
    if (short)
        return {
            author: blog.author,
            likes: blog.likes
        }
    else 
        return {
            title: blog.title,
            author: blog.author,
            likes: blog.likes
        }
}  
const formatBlogCount = ([author, times]) => {
    return {
      author: author,
      blogs: times
    }
}  

class Counter extends Map {
    constructor(iter, key=null) {
        super();
        this.key = key || (x => x);
        for (let x of iter) {
            this.add(x);
        }
    }
    add(x) {
      x = this.key(x);
      this.set(x, (this.get(x) || 0) + 1);
    }
}


const totalLikes = (blogs) => {
    const total = blogs.map(item => item.likes).reduce((prev, next) => prev + next);
    console.log("in totalLikes: ", total)

    return total
}

const favoriteBlog = (blogs) => {
    const sorted = blogs.sort( function ( a, b ) { return b.likes - a.likes; } );
    //console.log("favoriteBlog sorted: ", sorted)

    return (formatBlog(sorted[0]))
}


const mostBlogs = (blogs) => {
    const results = new Counter(blogs, x => x.author)
    // console.log('blogs:' , results)
    const sortedResults = new Map([...results.entries()].sort( ( a, b ) => {return b[1] - a[1]}))
    // console.log('sortedResults:' , sortedResults.entries().next().value) // ().key , ' ' , sortedResults.values().value ) // .next())

    return (formatBlogCount(sortedResults.entries().next().value))

}


const mostLikes = (blogs) => {
    const results = blogs.reduce((p, c) => {
        const name = c.author;
        //console.log('c:', c);
        if (!p.hasOwnProperty(c.author)) {
            p[name] = 0;
        }
        p[name] = p[name]+c.likes;
        return p;
    }, {});
    //console.log('COUNTS:', results);

    const counted = Object.keys(results).map(k => {
        return {author: k, likes: results[k]}; });

    const sorted = counted.sort( function ( a, b ) { return (isNaN(b.likes)? 0 : b.likes) - (isNaN(a.likes) ? 0 : a.likes); } );
    //console.log('sorted:', sorted);
  
  return (formatBlog(sorted[0], true))

}
  
module.exports = {
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}

