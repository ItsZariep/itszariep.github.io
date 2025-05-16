/**
 * Extracts title from filename (format: YYYY.MM.DD-title)
 * @param {string} filename - The filename to extract title from
 * @returns {string} - The extracted and formatted title
 */
function extractTitleFromFilename(filename)
{
	const titlePattern = /^\d{4}\.\d{2}\.\d{2}-(.+)$/;
	const match = filename.match(titlePattern);

	if (match && match[1])
	{
		return match[1]
			.replace(/-/g, ' ')
	}

	return 'Untitled Post';
}


/**
 * Fetches and displays posts from a GitHub repository
 * @param {string} repoOwner - The GitHub repository owner's username
 * @param {string} repoName - The repository name
 * @param {string} postsPath - The path to the posts directory within the repository
 * @param {string} containerId - The ID of the HTML element to display posts in (default: 'posts-container')
 */
async function rcfetchAndDisplayPosts(repoOwner, repoName, postsPath, containerId = 'posts-container')
{
	const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${postsPath}`;
	const postsContainer = document.getElementById(containerId);
	if (!postsContainer)
	{
		console.error('Posts container element not found');
		return;
	}
	try
	{
		const response = await fetch(apiUrl);

		if (!response.ok)
		{
			throw new Error(`GitHub API error: ${response.status}`);
		}

		const posts = await response.json();

		postsContainer.innerHTML = '';

		// Sort posts by date (newest first)
		posts.sort((a, b) =>
		{
			const dateA = extractDateFromFilename(a.name);
			const dateB = extractDateFromFilename(b.name);
			return new Date(dateB) - new Date(dateA);
		});

		posts.forEach(post =>
		{
			const postName = post.name;
			const title = extractTitleFromFilename(postName);

			const linkElement = document.createElement('a');
			linkElement.href = `https://${repoName}/posts/${postName}`;
			linkElement.className = 'post-link';

			const titleElement = document.createElement('h6');
			titleElement.className = 'rc-post-title';
			titleElement.textContent = `• ${title}`;

			linkElement.appendChild(titleElement);
			postsContainer.appendChild(linkElement);

		});
	}
	catch (error)
	{
		console.error('Error fetching posts:', error);
		postsContainer.innerHTML = `<div class="error-message">Failed to load posts: ${error.message}</div>`;
	}
}


async function rcfetchAndDisplayCategories(repoOwner, repoName, postsPath, containerId = 'posts-container')
{
	const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${postsPath}`;
	const postsContainer = document.getElementById(containerId);
	if (!postsContainer)
	{
		console.error('Posts container element not found');
		return;
	}

	try
	{
		const response = await fetch(apiUrl);

		if (!response.ok)
		{
			throw new Error(`GitHub API error: ${response.status}`);
		}

		const posts = await response.json();

		postsContainer.innerHTML = '';

		posts.forEach(post =>
		{
			const postName = post.name;

			const linkElement = document.createElement('a');
			linkElement.href = `https://${repoName}/posts/${postName}`;
			linkElement.className = 'post-link';

			const titleElement = document.createElement('h4');
			titleElement.className = 'rc-post-title';
			titleElement.textContent = `${postName}`;

			linkElement.appendChild(titleElement);
			postsContainer.appendChild(linkElement);
		});
	}
	catch (error)
	{
		console.error('Error fetching posts:', error);
		postsContainer.innerHTML = `<div class="error-message">Failed to load posts: ${error.message}</div>`;
	}
}


function createRc()
{
	const mainContainer = document.getElementById('main-container');
	if (!mainContainer) return;

	// Create right-container
	const rightContainer = document.createElement('div');
	rightContainer.id = 'right-container';

	// Fill it with inner HTML
	rightContainer.innerHTML = `
		<div id="rc-title-search-yt"></div>
		<img src="assets/banner.webp" width="100%">
		<form action="/search" method="GET">
			<input type="search" name="query" placeholder="Busqueda...">
			<button type="submit">Buscar</button>
		</form>
		<br>
	<iframe width="100%" height="215"
		src="https://www.youtube-nocookie.com/embed/videoseries?list=UULFpXpA76utFJBs9LdUHuhl-Q"
		title="YouTube Playlist"
		frameborder="0"
		allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
		allowfullscreen>
	</iframe>

		<figcaption>Ultimo video en Youtube</figcaption>

		<h2>Entradas</h2>
		<div id="rc-lastposts"></div>

		<h2>Categorias</h2>
		<div id="rc-categories"></div>
	`;

	mainContainer.appendChild(rightContainer);

	rcfetchAndDisplayPosts('ItsZariep', 'itszariep.github.io', 'posts', 'rc-lastposts');
	rcfetchAndDisplayCategories('ItsZariep', 'itszariep.github.io', 'categories', 'rc-categories');
}
