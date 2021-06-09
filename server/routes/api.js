'use strict';
const passport = require("passport")
const localStrategy = require("passport-local")
const ObjectId = require("mongodb").ObjectId

module.exports = function (app, myDataBase) {

  app.route("/api/issues/empty")
  
    .get((req, res) => {
      res.json({"error": "Project name missing..."})
    })

  app.route("/api/issues/addProject/:newProject")
    
    .post(function(req, res){

      let {newProject} = req.params

      const issue_title = "First commit"
      const issue_text = "Project added to data base"
      const created_by = req.query.user

      const date = new Date().toISOString()

      myDataBase.insertOne({
        issue_title: issue_title,
        issue_text: issue_text,
        created_by: created_by,
        created_on: date,
        open: false,
        project: newProject
  
        }, (err, issue) =>{
        if (err) {
          console.error(err)
          res.json({"error": "Internal Error... Please Try Again Later!"})
        }
        res.json(issue.ops[0])
            
      })
    })

  app.route('/api/issues/all')
    
    .get(function (req, res){
        let searchKey = {}
        myDataBase.find(searchKey).toArray((err, docs) => {
            if (err) console.error(err)
            res.send(docs)
        })
    })

  app.route('/api/issues/mytickets')
    
    .get(function (req, res){
      console.log("in get")

      if (req.query.assigned_to) {
        let {assigned_to} = req.query
        let searchKeyOne = {assigned_to: assigned_to}
        myDataBase.find(searchKeyOne).toArray((err, docs) => {
          if (err) console.error(err)
          res.send(docs)
        })

      } else if (req.query.created_by) {
        let {created_by} = req.query
        let searchKeyTwo = {created_by: created_by}

        myDataBase.find(searchKeyTwo).toArray((err, docs) => {
          if (err) console.error(err)
          res.send(docs)
        })
      }

    })
  
  app.route('/api/issues/:project')
  
    .get(function (req, res){

      let {project} = req.params;

      if (project){
        let searchKey = Object.assign({project: project}, req.query)

        if (req.query.open === "true"){
          searchKey.open = true
        } else if (req.query.open === "false"){
          searchKey.open = false
        }

        if (req.query._id){
          searchKey._id = new ObjectId(req.query._id)
        }

        myDataBase.find(searchKey).toArray((err, docs) =>{
          if (err) {
            console.error(err)
            res.json({"error": "Internal Error... Please Try Again Later!"})
          }
          
          res.send(docs)
        })

      } else {
        res.json({"error": "Project name missing..."})
      }
    })
    
    .post(function (req, res){

      let {project} = req.params;

      const {issue_title, issue_text, created_by, assigned_to, status_text} = req.body

      if (!issue_title || !issue_text || !created_by){

        res.json({ error: 'required field(s) missing' })

      } else{
        const date = new Date().toISOString()

        myDataBase.insertOne({
          issue_title: issue_title,
          issue_text: issue_text,
          created_by: created_by,
          assigned_to: assigned_to || "",
          status_text: status_text || "",
          created_on: date,
          updated_on: date,
          open: true,
          project: project

        }, (err, issue) =>{
          if (err) {
            console.error(err)
            res.json({"error": "Internal Error... Please Try Again Later!"})
          }
          res.json(issue.ops[0])
        })
      }
    })

    .put(function (req, res){
      
      let {project} = req.params;
      const id = req.body._id
      const open = (req.body.open === "false") ? false : true
      let searchKey = {project: project, _id: new ObjectId(id)}

      const issue_title = (req.body.issue_title) || ""
      const issue_text = (req.body.issue_text) || ""
      const created_by = (req.body.created_by) || ""
      const assigned_to = (req.body.assigned_to) || ""
      const status_text = (req.body.status_text) || ""

      if (!id){

        res.json({"error": "missing _id"})

      } else if (!issue_title && !issue_text && !created_by && !assigned_to && !status_text){

        res.json({ "error": 'no update field(s) sent', _id: id })

      } else {

        let idValidChecker = ObjectId.isValid(id)

        if (!idValidChecker) {

          res.json({error: "could not update", "_id": id})

        } else {

          myDataBase.countDocuments(searchKey, {limit:1}, (err, num) => {
            if (err) {
              console.log(err)
              res.json({"error": "Internal Error... Please Try Again Later!"})
            }

            if (!num) {

              res.json({error: "could not update", "_id": id})

            } else {

              myDataBase.findOneAndUpdate(
                searchKey,
                {
                  $set: {
                    issue_title: (issue_title),
                    issue_text: (issue_text),
                    created_by: (created_by),
                    assigned_to: (assigned_to),
                    status_text: (status_text),
                    updated_on: new Date().toISOString(),
                    open: open,
                    project: project
                  }
                },
                {"upsert": false, "new": true},
                (err,doc) => {

                  if (err){
                    console.error(err)
                    res.json({"error": "Internal Error... Please Try Again Later!"})
                  }

                  if (!doc) {

                    res.json({error: "could not update", "_id": id})

                  } else{
                    res.json({result: "successfully updated", "_id": id})
                  } 
                }
              )
            }
          })
        }
      }   
    })

    .delete(function (req, res){

      let {project} = req.params;
      let id = req.body._id
      let searchKey = {project: project, _id: new ObjectId(id)}

      if (!id) {

        res.json({ error: 'missing _id' })

      } else {

        myDataBase.countDocuments(searchKey, {limit:1}, (err, num) => {
          if (err) {
            res.json({ error: 'could not delete', '_id': id })
          }
          if (!num) {
            res.json({ error: 'could not delete', '_id': id })
          } else {

            myDataBase.deleteOne(searchKey, (err, obj) => {

              if (err) {

                res.json({ error: 'could not delete', '_id': id })
              }

              res.json({ result: 'successfully deleted', '_id': id })
            })
          }
        })
      }
    });

  // authentications

  const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      next()

    } else {
      res.redirect("/")
    }
  }

  app.route("/login")
    .post(passport.authenticate("local", {failureRedirect: "/loginerr"}),(req, res) => {
      res.json({"success": " user successfully authenticated", "user": req.user.username})
    })

  app.route("/loginerr")
    .get((req, res) => {
      res.json({"error": "username or password incorrect or user does not exist"})
    })

  app.route("/profile")
    .get(ensureAuthenticated, (req, res) => {
      res.json({"success": "user is successfully authenticated", "user": req.user.username})
    })

  app.route("/logout")
    .get((req, res) => {
      req.logout()
      res.json({"succes": "User loged out successfully"})
    })

};
