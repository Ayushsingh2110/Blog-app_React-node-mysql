import React from "react";
import { Link, useParams } from "react-router-dom";
import BlogList from "../common_components/BlogList";

const Single = () => {
  const { id } = useParams()

  //get blog data by id
  async function getBlog(){
    
  }
  //set blog into redux

  //useEffect to execute every time id changes


  return (
    <div className="flex justify-center py-[50px]">
      <div className="flex w-[90%] gap-[50px]">
        <div className="flex-[3]">
          <div className="flex flex-col gap-[30px]">
            <div className="blog_img w-full h-[50vh]">
              <img
                src="https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
                className="h-full w-full object-cover shadow-[-20px_20px_1px_#b9e7e7]"
              />
            </div>
            <div className="author_profile flex items-center gap-[10px]">
              <img
                src="https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
                className="h-[50px] w-[50px] rounded-[50%] object-cover"
              />
              <div className="info flex flex-col">
                <span className="font-bold">John Doe</span>
                <p>Posted 2 days ago</p>
              </div>
              <div className="edit">
                <Link to={`/write?edit=2`}>
                  <img src="" alt="" />
                </Link>
                <img src="" alt="" />
              </div>
            </div>
            <div className="blog_title">
              <h1 className="text-[42px] text-[#333]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit
              </h1>
            </div>
            <div className="blog_content text-justify leading-[30px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
              architecto deleniti eius ad nulla sunt alias culpa ratione, ipsum
              repellat laborum laboriosam impedit? Tenetur at cum quos, odio
              asperiores sequi.
            </div>
          </div>
        </div>
        <div className="flex-1 px-[10px]">
          <div className="flex flex-col gap-[30px]">
            <h1 className="text-[20px] text-[#555] font-bold">Other posts you may like</h1>
            <BlogList flexDirection={"flex-col"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
