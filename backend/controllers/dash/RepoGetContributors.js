const RepoGetContributors = async (owner, name, octokit) => {
  console.log("Getting Contributors...");
  const repoMessage = await octokit.request(
    "GET /repos/{owner}/{repo}/contributors",
    {
      owner: owner,
      repo: name,
      page: 1,
      per_page: 100,
    }
  );

  /** const the contribute's numbers */
  var contribute_number = 0;
  for (var i = 0; i < repoMessage.data.length; i++) {
    contribute_number += repoMessage.data[i].contributions;
  }
  var result = [];
  var num = 0;
  for (var i = 0; i < repoMessage.data.length; i++) {
    try {
      const userMessage = await octokit.request("GET /users/{username}", {
        username: repoMessage.data[i].login,
      });
      var active = true;
      if (num / contribute_number > 0.8)
        active = false

      var ss = {
        name: repoMessage.data[i].login,
        avatar_url: repoMessage.data[i].avatar_url,
        contributions: repoMessage.data[i].contributions,
        company: userMessage.data.company,
        public_repos: userMessage.data.public_repos,
        public_gists: userMessage.data.public_gists,
        followers: userMessage.data.followers,
        created_at: userMessage.data.created_at,
        is_active: active
      };
      result.push(ss);
      num += repoMessage.data[i].contributions;
    } catch (err) { }
  }
  return result;
};

module.exports = RepoGetContributors;