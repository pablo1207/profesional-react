import React, { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";


const initialFormValue: SignupForm = {
    Name: '',
    Age: '',
    Address: '',
    ZipCode: '',
    Phone: '',
}

interface SignupForm {
    Name: string
    Age: string
    Address: string
    ZipCode: string
    Phone: string
}

const SignupForm: FC<SignupFormProps> = (): React.JSX.Element => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<SignupForm>();

    const handleClearClick = (): void => reset();


    const handleSubmitForm = (data: SignupForm): void => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(handleSubmitForm)}>
            <label>
                Name
                <input {...register('Name', { required: true })} />
            </label>
            <br />
            <label>
                Age
                <input {...register('Age', { required: true })} required />
            </label>
            <br />
            <label>
                Address
                <input {...register('Address', { required: true })} required />
            </label>
            <br />
            <label>
                ZipCode
                <input {...register('ZipCode', { required: true })} required />
            </label>
            <br />
            <label>
                Phone
                <input {...register('Phone', { required: true })} required />
            </label>
            <br />
            <div>
                <button type='button' onClick={handleClearClick}>Clear</button>
                <button type='submit'>Submit</button>

            </div>
        </form>
    )
}
interface SignupFormProps {

}
export default SignupForm;