
const fs = require('fs');
const https = require('https');
const path = require('path');

// Load .env.local if it exists
try {
    const envPath = path.resolve(__dirname, '../.env.local');
    if (fs.existsSync(envPath)) {
        const envConfig = fs.readFileSync(envPath, 'utf8');
        envConfig.split('\n').forEach(line => {
            const [key, value] = line.split('=');
            if (key && value) {
                process.env[key.trim()] = value.trim();
            }
        });
    }
} catch (e) {
    // Ignore error if .env.local doesn't exist
}

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = '6ixthxense';

if (!GITHUB_TOKEN) {
    console.error('Error: GITHUB_TOKEN is not defined in environment variables or .env.local');
    console.error('Please create a Personal Access Token with "repo" scope and add it to .env.local');
    process.exit(1);
}

const query = `
  query($userName:String!) {
    user(login: $userName){
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
              color
            }
          }
        }
      }
    }
  }
`;

const options = {
    hostname: 'api.github.com',
    path: '/graphql',
    method: 'POST',
    headers: {
        'Authorization': `bearer ${GITHUB_TOKEN}`,
        'User-Agent': 'node.js',
        'Content-Type': 'application/json',
    }
};

const req = https.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        if (res.statusCode !== 200) {
            console.error(`Error: GitHub API returned status ${res.statusCode}`);
            console.error(data);
            process.exit(1);
        }

        try {
            const json = JSON.parse(data);

            if (json.errors) {
                console.error('GraphQL Error:', json.errors);
                process.exit(1);
            }

            const calendar = json.data.user.contributionsCollection.contributionCalendar;

            // Transform to react-activity-calendar format
            // It expects an array of activities: { date: "YYYY-MM-DD", count: 12, level: 0-4 }
            const activities = [];

            calendar.weeks.forEach(week => {
                week.contributionDays.forEach(day => {
                    // Calculate level based on count (GitHub uses color but react-activity-calendar uses levels 0-4)
                    // Rough approximation or just use count
                    // Actually, react-activity-calendar calculates level automatically from count if we provide count.
                    // But we can also provide explicit level if we want to match GitHub colors EXACTLY.
                    // For now, let's just provide date and count, and let the library handle levels.

                    activities.push({
                        date: day.date,
                        count: day.contributionCount,
                        level: getLevel(day.contributionCount)
                    });
                });
            });

            const output = {
                totalContributions: calendar.totalContributions,
                weeks: calendar.weeks, // Keep original structure just in case
                activities: activities, // Flattened for react-activity-calendar
                lastUpdated: new Date().toISOString()
            };

            const outputPath = path.resolve(__dirname, '../src/data/github-contributions.json');
            fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
            console.log(`Successfully fetched ${calendar.totalContributions} contributions!`);
            console.log(`Data saved to ${outputPath}`);

        } catch (e) {
            console.error('Error parsing JSON:', e);
            process.exit(1);
        }
    });
});

req.on('error', (e) => {
    console.error('Request error:', e);
    process.exit(1);
});

req.write(JSON.stringify({
    query,
    variables: { userName: GITHUB_USERNAME }
}));

req.end();

function getLevel(count) {
    if (count === 0) return 0;
    if (count <= 3) return 1;
    if (count <= 6) return 2;
    if (count <= 9) return 3;
    return 4;
}
