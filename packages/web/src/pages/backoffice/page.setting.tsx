import {FC, useEffect} from "react";
import {useQuery} from "react-query";
import CoachService, {CoachType} from "../../service/coach.service";
import {useForm} from "react-hook-form";
import {InputEmail, InputText} from "../../ui/layout/component/inputs";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {Label} from "../../ui/layout/component/label";
import {Button} from "../../ui/layout/component/button";
import {ThemeColors} from "../../ui/layout/theme";
import {useAuth} from "../../modules/auth/auth.provider";

type inputs = Omit<CoachType, 'id' | 'password'>

const schemaEdit = yup.object().shape({
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
    apiStripe: yup.string()
})

export const PageSetting: FC = () => {
    const {profile} = useAuth()
    const {register, handleSubmit, formState: {errors}, reset} = useForm<inputs>({
        defaultValues: profile,
        resolver: yupResolver(schemaEdit)
    })


    useEffect(() => {
        window.document.title = "Setting"
    }, [])
    const onSubmit = (data: any) => console.log("data", data)
    return (
        <>
            <form noValidate onSubmit={handleSubmit(onSubmit)} >
                <div className={'mb-6'}>
                    <Label htmlFor={`firstName`}>first name</Label>
                    <InputText
                        {...register('firstName')}
                        placeholder={`enter your first name`}
                    />
                    {errors.firstName && <span>{errors.firstName.message}</span>}
                </div>
                <div className={'mb-6'}>
                    <Label htmlFor={`lastName`}>last name</Label>
                    <InputText {...register('lastName')} placeholder={`enter your last name`}/>
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
                    <Label htmlFor={`lastName`}>last name</Label>
                    <InputText {...register('apiStripe')} placeholder={`enter key secret`}/>
                    {errors.apiStripe && <span>{errors.apiStripe.message}</span>}
                </div>
                <div>
                    <Button color={ThemeColors.PRIMARY}>
                        edit
                    </Button>
                    <Button type={'submit'} color={ThemeColors.RED} onClick={() => {
                        reset(data)
                    }}>
                        rest
                    </Button>
                </div>
            </form>

        </>
    )
}