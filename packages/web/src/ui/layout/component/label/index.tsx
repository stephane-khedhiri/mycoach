import {DetailedHTMLProps, FunctionComponent, LabelHTMLAttributes,} from 'react'
import './index.css'

type HtmlLabelProps = DetailedHTMLProps<
    LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
>

type LabelWithContentProps = HtmlLabelProps & { content: string }
type LabelWithChildrenProps = HtmlLabelProps & { children: string }

type LabelProps = LabelWithContentProps | LabelWithChildrenProps

export const Label: FunctionComponent<LabelProps> = (props) => {
    const children = 'content' in props ? props.content : props.children

    return <label {...props}>{children}</label>
}