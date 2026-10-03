export interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string; url: string };
  created_at: string;
  payload?: {
    commits?: Array<{ message: string; sha: string }>;
  };
}

export interface GitHubStats {
  publicRepos: number;
  followers: number;
  following: number;
  recentEvents: Array<{
    id: string;
    repoName: string;
    message: string;
    date: string;
    type: string;
  }>;
}

export async function getGitHubStats(): Promise<GitHubStats> {
  const username = process.env.GITHUB_USERNAME || 'LVNVoid';
  const token = process.env.GITHUB_TOKEN;

  const headers: HeadersInit = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'Portfolio-Specimen-Cabinet',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const [userRes, eventsRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers,
        next: { revalidate: 300 }, // 5 min cache
      }),
      fetch(`https://api.github.com/users/${username}/events/public?per_page=10`, {
        headers,
        next: { revalidate: 300 },
      }),
    ]);

    if (!userRes.ok) {
      throw new Error(`GitHub user API returned ${userRes.status}`);
    }

    const userData = await userRes.json();
    const eventsData: GitHubEvent[] = eventsRes.ok ? await eventsRes.json() : [];

    const recentEvents = eventsData
      .filter((ev) => ev.type === 'PushEvent' || ev.type === 'CreateEvent')
      .slice(0, 6)
      .map((ev) => {
        const commitMsg = ev.payload?.commits?.[0]?.message || 'Repository activity update';
        return {
          id: ev.id,
          repoName: ev.repo.name.replace(`${username}/`, ''),
          message: commitMsg.split('\n')[0],
          date: ev.created_at,
          type: ev.type,
        };
      });

    return {
      publicRepos: userData.public_repos || 18,
      followers: userData.followers || 10,
      following: userData.following || 10,
      recentEvents,
    };
  } catch (error) {
    console.error('Failed to fetch GitHub telemetry:', error);
    return {
      publicRepos: 18,
      followers: 12,
      following: 8,
      recentEvents: [
        {
          id: 'mock-1',
          repoName: 'kopi-sangkara-pos',
          message: 'feat: add ESC/POS thermal printing over Web Bluetooth',
          date: new Date().toISOString(),
          type: 'PushEvent',
        },
        {
          id: 'mock-2',
          repoName: 'maganghub-bot-attendance',
          message: 'fix: forward proxy connection pool bypass for Kemnaker SSO',
          date: new Date(Date.now() - 3600000 * 24).toISOString(),
          type: 'PushEvent',
        },
        {
          id: 'mock-3',
          repoName: 'timkurator-kusumahadisantosa',
          message: 'docs(vault): update legal disclosure documents',
          date: new Date(Date.now() - 3600000 * 48).toISOString(),
          type: 'PushEvent',
        },
      ],
    };
  }
}
