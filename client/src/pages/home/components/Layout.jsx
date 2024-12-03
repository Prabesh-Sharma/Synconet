import React from 'react'

const Layout = ({ children }) => {
    let header, main

    React.Children.forEach(children, (child) => {
        if (child.type === Layout.Header) header = child
        if (child.type === Layout.Main) main = child
    })
    return (
        <section className="flex flex-col p-10 ml-20 w-full gap-5">
            <div className='flex items-center justify-between w-full'>
                {header}
                <img src='/logo.png' alt='logo' className='h-40 cursor-pointer' onClick={() => window.location.href = '/'} />
            </div>
            <div className="w-full h-80 border border-neutral-500/50 bg-neutral-800/20 rounded" >
                {main}
            </div>
            <div className="flex flex-row gap-5 w-full">
                <div className="border-neutral-500/50 h-60 w-1/2 bg-neutral-800/20 rounded border" />
                <div className="border-neutral-500/50 h-60 w-1/2 bg-neutral-800/20 rounded border" />
            </div>
        </section>
    )
}

Layout.Header = ({ children }) => <div>{children}</div>
Layout.Main = ({ children }) => <div>{children}</div>

export default Layout