import {FunctionComponent, useState} from 'react'
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useAuth} from "../../auth.provider";
import CoachService from "../../../../service/coach.service";
import {Label} from "../../../../ui/layout/component/label";
import {InputEmail, InputPassword} from "../../../../ui/layout/component/inputs";
import {Button} from "../../../../ui/layout/component/button";
import {ThemeColors} from "../../../../ui/layout/theme";
import * as yup from "yup";
import {} from 'react-router-dom';

type Inputs = {
    email: string
    password: string
}
const schemaRegister = yup.object().shape({
    email: yup.string()
        .email()
        .required(),
    password: yup.string()
        .min(5)
        .max(16)
        .required(),

}).required()
export const Login: FunctionComponent = () => {
    const [apiErrors, setApiErrors] = useState<string | undefined>(undefined)
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<Inputs>({
        resolver: yupResolver(schemaRegister)
    })
    const auth = useAuth()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setApiErrors(undefined)
        await CoachService.login(data).then(response => {
            if (response.status === 200) {
                auth.saveToken(response.data.accessToken)
                auth.setProfile({
                    email: response.data.data[0].email,
                    id: response.data.data[0].id,
                    lastName: "",
                    firstName: ''
                })
            }
        }).catch(reason => {
            setApiErrors(reason.response.data.message)
        })

    }

    return (
        <div>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <div className={'mb-6'}>
                    {apiErrors &&
                        <span>{apiErrors}</span>
                    }
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
                <Button type={'submit'} className={'btn'} color={ThemeColors.PRIMARY}>
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