import {FunctionComponent, useState} from 'react'
import { Label } from './../../../../ui/layout/component/label/'
import {
    InputEmail,
    InputPassword,
    InputText,
} from './../../../../ui/layout/component/inputs'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { SubmitHandler, useForm } from 'react-hook-form'
import {useAuth} from './../../auth.provider'
import {Button} from "../../../../ui/layout/component/button";
import {ThemeColors} from "../../../../ui/layout/theme";
import CoachService from "./../../../../service/coach.service"




type Inputs = {
    firstName: string
    lastName: string
    email: string
    password: string
}

// create schema validation inputs
const schemaRegister = yup.object().shape({
    firstName: yup.string()
        .min(3, 'must be at least 3 characters long')
        .matches(/[a-zA-Z]/, 'must be in characters')
        .max(20)
        .required(),
    lastName: yup.string()
        .min(3, 'must be at least 3 characters long')
        .max(20)
        .matches(/[a-zA-Z]/, 'must be in characters')
        .required(),
    email: yup.string()
        .email()
        .required(),
    password: yup.string()
        .min(8)
        .max(16)
        .required(),

}).required()

export const Register: FunctionComponent = () => {
    const [apiErrors, setApiErrors] = useState<string | undefined>(undefined)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: yupResolver(schemaRegister)
    })
    const auth = useAuth()


    const onSubmit: SubmitHandler<any> = (data) => {

        data.apiPaypal = 'dqlksdjflmqksjdlfkj'
        CoachService.create(data).then(response => {
            if(response.status === 200){
                auth.coach.login(response.data.accessToken)
            }
        }).catch(reason => setApiErrors(reason.response.data.message))

    }

    return (
        <div>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <div className={'mb-6'}>
                    {apiErrors &&
                        <span>{apiErrors}</span>
                    }
                    <Label htmlFor={`firstName`}>first name</Label>
                    <InputText
                        {...register('firstName')}
                        placeholder={`enter your first name`}
                    />
                    {errors.firstName && <span>{errors.firstName.message}</span>}
                </div>
                <div className={'mb-6'}>
                    <Label htmlFor={`lastName`}>last name</Label>
                    <InputText {...register('lastName')} placeholder={`enter your last name`} />
                    {errors.lastName && <span>{errors.lastName.message}</span>}
                </div>
                <div className={'mb-6'}>
                    <Label htmlFor={`email`}>email address</Label>
                    <InputEmail
                        {...register('email')}
                        placeholder={`enter email address`}
                    />
                    {errors.email && <span>{errors.email.message}</span>}
                </div>
                <div className={'mb-6'}>
                    <Label htmlFor={`password`}>password</Label>
                    <InputPassword
                        {...register('password')}
                        placeholder={`enter password`}
                    />
                    {errors.password && <span>{errors.password.message}</span>}
                </div>
                <Button type={'submit'} className={'btn'} color={ThemeColors.PRIMARY} >
                    Register
                </Button>
            </form>
            <div className={'legend'}>
                <p>
                    By clicking 'Continue', you acknowledge that you have read and accept
                    the <span>Terms of Service</span> and <span>Privacy Policy.</span>
                </p>
            </div>
        </div>
    )
}
