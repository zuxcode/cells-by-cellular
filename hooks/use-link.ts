import { usePathname } from "next/navigation";
import React from "react";

interface UseLinkReturn {
  checkActiveLink: (urlPath: string, exact?: boolean) => boolean;
  pathname: string;
}

const useLink = (): UseLinkReturn => {
  const pathname = usePathname();

  const checkActiveLink = React.useCallback((urlPath: string, exact?: boolean) => {
    if (exact) {
      return pathname === urlPath;
    }
    return pathname.startsWith(urlPath);
  }, [pathname]); 

  return { 
    checkActiveLink,
    pathname
  };
};

export { useLink };