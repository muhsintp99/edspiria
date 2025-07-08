
let currentPage = 1;
const postsPerPage = 6;
let blogPosts = [];

function fetchBlogData() {
  fetch("./json/blog-posts.json")
    .then(res => res.json())
    .then(data => {
      blogPosts = data.posts;
      renderPosts();
    })
    .catch(err => console.error("Error loading blog posts:", err));
}

function renderPosts() {
  const container = document.getElementById("blog-posts");
  container.innerHTML = "";

  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;
  const posts = blogPosts.slice(start, end);

  posts.forEach(post => {
    container.innerHTML += `
      <div class="col-lg-4">
        <article>
          <div class="post-img position-relative">
            <img src="${post.image}" alt="${post.title}" class="img-fluid" loading="lazy">
            <div class="post-content">
              <p class="post-category">${post.category}</p>
              <h2 class="title">
                <a href="${post.link}">${post.title}</a>
              </h2>
              <div class="post-meta">
                <time datetime="${post.date}">${new Date(post.date).toDateString()}</time>
                <span class="px-2">•</span>
                <span>No Comments</span>
              </div>
            </div>
          </div>
        </article>
      </div>
    `;
  });

  renderPagination();
}

function renderPagination() {
  const pagination = document.querySelector("#pagination ul");
  pagination.innerHTML = "";

  const totalPages = Math.ceil(blogPosts.length / postsPerPage);

  if (currentPage > 1) {
    pagination.innerHTML += `<li><a href="#" onclick="gotoPage(${currentPage - 1})">Previous</a></li>`;
  }

  for (let i = 1; i <= totalPages; i++) {
    pagination.innerHTML += `<li><a href="#" class="${i === currentPage ? 'active' : ''}" onclick="gotoPage(${i})">${i}</a></li>`;
  }

  if (currentPage < totalPages) {
    pagination.innerHTML += `<li><a href="#" onclick="gotoPage(${currentPage + 1})">Next</a></li>`;
  }
}

function gotoPage(page) {
  currentPage = page;
  renderPosts();
}

window.onload = fetchBlogData;


// console.log(gotoPage,"blog");