
import { plainToInstance, type ClassConstructor } from "class-transformer";
import { type ValidationError, validate } from "class-validator";

const validationError = async (
    input: object
): Promise<ValidationError[] | false> => {

    const errors = await validate(input);

    if (errors.length > 0) {
        return errors;
    }

    return false;
};

export const RequestValidator = async <T extends object>(
    type: ClassConstructor<T>,
    body: object
): Promise<{ errors: string | false; input: T }> => {

    const input = plainToInstance(type, body);

    const errors = await validationError(input);

    if (errors) {
        const errorMessages = errors
            .flatMap(error => Object.values(error.constraints ?? {}))
            .join(", ");

        return { errors: errorMessages, input };
    }

    return { errors: false, input };
};
