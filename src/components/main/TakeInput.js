import React from 'react'

const TakeInput = ({ iconName, labelText, iconColor, options, classes = 'validate' }) => {
    return (
        <div className="input-field">
            <i className={`material-icons prefix ${iconColor || 'blue'}-text 
            ${iconColor && iconColor === 'teal' ? '' : 'text-darken-2' }`}>{iconName}</i>
            <input 
                id = { options?.id || '' } 
                type = { options?.type || 'text' } 
                onChange = { options?.handleChange || '' } 
                value = { options?.value || '' }
                ref = { options?.ref || null }
                required = { options?.required || true }
                disabled = { options?.disabled || false }
                className = { classes }
                autoComplete="off" 
            />
            <label htmlFor={options?.id || ''}>{labelText}</label>
            { classes === 'validate' ? 
                <span 
                    className="helper-text" 
                    data-error={`Incorrect ${options?.type}`}>
                </span> 
                : null 
            }
        </div>
    )
}

export default TakeInput
