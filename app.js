const express = require('express');
const mongoose=require('mongoose');
const app=(express());

//when data is coming from client
app.use(express.json());
app.use(express.urlencoded({extended:true}));

require("./database/db")

const customerRoute=require("./router/customerRouter");
app.use(customerRoute);

const donerRoute=require("./router/donerRouter");
app.use(donerRoute);

const organizationRouter=require("./router/organizationRouter");
app.use(organizationRouter);

app.listen(90);