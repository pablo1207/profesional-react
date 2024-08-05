import { useForm } from "react-hook-form"
import styles from './MyInfo.module.css'
import { useEffect } from "react";
import { USER_DATA } from "../../../../utils/constants";
const { form, label, input, submitButton } = styles;
interface MyInfoData {
    Name: string,
    Email: string
    Each: number
}
export const MyInfo = () => {
    const { handleSubmit, register, formState: { errors }, setValue } = useForm<MyInfoData>();

    useEffect(() => {
        try {
            const userData: string | null = localStorage.getItem(USER_DATA);
            const infoUserData = userData ? JSON.parse(userData) : [];
            setValue('Name', infoUserData?.Name);
            setValue('Email', infoUserData?.Email);
            setValue('Each', infoUserData?.Each);
        } catch (error) {
            alert('Ah ocurrido un erro al actualizar')
        }
    }, []);
    
    const handleFormSubmit = (data: MyInfoData) => {
        try {
            localStorage.setItem(USER_DATA, JSON.stringify(data))
            alert('Usuario actualizado')
        }
        catch (errors) {
            alert('Ah ocurrido un error')

        }
    }

    return (
        <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className={form}>
            <label className={label}>
                Name
                <input {...register('Name', { required: true, minLength: 1, maxLength: 120 })}
                    className={input} />
            </label>
            <label className={label}>
                Email
                <input {...register('Email', { required: true, minLength: 1, maxLength: 200 })}
                    className={input} />
            </label>
            <label className={label}>
                Each
                <input {...register('Each', { required: true, min: 1, max: 120, valueAsNumber: true })}
                    className={input}
                    type='number' />
            </label>

            <button type='submit' className={submitButton}>Save</button>


        </form>
    )
}