import _listService from '../services/ListService'
import express from 'express'
import { Authorize } from '../middleware/authorize.js'
import _taskService from '../services/TaskService'

let listRepo = new _listService().repository
let taskRepo = new _taskService().repository

//PUBLIC
export default class ListController {
  constructor() {
    this.router = express.Router()
      .use(Authorize.authenticated)
      .get('', this.getAll)
      .get('/:id/tasks', this.getTasksById)
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
      let data = await listRepo.find()
      return res.send(data)
    }
    catch (err) { next(err) }
  }

  async getTasksById(req, res, next) {
    try {
      let data = await taskRepo.find({ listId: req.params.id })
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getListsById(req, res, next) {
    try {
      let data = await listRepo.find({ boardId: req.params.id })
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.authorId = req.session.uid
      let data = await listRepo.create(req.body)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }

  async edit(req, res, next) {
    try {
      let data = await listRepo.findOneAndUpdate({ _id: req.params.id, authorId: req.session.uid }, req.body, { new: true })
      if (data) {
        return res.send(data)
      }
      throw new Error("invalid id")
    } catch (error) { next(error) }
  }

  async delete(req, res, next) {
    try {
      await listRepo.findOneAndRemove({ _id: req.params.id, authorId: req.session.uid })
      return res.send("Successfully deleted")
    } catch (error) { next(error) }
  }
}
