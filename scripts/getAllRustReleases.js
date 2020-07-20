const { Octokit } = require('@octokit/core');
const { semanticVersion } = require('@semantics/semantic-version');

const getAllVersions = async (octokit) => {
  const response = await octokit.request('GET /repos/{owner}/{repo}/tags', {
    owner: 'rust-lang',
    repo: 'rust',
    per_page: 100,
  });
  const versions = response.data
    .map((tag) => semanticVersion(tag.name))
    .filter((version) => version.isValid())
    .filter((version) => version.isSameOrNewer('1.31'))
    .map((version) => version.toString());
  versions.sort(semanticVersion.compare);
  return versions;
};

(async () => {
  const octokit = new Octokit();
  const versions = await getAllVersions(octokit);
  console.log(versions.join('\n'));
})();
