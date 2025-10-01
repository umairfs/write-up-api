const sharedServices = require("shared/services");
const sharedConstants = require("shared/constants");

const sampleModels = {};

// @model-name: create
// @model-desc: create a new sample
sampleModels.create = async (
    name,
    email,
) => {
    const result = await new sharedServices.mysqlServices()
        .insert(
            sharedConstants.dbTableNames.sample,
            sharedServices.mysqlHelperServices.parseInsertValues({
                name: name,
                email: name,
            })
        )
        .build();

    return result;
};

// @model-name: read
// @model-desc: read sample based on filter
sampleModels.read = async (whereParams) => {
    const where = [];

    if (whereParams.sampleName) {
        where.push(`communication_log_id='${whereParams.sampleName}'`);
    }

    let result = new sharedServices.mysqlServices()
        .select(
            `
            sample_name AS sampleName,
            sample_email AS sampleEmail
            `
        )
        .from(sharedConstants.dbTableNames.sample);

    if (where.length) {
        result = result.where(where.join(" AND "));
    }

    result = await result.build();

    return result;
};

// @model-name: update
// @model-desc: update sample based on update and where params
sampleModels.update = async (updateParams, whereParams) => {
    const where = [];

    if (whereParams.name) {
        where.push(
            `name='${whereParams.name}'`
        );
    }
    if (whereParams.email) {
        where.push(
            `name='${whereParams.email}'`
        );
    }

    const result = await new sharedServices.mysqlServices()
        .update(
            sharedConstants.dbTableNames.healthcheckReport,
            sharedServices.mysqlHelperServices.parseUpdateValues({
                name: updateParams.name,
                email: updateParams.email,
            })
        )
        .where(where.join(" AND "))
        .build();

    return result;
};

// @model-name: delete
// @model-desc: delete sample based on where params
sampleModels.delete = async (whereParams) => {
    const where = [];

    if (whereParams.name) {
        where.push(
            `healthcheck_report_ref_id='${whereParams.name}'`
        );
    }

    const result = await new sharedServices.mysqlServices()
        .delete(sharedConstants.dbTableNames.sampleDb)
        .where(where.join(" AND "))
        .build();

    return result;
};

module.exports = sampleModels;
