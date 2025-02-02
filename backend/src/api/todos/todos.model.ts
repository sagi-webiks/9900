import mongoose, { Schema, type Document } from 'mongoose';

export interface ITodo extends Document {
  id: string;
  geometry: {
    type: string;
    coordinates: [number, number] | [number, number][] | [number, number][][];
  };
  properties: Record<string, unknown>;
}

const todoSchema: Schema = new Schema(
  {
    geometry: {
      type: {
        type: String,
        required: true,
        enum: ['Point', 'LineString', 'Polygon', 'MultiPoint', 'MultiPolygon', 'MultiLineString'],
      },
      coordinates: {
        type: [Schema.Types.Mixed], 
        required: true,
      },
    },
    properties: {
      type: Schema.Types.Mixed,
      required: false,
    },
  },
  {   toJSON: { virtuals: true  }}
);

todoSchema.virtual('id').get(function (this: ITodo) {
  return (this._id as string)
} );

todoSchema.set('toJSON', { virtuals: true, transform: (doc, ret) => { ret._id = undefined; return ret; } });

todoSchema.index({ geometry: '2dsphere' });

const Todo = mongoose.model<ITodo>('Todo', todoSchema);

export default Todo;
