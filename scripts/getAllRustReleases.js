const { Octokit } = require('@octokit/core');

const compareVersion = (version1, version2) => {
  const v1 = version1.split('.').map((v) => parseInt(v, 10));
  const v2 = version2.split('.').map((v) => parseInt(v, 10));
  for (let i = 0; i < 3; i += 1) {
    if (v1[i] > v2[i]) {
      return 1;
    }
    if (v1[i] < v2[i]) {
      return -1;
    }
  }
  return 0;
};

const getAllVersions = async (octokit) => {
  const response = await octokit.request('GET /repos/{owner}/{repo}/tags', {
    owner: 'rust-lang',
    repo: 'rust',
    per_page: 100,
  });
  const regex = /^(\d+\.)?(\d+\.)?(\*|\d+)$/;
  const versions = response.data
    .map((tag) => tag.name)
    .filter((version) => regex.test(version))
    .filter((version) => compareVersion(version, '1.31.0') >= 0);
  versions.sort(compareVersion);
  return versions;
};

(async () => {
  const octokit = new Octokit();
  const versions = await getAllVersions(octokit);
  console.log(versions.join('\n'));
})();
