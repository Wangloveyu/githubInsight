const RepoGetPullRequests = require("./RepoGetPullRequests");
const RepoGetCommitFrequency = require("./RepoGetCommitFrequency");
const RepoGetContributors  = require("./RepoGetContributors");
const RepoGetIssueFrequency  = require("./RepoGetIssueFrequency");
const RepoGetReleaseTime  = require("./RepoGetTimeReleaseTime");
const RepoGetLanguage = require("./RepoGetLanguage");

module.exports = {
    RepoGetPullRequests,
    RepoGetCommitFrequency,
    RepoGetContributors,
    RepoGetIssueFrequency,
    RepoGetLanguage,
    RepoGetReleaseTime
}