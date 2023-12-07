import joi from "joi";
const codeRegex = /^[A-Z\d]+$/;
export const discountSchema = joi.object({
    code: joi.string().required().max(12).regex(codeRegex),
    discount: joi.number().required().min(0).max(100),
    count: joi.number().required(),
    maxAmount: joi.number().required(),
    startDate: joi.date().required(),
    endDate: joi.date().required(),
});
