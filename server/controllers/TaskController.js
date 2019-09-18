import _taskService from '../services/TaskService'
import express from 'express'
import { Authorize } from '../middleware/authorize.js'
import _commentService from '../services/CommentService'

let taskRepo = new _taskService().repository
let commentRepo = new _commentService().repository

//PUBLIC
export default class TaskController {
  constructor() {
    this.router = express.Router()
      .use(Authorize.authenticated)
      .get('', this.getAll)
      .get('/:id/comments', this.getComments)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
      .use(this.defaultRoute)
  }

  defaultRoute(req, res, next) {
    next({ status: 404, message: 'No Such Route' })
  }

  async getAll(req, res, next) {
    try {
      //only gets boards by user who is logged in
      let data = await taskRepo.find({ listId: req.body.listId })
      return res.send(data)
    }
    catch (err) { next(err) }
  }

  async getComments(req, res, next) {
    try {
      let data = await commentRepo.find({ taskId: req.params.id })
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.authorId = req.session.uid
      let data = await taskRepo.create(req.body)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }

  async edit(req, res, next) {
    try {
      let data = await taskRepo.findOneAndUpdate({ _id: req.params.id, authorId: req.session.uid }, req.body, { new: true })
      if (data) {
        return res.send(data)
      }
      throw new Error("invalid id")
    } catch (error) { next(error) }
  }

  async delete(req, res, next) {
    try {
      await taskRepo.findOneAndRemove({ _id: req.params.id, authorId: req.session.uid })
      return res.send("Successfully deleted")
    } catch (error) { next(error) }
  }
}
