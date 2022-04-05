import React from 'react';
import { useNavigate, useParams } from "react-router-dom";

const withRouter = (Component) => {
    const Wrapper = (props) => {
        const navigate = useNavigate();
        const params = useParams();

        return (
            <Component
            {...props}
            params={params}
            navigate={navigate} 
            />
        );
    };
    return Wrapper;
}

export default withRouter;