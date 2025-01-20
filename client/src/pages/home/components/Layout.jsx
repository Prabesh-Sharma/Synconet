import React from 'react'

const Layout = ({ children }) => {
  let header, main

  React.Children.forEach(children, (child) => {
    if (child.type === Layout.Header) header = child
    if (child.type === Layout.Main) main = child
  })

  return (
    <section className="flex flex-col gap-5 p-5 md:p-10 w-full ml-5 md:ml-20">
      <div className="flex items-center justify-between w-full mb-2 md:mb-0">
        <div className="mt-20 md:mt-0">{header}</div>
        <img
          src="/logo.png"
          alt="logo"
          className="h-32 hidden md:block cursor-pointer"
          onClick={() => (window.location.href = '/')}
        />
      </div>

      <div className="h-auto mb-2 border-neutral-500/50 w-full bg-neutral-800/20 rounded border text-white">
        {main}
      </div>
    </section>
  )
}

Layout.Header = ({ children }) => <div>{children}</div>
Layout.Main = ({ children }) => <div>{children}</div>

export default Layout
