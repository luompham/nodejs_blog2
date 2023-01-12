const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;
const Role = require('./Role')

//Slug updater init
mongoose.plugin(slug);

const userSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Role
      }
    ]
  }
);


//soft delete init
//User.plugin(mongooseDelete, { overrideMethods: 'all' }, { deletedAt: true });

module.exports = mongoose.model('User', userSchema);
