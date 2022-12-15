const RepoGetLanguage = async (owner, name,octokit) => {
   console.log("Getting Languages");
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