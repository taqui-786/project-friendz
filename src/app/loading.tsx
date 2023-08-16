export default function Loading() {
    return (
        <>
        <div
        id="homePage"
        className=" z-[+999999] relative ml-[280px] pt-6 py-[60px] px-[12px] home_width "
      >
        <div className="max-w-[1040px] m-auto relative grow w-auto">
          {/* TOP NAV TOOLBAR  */}
          <div className=" bg-white my-0 p-4 mx-auto relative flex items-center w-full max-w-[1040px] z-10  ">
            <div className="h-10 ml-3 w-24 loads"></div>
            <div className="flex ml-auto items-center">
              <div className="px-[6px] flex items-center py-2 grow-0 shrink-0 text-[#4a4a4a] relative ">
                <div className="relative flex justify-center items-center w-[38px] h-[38px] rounded-sm loads"></div>
              </div>
              <div className="px-[6px] flex items-center py-2 grow-0 shrink-0 text-[#4a4a4a] relative ">
                <div className="relative flex justify-center items-center w-[38px] h-[38px] rounded-sm loads"></div>
              </div>
              <div className="px-[6px] flex items-center py-2 grow-0 shrink-0 text-[#4a4a4a] relative ">
                <div className="relative flex justify-center items-center w-[38px] h-[38px] rounded-sm loads"></div>
              </div>
              <div className="flex justify-start items-center cursor-pointer grow-0 shrink-0 text-[#4a4a4a] px-3 py-2 relative">
                <div className="relative w-10 h-[40px] rounded-full loads"></div>
              </div>
            </div>
          </div>
          {/* POST FEED  */}
          <div className="py-5 px-0">
            <div className="-mx-3 -mt-3 last:-mb-3 md:flex ">
              {/* MIDDLE COLUMN  --> */}
              <div className="block basis-0 grow shrink p-3 max-h-[642px] md:flex-none md:w-[66.66666674%] md:max-h-[555px] overflow-y-auto hidescrollbar  ">
                {/* CREATE POST LOADER  */}
                <div className="relative mb-6 border bg-white border-[#e8e8e8]  rounded-xl shadow-none max-w-full ">
                  <div className="rounded-xl">
                    <div className="p-8 border border-[#e8e8e8]">
                      <div className="flex justify-center items-center">
                        <div className="h-11 w-11 loads rounded-full"></div>
                        <div className="ml-12 w-full clear-both  relative">
                          <div className="h-6 w-32 loads rounded-md"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* FEED LOADER  */}
                <ul className="flex flex-col col-span-2 space-y-6">
                  <div
                    className="bg-white w-full p-5 mb-10 rounded-md relative "
                    id="PostLoader"
                  >
                    {/* HEADER  */}
                    <div className="flex justify-start items-center">
                      <div className="rounded-full w-[50px] h-[50px] min-h-[50px] loads"></div>
                      <div className="ml-5 w-full ">
                        <div className="h-[10px] mb-[10px] w-[60%] rounded-smc loads"></div>
                        <div className="h-[10px] mb-[10px] w-[40%] rounded-smc loads"></div>
                      </div>
                    </div>
                    {/* BODY  */}
                    <div className="w-full mt-5 h-[300px] loads"></div>
                    {/* FOOTER  */}
                    <div className="relative mt-5 w-full flex justify-between items-center">
                      <div className="flex justify-start items-center w-full h-full">
                        <div className="w-10 min-w-[40px] h-10 rounded-full loads"></div>
                        <div className="ml-[10px] w-full ">
                          <div className="h-[10px] mb-[10px] w-[32%] rounded-smc loads"></div>
                          <div className="h-[10px] mb-[10px] w-[24%] rounded-smc loads"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </ul>
              </div>
              {/* RIGHT COLUMN  --> */}
              <div className="block basis-0 grow shrink p-3 md:flex-none md:w-[33.33333337%] ">
                <div className="h-[382px] p-5 mb-5 w-full rounded-lg bg-white border border-[#e8e8e8]">
                    <div className="h-12 flex justify-start items-center">
                        <div className="w-[55%] h-[10px] mb-[10px] rounded-md loads"></div>
                    </div>
                    <div>
                        <div className="flex justify-start items-center h-[76px]">
                            <div className="h-11 w-11 min-w-[44px] rounded-full loads"></div>
                            <div className="w-full px-[10px]">
                                <div className="h-[10px] mb-[10px] rounded-md w-[78%] loads"></div>
                                <div className="h-[10px] mb-[10px] rounded-md w-[54%] loads"></div>
                            </div>
                        </div>
                        <div className="flex justify-start items-center h-[76px]">
                            <div className="h-11 w-11 min-w-[44px] rounded-full loads"></div>
                            <div className="w-full px-[10px]">
                                <div className="h-[10px] mb-[10px] rounded-md w-[78%] loads"></div>
                                <div className="h-[10px] mb-[10px] rounded-md w-[54%] loads"></div>
                            </div>
                        </div>
                        <div className="flex justify-start items-center h-[76px]">
                            <div className="h-11 w-11 min-w-[44px] rounded-full loads"></div>
                            <div className="w-full px-[10px]">
                                <div className="h-[10px] mb-[10px] rounded-md w-[78%] loads"></div>
                                <div className="h-[10px] mb-[10px] rounded-md w-[54%] loads"></div>
                            </div>
                        </div>
                        <div className="flex justify-start items-center h-[76px]">
                            <div className="h-11 w-11 min-w-[44px] rounded-full loads"></div>
                            <div className="w-full px-[10px]">
                                <div className="h-[10px] mb-[10px] rounded-md w-[78%] loads"></div>
                                <div className="h-[10px] mb-[10px] rounded-md w-[54%] loads"></div>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        </>
    )
  }