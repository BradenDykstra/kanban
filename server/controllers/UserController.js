import express from 'express'
import UserService from '../services/UserService'

let _userService = new UserService().repository

export default class UserController {
  constructor() {
    this.router = express.Router()
      .get('/:email', this.getUserByEmail)
  }

  async getUserByEmail(req, res, next) {
    try {
      let data = await _userService.findOne({ email: req.params.email })

      return res.send(data)
    }
    catch (err) { next(err) }
  }
}