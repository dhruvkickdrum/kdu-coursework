// Default posts data
const defaultPosts = [
  {
    id: 1,
    username: 'Dhruv Bansal',
    handle: '@dhruvbansal',
    time: '34s',
    text: 'Coffee in hand, bugs beware. Time to crush some code. #DeveloperLife #Coding',
    likes: Math.floor(Math.random() * 100),
    retweets: Math.floor(Math.random() * 50),
    replies: Math.floor(Math.random() * 30),
    views: Math.floor(Math.random() * 1000),
    isLiked: false,
    isRetweeted: false,
    comments: [],
    media: []
  },
  {
    id: 2,
    username: 'Tech Enthusiast',
    handle: '@tech_lover',
    time: '2m',
    text: 'Just launched my new project! Check it out 🚀 #WebDev #JavaScript',
    likes: Math.floor(Math.random() * 100),
    retweets: Math.floor(Math.random() * 50),
    replies: Math.floor(Math.random() * 30),
    views: Math.floor(Math.random() * 1000),
    isLiked: false,
    isRetweeted: false,
    comments: [],
    media: []
  },
  {
    id: 3,
    username: 'Designer Pro',
    handle: '@design_master',
    time: '5m',
    text: 'New design system is live! Excited to share it with the community. #Design #UI',
    likes: Math.floor(Math.random() * 100),
    retweets: Math.floor(Math.random() * 50),
    replies: Math.floor(Math.random() * 30),
    views: Math.floor(Math.random() * 1000),
    isLiked: false,
    isRetweeted: false,
    comments: [],
    media: []
  }
];

let posts = [...defaultPosts];
let currentMedia = [];
let openCommentIds = new Set();

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  initializeNavigation();
  initializeTweetBox();
  initializeMediaUpload();
  renderPosts();
  initializeFloatingButton();
  updateTweetButtonState();
});

// Navigation functionality
function initializeNavigation() {
  const hamburgerMenu = document.getElementById('hamburgerMenu');
  const mobileNavSlider = document.getElementById('mobileNavSlider');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  
  const toggleMenu = () => {
    hamburgerMenu.classList.toggle('active');
    mobileNavSlider.classList.toggle('active');
    if (mobileNavOverlay) {
      mobileNavOverlay.classList.toggle('active');
    }
  };
  
  if (hamburgerMenu && mobileNavSlider) {
    hamburgerMenu.addEventListener('click', toggleMenu);
    
    if (mobileNavOverlay) {
      mobileNavOverlay.addEventListener('click', toggleMenu);
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (mobileNavSlider.classList.contains('active') && !mobileNavSlider.contains(e.target) && !hamburgerMenu.contains(e.target) && (!mobileNavOverlay || !mobileNavOverlay.contains(e.target))) {
        toggleMenu();
      }
    });
  }
}

// Tweet box functionality
function initializeTweetBox() {
  const tweetTextarea = document.getElementById('tweetTextarea');
  const desktopTweetBtn = document.getElementById('desktopTweetBtn');
  const mobileTweetBtn = document.querySelector('.mobile-tweet-btn');
  const mobileTweetBtnBottom = document.getElementById('mobileTweetBtnBottom');
  const backArrow = document.querySelector('.back-arrow');
  
  const handleTweet = () => {
    const text = tweetTextarea.value.trim();
    const media = [...currentMedia];
    
    if (text || media.length > 0) {
      const newPost = {
        id: Date.now(),
        username: 'Dhruv Bansal',
        handle: '@dhruvbansal',
        time: 'now',
        text: text || '',
        likes: 0,
        retweets: 0,
        replies: 0,
        views: 0,
        isLiked: false,
        isRetweeted: false,
        comments: [],
        media: media
      };
      
      posts.unshift(newPost);
      tweetTextarea.value = '';
      currentMedia = [];
      updateMediaPreview();
      renderPosts();
      setComposeOpen(false);
    }
  };
  
  if (desktopTweetBtn) {
    desktopTweetBtn.addEventListener('click', handleTweet);
  }
  
  if (mobileTweetBtn) {
    mobileTweetBtn.addEventListener('click', handleTweet);
  }
  
  if (mobileTweetBtnBottom) {
    mobileTweetBtnBottom.addEventListener('click', handleTweet);
  }

  if (backArrow) {
    backArrow.addEventListener('click', () => setComposeOpen(false));
  }
  
  // Auto-resize textarea
  if (tweetTextarea) {
    tweetTextarea.addEventListener('input', () => {
      tweetTextarea.style.height = 'auto';
      tweetTextarea.style.height = tweetTextarea.scrollHeight + 'px';
      updateTweetButtonState();
    });
  }
  
  // Enter key to submit
  if (tweetTextarea) {
    tweetTextarea.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        handleTweet();
      }
    });
  }
}

// Media upload functionality
function initializeMediaUpload() {
  const imageUpload = document.getElementById('imageUpload');
  const videoUpload = document.getElementById('videoUpload');
  
  if (imageUpload) {
    imageUpload.addEventListener('change', (e) => {
      const files = Array.from(e.target.files);
      files.forEach(file => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (event) => {
            currentMedia.push({
              type: 'image',
              url: event.target.result,
              file: file
            });
            updateMediaPreview();
          };
          reader.readAsDataURL(file);
        }
      });
    });
  }
  
  if (videoUpload) {
    videoUpload.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file && file.type.startsWith('video/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          currentMedia.push({
            type: 'video',
            url: event.target.result,
            file: file
          });
          updateMediaPreview();
        };
        reader.readAsDataURL(file);
      }
    });
  }
}

// Update media preview
function updateMediaPreview() {
  const preview = document.getElementById('mediaPreview');
  if (!preview) return;
  
  preview.innerHTML = '';
  
  if (currentMedia.length === 0) {
    preview.style.display = 'none';
    preview.classList.remove('single', 'multiple');
    updateTweetButtonState();
    return;
  }
  
  preview.style.display = 'grid';
  
  if (currentMedia.length === 1) {
    preview.classList.add('single');
    preview.classList.remove('multiple');
  } else {
    preview.classList.add('multiple');
    preview.classList.remove('single');
  }
  
  currentMedia.forEach((media, index) => {
    const mediaItem = document.createElement('div');
    mediaItem.className = 'media-item';
    
    const removeBtn = document.createElement('button');
    removeBtn.className = 'media-remove';
    removeBtn.innerHTML = '×';
    removeBtn.setAttribute('aria-label', 'Remove media');
    removeBtn.onclick = (e) => {
      e.stopPropagation();
      currentMedia.splice(index, 1);
      updateMediaPreview();
    };
    
    if (media.type === 'image') {
      const img = document.createElement('img');
      img.src = media.url;
      img.alt = 'Uploaded image';
      mediaItem.appendChild(img);
    } else if (media.type === 'video') {
      const video = document.createElement('video');
      video.src = media.url;
      video.controls = true;
      video.preload = 'metadata';
      mediaItem.appendChild(video);
    }
    
    mediaItem.appendChild(removeBtn);
    preview.appendChild(mediaItem);
  });
  
  updateTweetButtonState();
}

// Update tweet button state
function updateTweetButtonState() {
  const tweetTextarea = document.getElementById('tweetTextarea');
  const desktopTweetBtn = document.getElementById('desktopTweetBtn');
  const mobileTweetBtn = document.querySelector('.mobile-tweet-btn');
  const mobileTweetBtnBottom = document.getElementById('mobileTweetBtnBottom');
  const text = tweetTextarea ? tweetTextarea.value.trim() : '';
  const hasContent = text.length > 0 || currentMedia.length > 0;
  
  [desktopTweetBtn, mobileTweetBtn, mobileTweetBtnBottom].forEach(btn => {
    if (btn) {
      if (hasContent) {
        btn.disabled = false;
        btn.style.opacity = '1';
        btn.style.cursor = 'pointer';
      } else {
        btn.disabled = true;
        btn.style.opacity = '0.5';
        btn.style.cursor = 'not-allowed';
      }
    }
  });
}

// Floating tweet button
function initializeFloatingButton() {
  const floatingBtn = document.getElementById('floatingTweetBtn');
  const tweetBox = document.querySelector('.tweet-box');
  
  if (floatingBtn && tweetBox) {
    floatingBtn.addEventListener('click', () => {
      setComposeOpen(true);
      setTimeout(() => {
        const textarea = document.getElementById('tweetTextarea');
        if (textarea) {
          textarea.focus();
        }
      }, 150);
    });
  }
}

function setComposeOpen(isOpen) {
  const body = document.body;
  if (!body) return;

  if (isOpen) {
    body.classList.add('compose-open');
  } else {
    body.classList.remove('compose-open');
  }
}

// Render posts
function renderPosts() {
  const postsContainer = document.getElementById('postsContainer');
  if (!postsContainer) return;
  
  postsContainer.innerHTML = posts.map(post => createPostHTML(post)).join('');
  
  // Attach event listeners
  attachPostEventListeners();

  // Restore open comment sections after re-render
  if (openCommentIds.size > 0) {
    openCommentIds.forEach(id => {
      const postEl = document.querySelector(`.post[data-post-id="${id}"]`);
      if (postEl) {
        postEl.classList.add('show-comments');
      }
    });
  }
}

// Create post HTML
function createPostHTML(post) {
  const hashtags = post.text.match(/#\w+/g) || [];
  let processedText = post.text;
  
  hashtags.forEach(tag => {
    processedText = processedText.replace(tag, `<span class="hashtag">${tag}</span>`);
  });

  const retweetIcon = post.isRetweeted ? './icons/retweet-blue.svg' : './icons/retweet.svg';
  const likeIcon = post.isLiked ? './icons/like-pink.svg' : './icons/like.svg';
  
  const mediaHTML = post.media && post.media.length > 0 ? `
    <div class="post-media ${post.media.length === 1 ? 'single' : 'multiple'}">
      ${post.media.map(media => {
        if (media.type === 'image') {
          return `<img src="${media.url}" alt="Post image">`;
        } else if (media.type === 'video') {
          return `<video src="${media.url}" controls></video>`;
        }
        return '';
      }).join('')}
    </div>
  ` : '';
  
  return `
    <article class="post" data-post-id="${post.id}">
      <div class="post-header">
        <div class="post-avatar">${post.username.charAt(0)}</div>
        <div class="post-user-info">
          <span class="post-username">${post.username}</span>
          <span class="post-handle">${post.handle}</span>
          <span class="post-time">· ${post.time}</span>
        </div>
        <div class="post-more">
          <img src="./icons/dot-icon.svg" alt="">
        </div>
      </div>
      <div class="post-content">
        ${processedText ? `<div class="post-text">${processedText}</div>` : ''}
        ${mediaHTML}
      </div>
      <div class="post-actions">
        <div class="action-item reply" data-action="reply" data-post-id="${post.id}">
          <img src="./icons/comment.svg" alt="">
          <span class="action-count">${post.replies}</span>
        </div>
        <div class="action-item retweet ${post.isRetweeted ? 'active' : ''}" data-action="retweet" data-post-id="${post.id}">
          <img src="${retweetIcon}" alt="">
          <span class="action-count">${post.retweets}</span>
        </div>
        <div class="action-item like ${post.isLiked ? 'active like-post' : 'unlike-post'}" data-action="like" data-post-id="${post.id}">
          <img src="${likeIcon}" alt="">
          <span class="action-count likes-count">${post.likes > 0 ? post.likes : ''}</span>
        </div>
        <div class="action-item analytics" data-action="analytics" data-post-id="${post.id}">
          <img src="./icons/stats.svg" alt="">
          <span class="action-count">${post.views}</span>
        </div>
        <div class="action-item bookmark" data-action="bookmark" data-post-id="${post.id}">
          <img src="./icons/bookmark-grey.svg" alt="">
        </div>
        <div class="action-item share" data-action="share" data-post-id="${post.id}">
          <img src="./icons/share.svg" alt="">  
        </div>
      </div>
      <div class="post-comments" data-comments-section="${post.id}">
        <div class="comments-list" id="comments-${post.id}">
          ${post.comments.map(comment => `
            <div class="comment">
              <div class="comment-avatar">${comment.username.charAt(0)}</div>
              <div class="comment-content">
                <div class="comment-header">
                  <span class="comment-username">${comment.username}</span>
                  <span class="comment-time">${comment.time}</span>
                </div>
                <div class="comment-text">${comment.text}</div>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="comment-input">
          <div class="comment-avatar">D</div>
          <div class="comment-form">
            <input type="text" placeholder="Tweet your reply" class="comment-text-input" data-post-id="${post.id}">
            <button class="comment-submit-btn" data-post-id="${post.id}">Reply</button>
          </div>
        </div>
      </div>
    </article>
  `;
}

// Attach event listeners to posts
function attachPostEventListeners() {
  // Like functionality
  document.querySelectorAll('[data-action="like"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const postId = parseInt(btn.dataset.postId);
      toggleLike(postId);
    });
  });
  
  // Retweet functionality
  document.querySelectorAll('[data-action="retweet"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const postId = parseInt(btn.dataset.postId);
      toggleRetweet(postId);
    });
  });
  
  // Reply functionality
  document.querySelectorAll('[data-action="reply"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const postId = parseInt(btn.dataset.postId);
      if (window.matchMedia('(max-width: 414px)').matches) {
        toggleInlineComments(postId);
        return;
      }
      const commentSection = document.querySelector(`[data-comments-section="${postId}"]`);
      if (commentSection) {
        const input = commentSection.querySelector('.comment-text-input');
        if (input) {
          input.focus();
        }
      }
    });
  });
  
  // Comment submission
  document.querySelectorAll('.comment-submit-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const postId = parseInt(btn.dataset.postId);
      submitComment(postId);
    });
  });
  
  // Comment input enter key
  document.querySelectorAll('.comment-text-input').forEach(input => {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.stopPropagation();
        const postId = parseInt(input.dataset.postId);
        submitComment(postId);
      }
    });
  });
}

function toggleInlineComments(postId) {
  // Close any other open comment sections on mobile
  document.querySelectorAll('.post.show-comments').forEach(post => {
    const id = parseInt(post.getAttribute('data-post-id'));
    if (!Number.isNaN(id) && id !== postId) {
      post.classList.remove('show-comments');
      openCommentIds.delete(id);
    }
  });

  const postEl = document.querySelector(`.post[data-post-id="${postId}"]`);
  const commentSection = document.querySelector(`[data-comments-section="${postId}"]`);
  if (!postEl || !commentSection) return;

  postEl.classList.toggle('show-comments');

  if (postEl.classList.contains('show-comments')) {
    openCommentIds.add(postId);
    const input = commentSection.querySelector('.comment-text-input');
    if (input) {
      setTimeout(() => input.focus(), 150);
    }
  } else {
    openCommentIds.delete(postId);
  }
}

// Toggle like
function toggleLike(postId) {
  const post = posts.find(p => p.id === postId);
  if (!post) return;
  
  post.isLiked = !post.isLiked;
  post.likes += post.isLiked ? 1 : -1;
  
  renderPosts();
}

// Toggle retweet
function toggleRetweet(postId) {
  const post = posts.find(p => p.id === postId);
  if (!post) return;
  
  post.isRetweeted = !post.isRetweeted;
  post.retweets += post.isRetweeted ? 1 : -1;
  
  renderPosts();
}

// Submit comment
function submitComment(postId) {
  const post = posts.find(p => p.id === postId);
  if (!post) return;
  
  const input = document.querySelector(`.comment-text-input[data-post-id="${postId}"]`);
  if (!input) return;
  
  const text = input.value.trim();
  if (!text) return;
  
  const comment = {
    id: Date.now(),
    username: 'Dhruv Bansal',
    handle: '@dhruvbansal',
    time: 'now',
    text: text
  };
  
  post.comments.push(comment);
  post.replies += 1;
  input.value = '';
  
  openCommentIds.add(postId);
  renderPosts();
}

