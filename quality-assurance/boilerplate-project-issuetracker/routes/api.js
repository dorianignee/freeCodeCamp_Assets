'use strict';

const mongoose = require('mongoose');

// Mongoose config
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
mongoose.connect(process.env.MONGO_URI, clientOptions);

const issueSchema = new mongoose.Schema({
  issue_title: { type: String, required: true },
  issue_text: { type: String, required: true },
  created_by: { type: String, required: true },
  assigned_to: { type:  String, default: "" },
  open: { type: Boolean, default: true },
  status_text: { type:  String, default: "" },
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
        .then(found => {
          if (!found) return res.json([]);

          req.query.project = found._id;

          Issue
            .find(req.query)
            .then(issues => res.json(issues))
            .catch(() => res.json([]));
        })
        .catch(err => {
          res.json({error: err, task: 'project.get'}); // shouldn't happen
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
            .save() // TODO: What happens on missing required fields?
            .then(saved => res.json(saved))
            .catch(() => res.json({error: 'could not insert'}));
        })
        .catch(() => res.json({error: 'could not insert'}));
    })
    
    .put(function (req, res){
      let project = req.params.project;
      let id = req.body._id

      if (!id) return res.json({"error": 'missing _id'});

      Issue
        .findOne({ _id: id })
        .populate('project')
        .then(issue => {
          if (issue.project.name !== project) return res.json({"error": "could not update", _id: id });

          if (req.body.issue_title && req.body.issue_title !== "") issue.issue_title = req.body.issue_title;
          if (req.body.issue_text && req.body.issue_text !== "") issue.issue_text = req.body.issue_text;
          if (req.body.created_by && req.body.created_by !== "") issue.created_by = req.body.created_by;
          if (req.body.assigned_to && req.body.assigned_to !== "") issue.assigned_to = req.body.assigned_to;
          if (req.body.status_text && req.body.status_text !== "") issue.status_text = req.body.status_text;
          issue.open = req.body.open ? false: true; // if not checked, the value isn't posted

          console.log(issue.getChanges()) // TODO: What happens when nothing is changed
          issue
            .save()
            .then(issue => res.json({status: 'successfully updated', _id: id }))
            .catch(() => res.json({error: "could not update", _id: id }));
        })
        .catch(() => res.json({error: "could not update", _id: id }));
    })
    
    .delete(function (req, res){
      let project = req.params.project;
      let id = req.body._id

      if (!id) return res.json({"error": 'missing _id'});

      Issue
        .findOne({ _id: id })
        .populate('project')
        .then(issue => {
          if (issue.project.name !== project) return res.json({"error": "could not delete", _id: id});
          issue
            .deleteOne()
            .then(issue => res.json({status: 'successfully deleted', _id: issue._id }))
            .catch(err => res.json({"error": "could not delete", _id: id}));
        })
        .catch(err => res.json({"error": "could not delete", _id: id}));
    });
    
};
