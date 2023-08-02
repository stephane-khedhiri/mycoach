import {DetailedHTMLProps, FunctionComponent, ImgHTMLAttributes} from "react";



type LogoPropsTypes = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

export type LogoProps = LogoPropsTypes & {
    path?: string
    to?: string
}
export const Logo: FunctionComponent<LogoProps> = (props) => {
    return (
        <>
            {props.to ?
                <a href={props.to} className="flex items-center">
                    <img src={props.path?? "https://e7.pngegg.com/pngimages/224/568/png-clipart-dumbbell-weight-training-barbell-physical-fitness-exercise-dumbbell-angle-text.png"}  alt="Logo"/>
                </a>
                : <img src={props.path?? "https://e7.pngegg.com/pngimages/380/353/png-clipart-weight-training-olympic-weightlifting-dumbbell-strength-training-weightlifting-hand-logo.png"} className={"bg-transparent h-8 mr-3"} alt="Logo"/>
            }
        </>
    )
}