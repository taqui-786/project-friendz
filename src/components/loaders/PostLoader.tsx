const PostLoader = () => {
  return (
    <div className="bg-white w-full p-5  rounded-md relative " id="PostLoader" >
      {/* HEADER  */}
      <div className="flex justify-start items-center">
        <div className="ml-5 w-full ">
          <div className="h-[10px] mb-[10px] w-[60%] rounded-smc loads"></div>
          <div className="h-[10px] mb-[10px] w-[40%] rounded-smc loads"></div>
        </div>
      </div>
      {/* BODY  */}
      <div className="w-full mt-5 h-[300px] loads"></div>
      
    </div>
  );
};

export default PostLoader;
