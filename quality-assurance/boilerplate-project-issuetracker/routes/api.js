'use strict';

const mongoose = require('mongoose');

// Mongoose config
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
mongoose.connect(process.env.MONGO_URI, clientOptions);

const issueSchema = new mongoose.Schema({
  issue_title: { type: String, required: true },
  issue_text: { type: String, required: true },
  created_by: { type: String, required: true },
  assigned_to: String,
  open: { type: Boolean, default: true },
  status_text: String,
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true }
}, { 
  timestamps: {
    createdAt: 'created_on',
    updatedAt: 'updated_on'
  }
});

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }
});

projectSchema.virtual('issues', {
  ref: 'Issue',
  localField: '_id',
  foreignField: 'project'
});

const Project = mongoose.model('Project', projectSchema);
const Issue = mongoose.model('Issue', issueSchema);

// API Definitions
module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      let project = req.params.project;
    
      Project
        .findOne({name: project})
        .populate('issues')
        .then(found => {
          if (!found) return res.json([]);
            
          res.json(found.issues)
        })
        .catch(err => {
          res.json({error: err, task: 'project.get'});
        });
    })
    
    .post(function (req, res){
      let project = req.params.project;

      Project
        .findOneAndUpdate(
          {name: project},
          {},
          {upsert: true, new: true, setDefaultsOnInsert: true}
        )
        .then(found => {
          let issue = new Issue({
            project: found._id,
            issue_title: req.body.issue_title,
            issue_text: req.body.issue_text,
            created_by: req.body.created_by,
            assigned_to: req.body.assigned_to,
            status_text: req.body.status_text
          });

          issue
            .save()
            .then(saved => res.json({data: saved}))
            .catch(err => res.json({error: err, task: 'issue.save'}));
        })
        .catch(err => res.json({error: err, task: 'project.upsert'}));
    })
    
    .put(function (req, res){
      let project = req.params.project;

      Issue
        .findOne({ _id: req.body._id })
        .populate('project')
        .then(issue => {
          if (issue.project.name !== project) return res.json({"error": "issue not found in project", "task": "issue.update"});

          if (req.body.issue_title && req.body.issue_title !== "") issue.issue_title = req.body.issue_title;
          if (req.body.issue_text && req.body.issue_text !== "") issue.issue_text = req.body.issue_text;
          if (req.body.created_by && req.body.created_by !== "") issue.created_by = req.body.created_by;
          if (req.body.assigned_to && req.body.assigned_to !== "") issue.assigned_to = req.body.assigned_to;
          if (req.body.status_text && req.body.status_text !== "") issue.status_text = req.body.status_text;
          issue.open = req.body.open ? false: true; // if not checked, the value isn't posted

          issue
            .save()
            .then(issue => res.json({status: 'successfully updated issue', id: issue._id }))
            .catch(err => res.json({error: err, task: "issue.update"}));
        })
        .catch(err => res.json({error: err, task: 'issue.update'}));
    })
    
    .delete(function (req, res){
      let project = req.params.project;
      Issue
        .findOne({ _id: req.body._id })
        .populate('project')
        .then(issue => {
          if (issue.project.name !== project) return res.json({"error": "issue not found in project", "task": "issue.delete"});
          issue
            .deleteOne()
            .then(issue => res.json({status: 'successfully deleted issue', id: issue._id }))
            .catch(err => res.json({error: err, task: 'issue.delete'}));
        })
        .catch(err => res.json({error: err, task: 'issue.delete'}));
    });
    
};
