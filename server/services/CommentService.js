import mongoose from "mongoose"
// import CommentService from './CommentService'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

// let _commentRepo = new CommentService().repository

let _schema = new Schema({
  body: { type: String, required: true },
  authorId: { type: ObjectId, ref: 'User', required: true },
  taskId: { type: ObjectId, ref: 'Task', required: true },
  boardId: { type: ObjectId, ref: 'Board', required: true },
  listId: { type: ObjectId, ref: 'List', required: true }
}, { timestamps: true })

//CASCADE ON DELETE
_schema.pre('findOneAndRemove', function (next) {
  //lets find all the lists and remove them
  Promise.all([
    // _commentRepo.deleteMany({ boardId: this._conditions._id })
  ])
    .then(() => next())
    .catch(err => next(err))
})

export default class CommentService {
  get repository() {
    return mongoose.model('Comment', _schema)
  }
}