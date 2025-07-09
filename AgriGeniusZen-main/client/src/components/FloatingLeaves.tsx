const FloatingLeaves = () => {
  return (
    <>
      <div className="absolute top-20 left-5 opacity-20 z-0 float-animation">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 2L16 8M22 2V7M22 2H17" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 2C13.1716 2 11 4.17157 11 7C11 9.82843 13.1716 12 16 12C18.8284 12 21 9.82843 21 7" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      
      <div className="absolute top-40 right-10 opacity-10 z-0 float-animation-alt">
        <svg width="45" height="45" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 13C11.6569 13 13 11.6569 13 10C13 8.34315 11.6569 7 10 7V13Z" stroke="#8BC34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M17 13C18.6569 13 20 11.6569 20 10C20 8.34315 18.6569 7 17 7V13Z" stroke="#8BC34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M14 10C14 8.34315 15.3431 7 17 7H17V13H17C15.3431 13 14 11.6569 14 10Z" stroke="#8BC34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 7C10 4.23858 12.2386 2 15 2C16.6569 2 18 3.34315 18 5C18 6.65685 16.6569 8 15 8H14" stroke="#8BC34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 7V6C10 3.79086 8.20914 2 6 2C3.79086 2 2 3.79086 2 6V15.5C2 19.0899 4.91015 22 8.5 22H15.5C19.0899 22 22 19.0899 22 15.5C22 13.0147 20.1853 11 17.5 11" stroke="#8BC34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      
      <div className="absolute bottom-20 left-20 opacity-10 z-0 float-animation">
        <svg width="35" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 22L8.5 15.5M8.5 15.5L15 9M8.5 15.5L11 21M15 9L17.5 6.5M15 9L14 4.5" stroke="#03A9F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 2L17.5 6.5M17.5 6.5L13 11M17.5 6.5L19.5 11M13 11L14 15.5M13 11L9.5 11.5" stroke="#03A9F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </>
  );
};

export default FloatingLeaves;
