import { ReactNode } from "react";

interface MobileFrameProps {
  children: ReactNode;
}

const MobileFrame = ({ children }: MobileFrameProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted p-4">
      <div className="relative w-full max-w-[390px] h-[844px] bg-card rounded-[3rem] card-shadow-md overflow-hidden border-[8px] border-secondary/10">
        {/* Status bar */}
        <div className="flex items-center justify-between px-8 pt-3 pb-1">
          <span className="text-xs font-semibold text-foreground">9:41</span>
          <div className="w-[120px] h-[28px] bg-secondary rounded-full mx-auto" />
          <div className="flex items-center gap-1">
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" className="text-foreground">
              <rect x="0" y="4" width="3" height="8" rx="1" fill="currentColor" opacity="0.4"/>
              <rect x="4.5" y="2.5" width="3" height="9.5" rx="1" fill="currentColor" opacity="0.6"/>
              <rect x="9" y="1" width="3" height="11" rx="1" fill="currentColor" opacity="0.8"/>
              <rect x="13" y="0" width="3" height="12" rx="1" fill="currentColor"/>
            </svg>
            <svg width="22" height="12" viewBox="0 0 22 12" fill="none" className="text-foreground">
              <rect x="0.5" y="0.5" width="19" height="11" rx="2" stroke="currentColor" strokeWidth="1"/>
              <rect x="20" y="3.5" width="2" height="5" rx="1" fill="currentColor"/>
              <rect x="2" y="2" width="14" height="8" rx="1" fill="currentColor"/>
            </svg>
          </div>
        </div>
        {/* Content */}
        <div className="h-[calc(100%-40px)] overflow-y-auto overflow-x-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MobileFrame;
