const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  } else {
    return blogs.reduce((a, c) => a + c.likes, 0);
  }
};



const favoriteBlog = (blogs) => {
  if (blogs.length === 0) { return {} }
  else {

  let favorite = blogs[0];
  blogs.forEach(blog => {
    if (blog.likes > favorite.likes) {
      favorite = blog;
    }
  });

  return {title: favorite.title, author: favorite.author, likes: favorite.likes}
}
}

export default { totalLikes, favoriteBlog }