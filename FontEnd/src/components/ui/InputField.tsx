
import { Checkbox, Input, InputProps, } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

import { PasswordProps } from 'antd/es/input';
import { ChangeEventHandler, FunctionComponent } from 'react';

interface InputFieldProps extends InputProps {
    onChange?: ChangeEventHandler<HTMLInputElement>;

    checkboxEvent?: ((e: CheckboxChangeEvent) => void);
    typeInput?: 'text' | 'password' | 'checkbox' | 'number';
}

const InputField: FunctionComponent<InputFieldProps & PasswordProps> = ({ onChange, checkboxEvent, typeInput, ...props }) => {

    return (
        <>
            {typeInput === 'password' ? (
                <Input.Password onChange={onChange} {...props} />

            ) : typeInput === 'checkbox' ? (
                <Checkbox onChange={checkboxEvent} {...props}>{props.title}</Checkbox>
            )  :
                <Input {...props} onChange={onChange} />
            }

        </>
    );
};

export default InputField;
