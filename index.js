import axios from 'axios'
import _User from './models/account.js'

console.log('hello words')

/*
axios.get('http://localhost:1337/parse/login?username=faysal&password=password',
  {
    headers: {
      'X-Parse-Application-Id': 'myAppId'
    }
  }
  ).then(res => {
    console.log('logged in', res.data)
})*/

axios.put('http://localhost:1337/parse/schemas/_User',
  _User,
  {
    headers: {
      'X-Parse-Application-Id': 'myAppId',
      'X-Parse-Master-Key': 'master'
    }
  }
).then(res => {
  console.log('schema updated in', res.data)
})
  .catch(err => {
    console.log('errro', err)
  })
