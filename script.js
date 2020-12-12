// -------------- DOM Elements --------------
const postsContainer = document.getElementById('post-container');
const filter = document.getElementById('filter');
const loader = document.getElementById('loader');

let limit = 5;
let page = 1;


// Api fetcher  ~ Fetch posts from API
async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );

  const data = await res.json();
  // console.log(data);

  return data;
}


// Show posts in the app - Function
async function showPosts() {
  let posts = await getPosts();

  console.log(posts);

  // loop through the posts we are obtaining from the API
  posts.forEach((post) => {
    let postElement = document.createElement('div');
    postElement.classList.add('post')

    postElement.innerHTML = `
        <div class="number">${post.id}</div>
        <div class="post-info">
          <h2 class="post-title">${post.title}</h2>
          <p class="post-body">
           ${post.body}
          </p>
        </div>
    `;

    postsContainer.appendChild(postElement);

  });

}

// bring the initial posts
showPosts();