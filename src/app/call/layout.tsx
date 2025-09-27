


interface Props{
    children:React.ReactNode,
};

const Layout=({children}:Props)=>{
    return(
        <div className="h-screen bg-[#101213]"> 
            {children}
        </div>
    )
};
export default Layout;