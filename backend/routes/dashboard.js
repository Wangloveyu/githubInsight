const express = require('express')
const router = express.Router()

const { GetMessage, SearchRepoName, GetDashboard, DeleteRepo, UpdateRepo } = require('../controllers/dash')
const { CheckUser, CreateUser } = require('../controllers/user')

router.route('/import').post(GetMessage)
router.route('/login').post(CheckUser)
router.route('/register').post(CreateUser)
router.route('/search').post(SearchRepoName)
router.route('/dashboard').post(GetDashboard)
router.route('/delete').post(DeleteRepo)
router.route('/update').post(UpdateRepo)

module.exports = router
