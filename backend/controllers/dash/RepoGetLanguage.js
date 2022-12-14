const RepoGetLanguage = async (owner, name,octokit) => {
    const repoMessage = await octokit.request(
      "GET /repos/{owner}/{repo}/languages",
      {
        owner: owner,
        repo: name,
      }
    );
    return repoMessage.data;
};

module.exports =  RepoGetLanguage;