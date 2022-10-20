const express = require('express');
const {faker} = require('@faker-js/faker');

const router = express.Router();

router.get('/',(req,res)=>{
  const {limit, offset}= req.query;
  const size = limit || 10;
  const users=[]
  for(let i=0;i<size;i++){
    users.push({
      "name": faker.name.firstName(),
      "lastName": faker.name.lastName(),
      "job": faker.name.jobType()
    })
  }
  res.json({
    "offset": offset||0,
    users:users
  });
});

router.post('/',(req,res)=>{
  const body = req.body;
  res.json({
    message: 'created',
    data: body
  });
});

router.patch('/:id', (req,res)=>{
  const {id} = req.params;
  const body = req.body;
  res.json({
    message: 'updated',
    id,
    data: body
  });
});

module.exports = router;
