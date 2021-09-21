const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../index');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  suite("POST tests /api/issues/{project}", function() {

    test("Create an issue with every field", function(done){
      chai
      .request(server)
      .post("/api/issues/test")
      .send({issue_title: "test title", issue_text: "test text", created_by: "test author", assigned_to: "test assign", status_text: "test status"})
      .end(function(err, res) {
        assert.equal(res.status, 200)
        assert.equal(res.body.issue_title, "test title")
        assert.equal(res.body.issue_text, "test text")
        assert.equal(res.body.created_by, "test author")
        assert.equal(res.body.assigned_to, "test assign")
        assert.equal(res.body.status_text, "test status")
        assert.isDefined(res.body.created_on)
        assert.isDefined(res.body.updated_on)
        assert.isDefined(res.body.open)
        done()
      })
    })
    test("Create an issue with only required fields", function(done){
      chai
      .request(server)
      .post("/api/issues/test")
      .send({issue_title: "test title", issue_text: "test text", created_by: "test author"})
      .end(function(err,res){
        assert.equal(res.status, 200)
        assert.equal(res.body.issue_title, "test title")
        assert.equal(res.body.issue_text, "test text")
        assert.equal(res.body.created_by, "test author")
        assert.isDefined(res.body.created_on)
        assert.isDefined(res.body.updated_on)
        assert.isDefined(res.body.open)
        done()
      })
    })
    test("Create an issue with missing required fields", function(done){
      chai
      .request(server)
      .post("/api/issues/test")
      .send({issue_title: "test title"})
      .end(function(err, res){
        assert.equal(res.status, 200)
        assert.equal(res.text, '{"error":"required field(s) missing"}')
        done()
      })
    })
  })

  suite("GET tests", function() {
    test("View issues on a project", function(done){
      chai
      .request(server)
      .get("/api/issues/test")
      .end(function(err,res){
        assert.equal(res.status, 200)
        assert.isArray(res.body)
        done()
      })
    })
    test("View issues on a project with one filter", function(done){
      chai
      .request(server)
      .get("/api/issues/test")
      .query({issue_title: "test title"})
      .end(function(err, res){
        assert.equal(res.status, 200)
        assert.isArray(res.body)
        assert.equal(res.body[0].issue_text, "test text")
        assert.equal(res.body[0].open, true)
        done()
      })
    })
    test("View issues on a project with multiple filters", function(done){
      chai
      .request(server)
      .get("/api/issues/test")
      .query({issue_title: "test title", issue_text: "test text"})
      .end(function(err, res){
        assert.equal(res.status, 200)
        assert.isArray(res.body)
        assert.equal(res.body[0].issue_text, "test text")
        assert.equal(res.body[0].status_text, "test status")
        done()
      })
    })
  })

  suite("PUT tests", function() {

    test("Update one field on an issue", function(done){
      chai
      .request(server)
      .put("/api/issues/test")
      .send({"_id":"606ae54a59e1f70390896c49", issue_title:"new title"})
      .end(function(err, res){
        assert.equal(res.status, 200)
        assert.equal(res.text, '{"result":"successfully updated","_id":"606ae54a59e1f70390896c49"}')
        done()
      })
    })
    test("Update multiple fields on an issue", function(done){
      chai
      .request(server)
      .put("/api/issues/test")
      .send({"_id":"606ae54a59e1f70390896c49", issue_title:"new title", issue_text: "new text"})
      .end(function(err, res){
        assert.equal(res.status, 200)
        assert.equal(res.text, '{"result":"successfully updated","_id":"606ae54a59e1f70390896c49"}')
        done()
      })
    })
    test("Update an issue with missing _id", function(done){
      chai
      .request(server)
      .put("/api/issues/test")
      .send({issue_title:"new title", issue_text: "new text"})
      .end(function(err, res){
        assert.equal(res.status, 200)
        assert.equal(res.text, '{"error":"missing _id"}')
        done()
      })
    })
    test("Update an issue with no fields", function(done){
      chai
      .request(server)
      .put("/api/issues/test")
      .send({"_id":"606ae54a59e1f70390896c49"})
      .end(function(err, res){
        assert.equal(res.status, 200)
        assert.equal(res.text, '{"error":"no update field(s) sent","_id":"606ae54a59e1f70390896c49"}')
        done()
      })
    })
    test("Update an issue with an invalid _id", function(done){
      chai
      .request(server)
      .put("/api/issues/test")
      .send({"_id":"406ae54a59e1f77390896c48",issue_title:"new title"})
      .end(function(err, res){
        assert.equal(res.status, 200)
        assert.equal(res.text, '{"error":"could not update","_id":"406ae54a59e1f77390896c48"}')
        done()
      })
    })

  })
  suite("DELETE tests", function() {

    test("Delete an issue", function(done){
      chai
      .request(server)
      .delete("/api/issues/test")
      .send({"_id":"606ae7ab6f8af404395e7013"})
      .end(function(err, res){
        assert.equal(res.status, 200)
        assert.equal(res.text, '{"result":"successfully deleted","_id":"606ae7ab6f8af404395e7013"}')
        done()
      })
    })
    test("Delete an issue with an invalid _id", function(done){
      chai
      .request(server)
      .delete("/api/issues/test")
      .send({"_id":"506aeeb8d347e70938f6d451"})
      .end(function(err, res){
        assert.equal(res.status, 200)
        assert.equal(res.text, '{"error":"could not delete","_id":"506aeeb8d347e70938f6d451"}')
        done()
      })
    })
    test ("Delete an issue with missing _id", function(done){
      chai
      .request(server)
      .delete("/api/issues/test")
      .send({})
      .end(function(err, res){
        assert.equal(res.status, 200)
        assert.equal(res.text, '{"error":"missing _id"}')
        done()
      })
    })

  })




});
