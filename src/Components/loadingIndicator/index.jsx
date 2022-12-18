import React, { memo } from 'react'
import { LoadingIndicatorWrapper } from './style'
const LoadingIndicator = memo(() => {
    return (
        <LoadingIndicatorWrapper>
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </LoadingIndicatorWrapper>
    )
})

export default LoadingIndicator