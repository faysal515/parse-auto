import fs from 'fs'
import {
  createUser,
  login,
  updateUserSchema,
  createJobSchema,
  createCompanySchema,
  createCompany,
  associateUserInACompany,
  createJob,
  associateCompanyInAJob
} from './runner.js'
import company from "./models/company";

console.log('hello words')

// @todo check if argumens are passed properly
let obj = JSON.parse(fs.readFileSync(`./${process.env.seed}`, 'utf8'))

// console.log(obj)

/**
 * STEPS
 * 1. update user schema
 * 2. seed 5 user
 * 3. create company schema
 * 4. seed 3 company
 * 5. associate user with that company
 * 6. create job schema
 * 7. seed 3 job for each company
 * 8. associate company for each job
 *
 * */

let users = [],
  companies = [],
  jobs = []

let values = {}

let schema = updateUserSchema()
  .then(res1 => {
    return createCompanySchema()
  })
  .then(res2 => {
    return createJobSchema()
  })
  .catch(err => {
    console.log('error in promise chain', err.response.data)
  })

schema.then(res => {
  console.log('in the .. ')
  obj._User.forEach(user => {
    users.push(createUser(user))
  })

  obj.company.forEach(company => {
    companies.push(createCompany(company))
  })
  obj.job.forEach(job => {
    jobs.push(createJob(job))
  })


  Promise.all(users)
    .then(uv => {
      values.users = uv
      return Promise.all(companies)
    })
    .then(cv => {
      values.companies = cv
      return Promise.all(jobs)
    })
    .then(jv => {
      values.jobs = jv
      console.log('>>> ', values.users)
      return Promise.all([
        associateUserInACompany(values.users[0].objectId, values.companies[0].objectId),
        associateUserInACompany(values.users[1].objectId, values.companies[1].objectId),
        associateUserInACompany(values.users[1].objectId, values.companies[2].objectId)
      ])
    })
    .then(result => {
      Promise.all([
        associateCompanyInAJob(values.jobs[0].objectId, values.companies[0].objectId),
        associateCompanyInAJob(values.jobs[1].objectId, values.companies[0].objectId),
        associateCompanyInAJob(values.jobs[2].objectId, values.companies[1].objectId)
      ])
    })
    .catch(error => {
      console.log('HUGE PROMISE CHAIN FAILS', error)
    })
})
  .catch(err => {
    console.log('schema create fails', err)
  })





//associateUserInACompany('7b3NO7r8g7','9MkkNCdheC')