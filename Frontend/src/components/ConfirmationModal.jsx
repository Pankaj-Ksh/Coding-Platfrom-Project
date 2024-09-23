import React from 'react';

// inset-0 : This is a shorthand for setting all four inset properties (top, right, bottom, and left) to 0. This means the element will stretch to fill the entire viewport.
// z-[100] : Basically one layer above because of which the below layer button are not clickable

const ConfirmationModal = ({modalData}) => {
    return (
        <div className=" flex items-center justify-center fixed inset-0 z-[100]  overflow-auto bg-white bg-opacity-5 backdrop-blur-sm h-screen">
            
            <div className="w-11/12 max-w-[300px] rounded-lg border bg-[#202020] border-richblack-400 bg-richblack-800 p-6">
                
                <p className="text-2xl font-semibold text-richblack-5">
                    {modalData?.text1}
                </p>

                
                <div className="flex justify-between mt-5">
                <button
                        onClick={modalData?.btn1Handler}
                        className={`
                            ${
                                modalData?.btn1Text === "Create"
                                ? "bg-[#00AEEF]"
                                : modalData?.btn1Text === "Logout"
                                ? "bg-[#f0ec1e] text-gray-950 hover:bg-[#fffb22]"
                                : "bg-[#FF4343] hover:bg-[#e03b3b]"
                            }
                            text-white py-2 px-6 rounded-md font-semibold focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-[#fffefe] transition-colors duration-200
                        `}>
                        {modalData?.btn1Text}
                        </button>

                    <button className="bg-[#1A1919] text-white py-2 px-6 rounded-md font-semibold hover:bg-[#333333] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4b4b4b] transition-colors duration-200" onClick={modalData?.btn2Handler}>
                    
                        {modalData?.btn2Text}
                    </button>
                </div>
            </div>
            
        </div>
    )
}

export default ConfirmationModal;
