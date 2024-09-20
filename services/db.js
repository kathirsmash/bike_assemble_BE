
class DbService {

    create = async (connectionName, modelName, payload) => {
        try {
            return await connectionName[modelName].create(payload);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    insertMany = async (connectionName, modelName, payload = []) => {
        try {
            return await connectionName[modelName].insertMany(payload);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    find = async (connectionName, modelName, query = {}, fields = {}, populate = [], sort = {}, collation = {}, limit = 0, skip = 0) => {
        try {
            const dbQuery = connectionName[modelName].find(query, fields);
            if (Object.keys(sort).length) {
                dbQuery.sort(sort);
            }
            if (Object.keys(collation).length) {
                dbQuery.collation(collation);
            }
            if (limit > 0) {
                dbQuery.limit(limit);
            }
            if (skip > 0) {
                dbQuery.skip(skip);
            }
            populate.forEach(option => {
                dbQuery.populate(option);
            });
            return await dbQuery.exec();
        } catch (error) {
            return Promise.reject(error);
        }
    }

    findById = async (connectionName, modelName, id, fields = {}, populate = []) => {
        try {
            const dbQuery = connectionName[modelName].findById(id, fields);
            populate.forEach(option => {
                dbQuery.populate(option);
            });
            return await dbQuery.exec();
        } catch (error) {
            return Promise.reject(error);
        }
    }

    findOne = async (connectionName, modelName, query = {}, fields = {}, populate = [], sort = {}, collation = {}) => {
        try {
            const dbQuery = connectionName[modelName].findOne(query, fields);
            if (Object.keys(sort).length) {
                dbQuery.sort(sort);
            }
            if (Object.keys(collation).length) {
                dbQuery.collation(collation);
            }
            populate.forEach(option => {
                dbQuery.populate(option);
            });
            return await dbQuery.exec();
        } catch (error) {
            return Promise.reject(error);
        }
    }

    findByIdAndUpdate = async (connectionName, modelName, id, updatePayload = {}, upsertFlag = false, newFlag = false) => {
        try {
            return await connectionName[modelName].findByIdAndUpdate(
                id,
                updatePayload,
                {
                    upsert: upsertFlag,
                    new: newFlag
                }
            );
        } catch (error) {
            return Promise.reject(error);
        }
    }

    findOneAndUpdate = async (connectionName, modelName, query = {}, updatePayload = {}, upsertFlag = false, newFlag = false) => {
        try {
            return await connectionName[modelName].findOneAndUpdate(
                query,
                updatePayload,
                {
                    upsert: upsertFlag,
                    new: newFlag
                }
            );
        } catch (error) {
            return Promise.reject(error);
        }
    }

    updateMany = async (connectionName, modelName, query = {}, updatePayload = {}) => {
        try {
            return await connectionName[modelName].updateMany(query, updatePayload);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    countDocuments = async (connectionName, modelName, query = {}, options = {}) => {
        try {
            return await connectionName[modelName].countDocuments(query, options);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    aggregate = async (connectionName, modelName, options = []) => {
        try {
            return await connectionName[modelName].aggregate(options);
        } catch (error) {
            return Promise.reject(error);
        }
    }

}

module.exports = new DbService();