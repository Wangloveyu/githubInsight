const RepoSchema = require('../models/repo') // database shcema
const ObjectId = require('mongodb').ObjectId // Objected Id
const { Octokit } = require('@octokit/core') // GitHub API
const res = require('express/lib/response')
const { RepoGetPullRequests, RepoGetCommitFrequency, RepoGetContributors, RepoGetIssueFrequency, RepoGetLanguage, RepoGetReleaseTime } = require('./dash/index')

const octokit = new Octokit({
  auth: `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`
})

const AddRepo = async (owner, repo, user) => {
  console.log('Getting Message...')
  var newRepo = {}
  try {
    const repoMessage = await octokit.request('GET /repos/{owner}/{repo}', {
      owner: owner, // owner
      repo: repo // repoName
    })
    newRepo = {
      base: repoMessage,
      name: repoMessage.data.name, // name
      owner: repoMessage.data.owner.login, // login
      uploader: user, // user
      forks: repoMessage.data.forks,
      stars: repoMessage.data.watchers,
      open_issues: repoMessage.data.open_issues,
    //  commit_frequency: await RepoGetCommitFrequency(repoMessage.data.owner.login, repoMessage.data.name, octokit),
      issue_frequency: await RepoGetIssueFrequency(repoMessage.data.owner.login, repoMessage.data.name, octokit),
      contributors: await RepoGetContributors(repoMessage.data.owner.login, repoMessage.data.name, octokit),
      timeline: {
        created_at: repoMessage.data.created_at,
        updated_at: repoMessage.data.updated_at,
        pushed_at: repoMessage.data.pushed_at,
        recent_released_at: await RepoGetReleaseTime(repoMessage.data.owner.login, repoMessage.data.name, octokit)
      },
      language: await RepoGetLanguage(repoMessage.data.owner.login, repoMessage.data.name, octokit),
      pull_requests: await RepoGetPullRequests(repoMessage.data.owner.login, repoMessage.data.name, octokit)
    }
  } catch (err) {
    console.log(err)
    newRepo = "err";
  }
  return newRepo
}

const GetMessage = async (req, res) => {
  console.log('Getting Message...')
  console.log('Getting Message...')
  var newRepo = {}
  try{
    newRepo = await AddRepo(req.body.owner, req.body.repoName, req.body.user)
  }catch(err){}
  if(newRepo!=="err"){
    await RepoSchema.create(newRepo)
    res.status(201).json({ status: 'success!' })
  }
  else
    res.status(404).json({err:"server err"})
}

const SearchRepoName = async (req, res) => {
  try {
    const SearchKey = req.body.search.trim()
    if (SearchKey == '') {
      var search = await RepoSchema.find({})
    } else
      search = await RepoSchema.find({
        name: { $regex: SearchKey, $options: '$i' }
      })
    var repos = []
    for (var i in search) {
      var eachRepo = {
        _id: search[i]._id.toString(),
        name: search[i].name,
        owner: search[i].owner,
        stars: search[i].stars,
        uploader: search[i].uploader,
        uploaded_time: search[i]._id.getTimestamp()
      }
      repos.push(eachRepo)
    }
    console.log(repos)

    return res.status(201).json({ repos })
  } catch (err) {
    res.status(404).json(err)
  }
}

const GetDashboard = async (req, res, octokit) => {
  try {
    const detail = await RepoSchema.findOne({ _id: ObjectId(req.body.id) })
    res.status(201).json({ detail })
  } catch (err) {
    res.status(404).json(err)
  }
}

const DeleteRepo = async (req, res) => {
  try {
    const test = await RepoSchema.deleteOne({ _id: ObjectId(req.body.id) })
    res.status(201).json({ msg: 'success!' })
  } catch (err) {
    res.status(404).json(err)
  }
}

const UpdateRepo = async (req, res) => {
  try {
    var oldinfo = await RepoSchema.findOne({ _id: ObjectId(req.body.id) }, { name: 1, owner: 1, uploader: 1 })
    const newRepo = await AddRepo(oldinfo.owner, oldinfo.name, oldinfo.uploader)
    RepoSchema.findOneAndReplace({ _id: ObjectId(req.body.id) }, newRepo)
    res.status(201).json({ msg: 'success!' })
  } catch (err) {
    res.status(404).json(err)
  }
}

module.exports = {
  GetMessage,
  SearchRepoName,
  GetDashboard,
  DeleteRepo,
  UpdateRepo
}
