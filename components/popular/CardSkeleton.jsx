import React from "react";

export const CardSkeleton = () => {
  return (
    <>
      <div className="inline-grid grid-cols-1 min-[1025px]:grid-cols-3 xl:grid-cols-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
        <div className="rounded-md p-4 w-[302px] h-[298px]  mx-auto shadow-md">
          <div className="animate-pulse flex flex-col space-y-4">
            <div className="rounded-lg  bg-slate-300 w-full h-[184px] "></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-300 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-300 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-300 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-md p-4 w-[302px] h-[298px]  mx-auto shadow-md">
          <div className="animate-pulse flex flex-col space-y-4">
            <div className="rounded-lg  bg-slate-300 w-full h-[184px] "></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-300 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-300 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-300 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-md p-4 w-[302px] h-[298px]  mx-auto shadow-md">
          <div className="animate-pulse flex flex-col space-y-4">
            <div className="rounded-lg  bg-slate-300 w-full h-[184px] "></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-300 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-300 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-300 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-md p-4 w-[302px] h-[298px]  mx-auto shadow-md">
          <div className="animate-pulse flex flex-col space-y-4">
            <div className="rounded-lg  bg-slate-300 w-full h-[184px] "></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-300 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-300 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-300 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
