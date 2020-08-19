module.exports = function Timestamp(Model, options) {

    Model.defineProperty('createdAt', { type: Date, default: '$now'});
    Model.defineProperty('updatedAt', { type: Date, default: '$now'})
};