import React from 'react';

interface Button{
    name: string,
    type?: "button" | "submit" | "reset"
}

export const PrimaryButton = (params: Button) => {
    return<button className='btn btn-primary w-100' type={params.type}>
        {params.name}
    </button>
}