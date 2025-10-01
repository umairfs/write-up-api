const responseServices = {}

// 2xx
responseServices.ok = (res, { result, code, message }) => {
    return res.status(200).send({ result, code, message });
}

responseServices.created = (res, { result, code, message }) => {
    return res.status(201).send({ result, code, message });
}

responseServices.accepted = (res, { result, code, message }) => {
    return res.status(202).send({ result, code, message });
}

responseServices.nonAuthoritativeInformation = (res, { result, code, message }) => {
    return res.status(203).send({ result, code, message });
}

responseServices.noCotent = (res, { result, code, message }) => {
    return res.status(204).send({ result, code, message });
}

responseServices.resetContent = (res, { result, code, message }) => {
    return res.status(205).send({ result, code, message });
}

responseServices.partialContent = (res, { result, code, message }) => {
    return res.status(206).send({ result, code, message });
}

responseServices.multiStatus = (res, { result, code, message }) => {
    return res.status(207).send({ result, code, message });
}

responseServices.alredyReported = (res, { result, code, message }) => {
    return res.status(208).send({ result, code, message });
}

responseServices.imUsed = (res, { result, code, message }) => {
    return res.status(226).send({ result, code, message });
}

// 4xx
responseServices.badRequest = (res, { code, message }) => {
    return res.status(400).send({ code, message });
}

responseServices.unauthorized = (res, { code, message }) => {
    return res.status(401).send({ code, message });
}

responseServices.paymentRequired = (res, { code, message }) => {
    return res.status(402).send({ code, message });
}

responseServices.forbidden = (res, { code, message }) => {
    return res.status(403).send({ code, message });
}

responseServices.notFound = (res, { code, message }) => {
    return res.status(404).send({ code, message });
}

responseServices.methodNotAllowed = (res, { code, message }) => {
    return res.status(405).send({ code, message });
}

responseServices.notAcceptable = (res, { code, message }) => {
    return res.status(406).send({ code, message });
}

responseServices.upgradeRequired = (res, { code, message }) => {
    return res.status(426).send({ code, message });
}

responseServices.tooManyRequests = (res, { code, message }) => {
    return res.status(429).send({ code, message });
}

module.exports = responseServices;