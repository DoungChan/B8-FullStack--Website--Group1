import Link from "next/link";
import React from "react";
import { useState } from "react";

const UserProfile = () => {
    const [active, setActive] = useState('post');
  return (
    <div className="min-h-screen p-20" >
        <div>
            <div>
                <h1 className="my-8 text-2xl font-bold text-font_color">
                    Username
                </h1>
                  <div className="flex">
                      <div onClick={() => setActive('post')} className="cursor-pointer">
                          <h3 className={`${active === 'post' && 'font-bold'} mr-12`} >Your Posts</h3>
                      </div>
                      <div onClick={() => setActive('save')} className="cursor-pointer"> 
                          <h3 className={`${active === 'save' && 'font-bold'}`}>Saved Collections</h3>
                        </div>
                </div>    
            </div>
            <div className="mt-2">
                <hr class="h-[2px] bg-black"></hr>
              </div>
              <div className="mt-2">
                  {active === 'post' ? <div>Post</div> : <div>Save</div>}
              </div>
        </div>
    </div>
  );
};

export default UserProfile;
