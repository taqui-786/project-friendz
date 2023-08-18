export default function NewuserLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <main className="h-screen w-screen bg- bg-colorF7 relative z-[+9999] ">
        
   
        {children}
      </main>
    )
  }