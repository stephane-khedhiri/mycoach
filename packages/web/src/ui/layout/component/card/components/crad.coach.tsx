import {FC} from "react";
import {CoachType} from "../../../../../service/coach.service";
import './crad.coach.css'

import {NavLink} from "react-router-dom";

type CradCoachPropsTypes = Pick<CoachType, 'firstName' | 'lastName'> & { coachId: string }

export const CradCoach: FC<CradCoachPropsTypes> = ({lastName, firstName,coachId}) => {
    return (
        <NavLink to={`/offers/${coachId}`} >
            <div className="coach">
                <img
                    src="https://img.freepik.com/vecteurs-libre/club-fitness-athletique-dur-embleme-vintage-gym-bras-bodybuilder-halteres_74855-11247.jpg"
                    alt="logo crossfit"/>
                <h5>{firstName} {lastName}</h5>
            </div>
        </NavLink>
    )
}