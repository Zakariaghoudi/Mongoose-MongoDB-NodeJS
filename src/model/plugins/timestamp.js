
module.exports = function timeStamps (schema) {
    schema.add({
         createdAt: Date,
         updatedAt: Date
    });
    schema.pre('save', function (next) {
        const now = Date.now();
        next();
        this.updatedAt = now;
        if (!this.createdAt) {
            this.createdAt = now;
        }
        next();
    });
};
