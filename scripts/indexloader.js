

/**
 * Extracts date from filename (format: YYYY.MM.DD-title)
 * @param {string} filename - The filename to extract date from
 * @returns {string|null} - The extracted date in YYYY-MM-DD format, or null if not found
 */
function extractDateFromFilename(filename)
{
	const datePattern = /^(\d{4}\.\d{2}\.\d{2})/;
	const match = filename.match(datePattern);

	if (match && match[1])
	{
		// Convert from YYYY.MM.DD to YYYY-MM-DD for Date object
		return match[1].replace(/\./g, '-');
	}

	return null;
}

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
		// Convert hyphen-case to spaced words and capitalize
		return match[1]
			.replace(/-/g, ' ')
			.replace(/\b\w/g, char => char.toUpperCase());
	}
	
	return 'Untitled Post';
}

/**
 * Formats a date string into a readable format
 * @param {string} dateStr - The date string in YYYY-MM-DD format
 * @returns {string} - Formatted date string
 */
function formatDate(dateStr)
{
	if (!dateStr) return '';
	const date = new Date(dateStr);
	const options = { year: 'numeric', month: 'long', day: 'numeric' };
	const systemLocale = navigator.language || 'en-US';
	return date.toLocaleDateString(systemLocale, options);
}

/**
 * Fetches and displays posts from a GitHub repository
 * @param {string} repoOwner - The GitHub repository owner's username
 * @param {string} repoName - The repository name
 * @param {string} postsPath - The path to the posts directory within the repository
 * @param {string} realPath - The path to the posts directory within the repository
 */
async function fetchAndDisplayPosts(repoOwner, repoName, postsPath, realPath)
{
	const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${postsPath}`;
	const postsContainer = document.getElementById('posts-container');

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
			if (/*post.type === 'dir'*/ 1)
			{
				const postName = post.name;
				const dateStr = extractDateFromFilename(postName);
				const title = extractTitleFromFilename(postName);

				// Create link element that wraps the post card
				const linkElement = document.createElement('a');
				linkElement.href = `https://${repoName}/posts/${postName}`;
				linkElement.className = 'post-link';
				//linkElement.target = '_blank';


				const postElement = document.createElement('article');
				postElement.className = 'post-card';

				const imageUrl = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/main/${realPath}/${postName}/preview.jpg`;
				const imageElement = document.createElement('img');
				imageElement.src = imageUrl;
				imageElement.alt = title;
				imageElement.className = 'post-image';

				const formattedDate = formatDate(dateStr);

				const infoContainer = document.createElement('div');
				infoContainer.className = 'post-info';


				const dateElement = document.createElement('div');
				dateElement.className = 'post-date';
				dateElement.textContent = formattedDate;


				const titleElement = document.createElement('h2');
				titleElement.className = 'post-title';
				titleElement.textContent = title;

				infoContainer.appendChild(dateElement);
				infoContainer.appendChild(titleElement);

				postElement.appendChild(imageElement);
				postElement.appendChild(infoContainer);

				linkElement.appendChild(postElement);
				postsContainer.appendChild(linkElement);
			}
		});
	}
	catch (error)
	{
		console.error('Error fetching posts:', error);
		postsContainer.innerHTML = `<div class="error-message">Failed to load posts: ${error.message}</div>`;
	}
}
