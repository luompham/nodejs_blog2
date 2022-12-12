const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

//Slug updater init
mongoose.plugin(slug);

const Course = new Schema(
  {
    name: { type: String, require: true },
    description: { type: String, maxLength: 600 },
    image: { type: String, maxLength: 255 },
    videoId: { type: String, maxLength: 600 },
    level: { type: String, maxLength: 255 },
    slug: { type: String, slug: 'name', unique: true },
    // createdAt: { type: Date, default: Date.now },
    // updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
);


//soft delete init
Course.plugin(mongooseDelete, { overrideMethods: 'all' }, { deletedAt: true });

module.exports = mongoose.model('Course', Course);
