import { ContactType, AddressType } from '../types';

type ListItem = Record<string, any>;
type SetListFn<T> = React.Dispatch<React.SetStateAction<T[]>>;

export const handleChange = <T extends ListItem>(
    list: T[],
    setList: SetListFn<T>,
    index: number,
    field: keyof T,
    value: T[keyof T],
    schema?: any,
    errorKey?: string,
    errors?: any,
    setErrors?: React.Dispatch<React.SetStateAction<any>>
) => {
    const updated = [...list];
    updated[index][field] = value;
    setList(updated);

    if (schema && errorKey && setErrors) {
        const currentErrors = (errors as any)[errorKey] || [];
        const itemErrors = { ...currentErrors[index] };

        try {
            const fieldSchema = schema.fields[field as string];
            if (fieldSchema) {
                fieldSchema.validateSync(value, { abortEarly: false });
                delete itemErrors[field as string];

                if (value && value.toString().trim() !== '') {
                    Object.keys(itemErrors).forEach(key => {
                        delete itemErrors[key];
                    });
                }
            }
        } catch (err: any) {
            itemErrors[field as string] = err.message;
        }

        const newArrayErrors = [...currentErrors];
        newArrayErrors[index] = itemErrors;

        setErrors((prev: any) => ({
            ...prev,
            [errorKey]: newArrayErrors
        }));
    }
};

export const addRow = <T extends ListItem>(
    list: T[],
    setList: SetListFn<T>,
    template: T
) => {
    setList([...list, template]);
};

export const removeRow = <T extends ListItem>(
    list: T[],
    setList: SetListFn<T>,
    index: number
) => {
    setList(list.filter((_, i) => i !== index));
};