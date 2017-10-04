import axios from 'axios'
import _User from './models/account.js'
import Job from './models/job.js'
import Company from './models/company.js'
import fs from 'fs'


let settings = JSON.parse(fs.readFileSync(`./${process.env.seed}`, 'utf8')).settings
let baseUrl = settings.parseUrl
let options = {
  headers: {
    'X-Parse-Application-Id': settings.appId,
    'X-Parse-Master-Key': settings.masterKey
  }
}

let simpleOptions = {
  headers: {
    'X-Parse-Application-Id': settings.appId
  }
}


//console.log('----', settings)

export function login(username, password) {
  axios.get(`${baseUrl}/login?username=${username}&password=${password}`,
    {
      headers: {
        'X-Parse-Application-Id': 'myAppId'
      }
    }
  ).then(res => {
    console.log('logged in', res.data)
  })

}


export function createUser(user) {
  return axios.post(`${baseUrl}/users`, user, options)
    .then(res => {
      console.log('usre created', res.data)
      return res.data
    })
    .catch(err => {
      console.log('user create fails', err.response.data)
      throw new Error('user create fails', err.response.data)
    })

}

export function updateUserSchema() {
  return axios.put(`${baseUrl}/schemas/_User`, _User, options)
  .then(res => {
      console.log(' user schema updated in', res.data)
  })
  .catch(err => {
      console.log('errro', err.response.data)
  })

}


export function createJobSchema() {
  return axios.post(`${baseUrl}/schemas/job`, Job, options
  ).then(res => {
    console.log(' JOB schema created in', res.data)
    return res.data
  })
    .catch(err => {
      console.log('JOB schema fails', err.response.data)
      throw new Error(err)
    })
}


export function createCompanySchema() {
  return axios.post(`${baseUrl}/schemas/company`, Company, options
  ).then(res => {
    console.log(' COMPANY schema created', res.data)
    return res.data
  })
    .catch(err => {
      console.log('COMPANY schema create fails', err.response.data)
      throw new Error(err)
    })

}


export function createCompany(company) {
  return axios.post(`${baseUrl}/classes/company`, company, simpleOptions)
    .then(res => {
      console.log('new company created', res.data)
      return res.data
    })
    .catch(err => {
      console.log('company create fails', err.response.data)
      throw new Error('company create fails')
    })

}

export function associateUserInACompany(userId,companyId) {

  let data = {
    "users": {
      "__op": "AddRelation",
      "objects": [
        {
          "__type": "Pointer",
          "className": "_User",
          "objectId": userId
        }
      ]
    }
  }


  axios.put(`${baseUrl}/classes/company/${companyId}/`, data, simpleOptions)
    .then(res => {
      console.log(`${userId} added in company ${companyId}`, res.data)
    })
    .catch(err => {
      console.log('user association fails', err.response.data)
    })

}


export function createJob(job) {
  return axios.post(`${baseUrl}/classes/job`, job, simpleOptions)
    .then(res => {
      console.log('new job created', res.data)
      return res.data
    })
    .catch(err => {
      console.log('job create fails', err.response.data)
      throw new Error('job create fails', err)
    })

}


export function associateCompanyInAJob(jobId, companyId) {

  let data = {
    "company": {
      "__op": "AddRelation",
      "objects": [
        {
          "__type": "Pointer",
          "className": "company",
          "objectId": companyId
        }
      ]
    }
  }


  axios.put(`${baseUrl}/classes/job/${jobId}/`, data, simpleOptions)
    .then(res => {
      console.log(`${companyId} associated with job ${jobId}`, res.data)
    })
    .catch(err => {
      console.log('company association in Job fails', err.response.data)
    })

}

