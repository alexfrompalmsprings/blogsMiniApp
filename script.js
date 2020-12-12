// -------------- DOM Elements --------------
const postsContainer = document.getElementById('post-container');
const filter = document.getElementById('filter');
const loading = document.querySelector('.loader');


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


// show circle loading and bring more posts ..
function showLoading() {
  console.log('close to reaching the end, probably need to implement unlimited scrolling');
  loading.classList.add('show');

  // remove the dots from the page after 1s
  setTimeout(() => {
    loading.classList.remove('show')
  }, 1000);

  // bring more posts to the miniApp
  setTimeout(() => {
    page++;
    showPosts();

  }, 300);

}

// FILTER the posts based in the clients input
function filterPosts(e) {

  let input = e.target.value.toUpperCase();
  let posts = document.querySelectorAll('.post')

  // loop through the posts and filter
  posts.forEach((post) => {
    let title = post.querySelector('.post-title').innerText.toUpperCase();
    let body = post.querySelector('.post-body').innerText.toUpperCase();

    if ((title.includes(input)) || (body.includes(input))) {
      post.style.display = 'flex';

    } else {
      post.style.display = 'none';

    }
  })

}


// -------------- event listeners --------------
window.addEventListener('scroll', () => {
  const {
    scrollTop,
    scrollHeight,
    clientHeight
  } = document.documentElement;

  // console.log(scrollHeight, scrollTop, clientHeight);

  if (scrollTop + clientHeight >= (scrollHeight - 20)) {
    showLoading();

  }

});

window.addEventListener('input', filterPosts);