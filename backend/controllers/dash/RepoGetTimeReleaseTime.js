const RepoGetReleaseTime = async (owner, name,octokit) => {
  console.log("Getting TimeLines...");
    const repoMessage = await octokit.request(
      "GET /repos/{owner}/{repo}/releases",
      {
        owner: owner,
        repo: name,
      }
    );
    if (!repoMessage.data.length) return "not published yet!";
    return repoMessage.data[0].published_at;
};

module.exports =  RepoGetReleaseTime;