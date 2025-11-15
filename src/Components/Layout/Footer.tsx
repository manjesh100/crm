export default function Footer() {
    return (
      <footer className="flex flex-wrap items-center justify-between p-4 sm:p-6 bg-white border-t dark:bg-darker dark:border-primary-darker">
      <div className="w-full sm:w-auto text-center sm:text-left">
        <p className="text-sm">&copy; {new Date().getFullYear()} My Website. All rights reserved.</p>
      </div>
      <div className="w-full sm:w-auto text-center sm:text-right mt-2 sm:mt-0">
        Made by IT
      </div>
    </footer>
    

    
    );
  }